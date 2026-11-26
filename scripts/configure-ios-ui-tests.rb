require 'logger'
require 'cocoapods'
require 'xcodeproj'
require 'fileutils'

ios, app_name = ARGV
abort 'Usage: configure-ios-ui-tests.rb <ios-directory> <app-target>' unless ios && app_name
paths = Dir.glob(File.join(ios, '*.xcodeproj'))
abort 'Expected one app Xcode project' unless paths.size == 1
project = Xcodeproj::Project.open(paths.first)
app = project.targets.find { |target| target.name == app_name }
abort "App target #{app_name} missing" unless app
name = 'AgoraDemoSmokeTests'
target = project.targets.find { |item| item.name == name }
unless target
  target = project.new_target(:ui_test_bundle, name, :ios, '15.1')
  target.add_dependency(app)
end
directory = File.join(ios, name)
FileUtils.mkdir_p(directory)
FileUtils.cp(File.expand_path('../tests/native/ios/DemoSmokeTests.m', __dir__), directory)
relative = File.join(name, 'DemoSmokeTests.m')
unless target.source_build_phase.files_references.any? { |file| file.path == relative }
  target.source_build_phase.add_file_reference(project.main_group.new_file(relative))
end
target.build_configurations.each do |config|
  config.build_settings.merge!({
    'PRODUCT_NAME' => '$(TARGET_NAME)',
    'PRODUCT_BUNDLE_IDENTIFIER' => 'io.agora.demo.SmokeTests',
    'GENERATE_INFOPLIST_FILE' => 'YES',
    'CLANG_ENABLE_MODULES' => 'YES',
    'CLANG_ENABLE_OBJC_ARC' => 'YES',
    'TEST_TARGET_NAME' => app_name,
    'FRAMEWORK_SEARCH_PATHS' => ['$(inherited)', '$(PLATFORM_DIR)/Developer/Library/Frameworks']
  })
end
project.save
scheme = Xcodeproj::XCScheme.new
scheme.configure_with_targets(app, target)
scheme.test_action.build_configuration = 'Release'
scheme.test_action.should_use_launch_scheme_args_env = false
variables = scheme.test_action.xml_element.add_element('EnvironmentVariables')
variables.add_element('EnvironmentVariable', {
  'key' => 'AGORA_DEMO_HOME_TITLE',
  'value' => app_name == 'AgoraRtcNgExample' ? 'APIExample' : 'API Example',
  'isEnabled' => 'YES'
})
scheme.save_as(project.path, name, true)
puts "Configured #{name} for #{app_name}"

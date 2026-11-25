require 'logger'
require 'cocoapods'
require 'xcodeproj'
require 'fileutils'

app, arch = ARGV
abort 'Usage: configure-xctest.rb <customer-app> <0|1>' unless app && %w[0 1].include?(arch)
FileUtils.cp(File.join(__dir__, 'BridgeSmokeApp.js'), File.join(app, 'App.js'))
tests = File.join(app, 'ios', 'AgoraCustomerTests')
FileUtils.mkdir_p(tests)
FileUtils.cp(File.join(__dir__, 'BridgeSmokeTests.m'), tests)
path = File.join(app, 'ios', 'AgoraCustomer.xcodeproj')
project = Xcodeproj::Project.open(path)
host = project.targets.find { |target| target.name == 'AgoraCustomer' }
abort 'Customer App target missing' unless host
abort 'Test target already exists' if project.targets.any? { |target| target.name == 'AgoraCustomerTests' }
target = project.new_target(:unit_test_bundle, 'AgoraCustomerTests', :ios, '15.1')
file = project.main_group.new_file('AgoraCustomerTests/BridgeSmokeTests.m')
target.source_build_phase.add_file_reference(file)
target.add_dependency(host)
target.build_configurations.each do |config|
  config.build_settings.merge!({
    'PRODUCT_NAME' => '$(TARGET_NAME)',
    'PRODUCT_BUNDLE_IDENTIFIER' => 'io.agora.customer.BridgeSmokeTests',
    'GENERATE_INFOPLIST_FILE' => 'YES',
    'CLANG_ENABLE_MODULES' => 'YES',
    'CLANG_ENABLE_OBJC_ARC' => 'YES',
    'TEST_HOST' => '$(BUILT_PRODUCTS_DIR)/AgoraCustomer.app/AgoraCustomer',
    'BUNDLE_LOADER' => '$(TEST_HOST)',
    'FRAMEWORK_SEARCH_PATHS' => ['$(inherited)', '$(PLATFORM_DIR)/Developer/Library/Frameworks'],
    'LD_RUNPATH_SEARCH_PATHS' => ['$(inherited)', '@executable_path/Frameworks', '@loader_path/Frameworks'],
  })
end
host.build_configurations.each { |config| config.build_settings['ENABLE_TESTABILITY'] = 'YES' }
project.save
scheme = Xcodeproj::XCScheme.new
scheme.configure_with_targets(host, target)
scheme.test_action.build_configuration = 'Release'
scheme.test_action.should_use_launch_scheme_args_env = false
variables = scheme.test_action.xml_element.add_element('EnvironmentVariables')
variables.add_element('EnvironmentVariable', {
  'key' => 'AGORA_TEST_NEW_ARCH', 'value' => arch, 'isEnabled' => 'YES'
})
scheme.save_as(path, 'AgoraCustomerTests', true)
puts 'Configured hosted XCTest without Demo or SDK modifications'

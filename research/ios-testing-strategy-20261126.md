# RN RTC iOS 测试方案调研（2026-11-26）

建议保留 Node/Jest 单元测试，把真实 RN→Iris→Native SDK 验收迁移到独立客户 App 的 hosted XCTest。少量 Demo 页面冒烟可用 XCUITest，双端 RTC 则单独运行两个客户实例。先验证原型，再决定删除 Detox；更换 UI 驱动本身不能证明 CoreSimulator 启动停滞已解决。以下方案尚未完成实际稳定性对照，不能提前声称优于现有方案。

本调研只新增这份研究笔记，不修改 SDK、Demo、工作流或 PR。通用测试改造与 Yarn/Git 兼容修复应独立于 #990/#992 的 SPM 功能改动。

## 现有测试究竟覆盖什么

- 当前 [Detox starter](https://github.com/AgoraIO-Extensions/react-native-agora/blob/c1e267a21b6c634d61b368e8484a9de14a92d8b5/examples/expo/e2e/starter.test.js) 只有 3 条断言：API Example 首页可见，以及点击后 JoinChannelAudio / JoinChannelVideo 页面可见。它并没有断言真实入会、远端解码、渲染或释放重建。
- [现有 MediaEngine Jest UT](https://github.com/AgoraIO-Extensions/react-native-agora/blob/c1e267a21b6c634d61b368e8484a9de14a92d8b5/src/__tests__/MediaEngineInternal.test.ts) mock 了原生 specs / TurboModuleRegistry。这适合事件分发、参数与返回值契约；原生 SDK 是否加载、动态库是否完整、SPM embed 是否正确，必须另测。
- 独立客户验收分支 `4a6f00b79326f05b9f870720b79094d8dc9492ab` 已有可复用资产：[App.js](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/scripts/customer-acceptance/App.js) 通过公开 RN API 初始化、入会、发布 RGB 帧、观察解码/渲染并释放重建；[CustomerAcceptance.m](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/scripts/customer-acceptance/CustomerAcceptance.m) 将 JS 结果原子写入 App 的 Documents；[runtime.py](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/scripts/customer-acceptance/runtime.py) 用 simctl 编排两个实例。
- 该历史分支的 [.github/workflows/build.yml](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/.github/workflows/build.yml) 才是独立客户工作流；`ci.yml` 是普通 Demo CI。历史 `4a6f00b` 的 `SDK_SOURCE_REF` 指向含视频优化的 `237140e`，这些运行结果不能混作当前 SPM-only 验收。补充研究时，`codex/ios-xctest-prototype` 已将该引用改为 `c1e267a`，并记录包源与当前 PR 文件树的对应关系；原型现状见文末。

React Native 官方区分 UT、集成测试与设备上的 E2E，并明确 Node 组件测试不执行支撑组件的 iOS/Android 代码。因此“把 Detox 改成 Jest/RNTL”只能改善相应 JS 测试，不能替代 Native/SPM 验收。[RN Testing](https://reactnative.dev/docs/testing-overview)

## 候选方案比较

| 方式 | 能覆盖的主要内容 | 运行条件 | 对本项目的判断 |
| --- | --- | --- | --- |
| Jest + 原生桥 mock | JS 参数、事件、错误与生命周期调用顺序 | 普通 Node，可在 Linux/Windows 跑；不需 Simulator、AppID 或网络 | 保留为每次 PR 的快速 UT；它不能证明真实新旧架构桥或二进制加载 |
| React Native Testing Library | 组件状态、按钮/输入交互、组件输出 | Node 中的测试 renderer；原生模块仍需模拟 | UI 逻辑多时有用；本 SDK 的二进制集成问题无需先增加此依赖 |
| Hosted XCTest | 真实客户 App 中 RN JS、桥、Iris/RTC 的结果与回调 | iOS Simulator 或真机；真实 RTC 初始化使用测试项目配置；真机另需签名 | 推荐作为 Native SDK 集成测试入口，复用现有客户 fixture |
| XCUITest | 最终 App 的可访问性 UI、启动/前后台、权限、页面导航 | Xcode + Simulator/真机；真机需要签名 | 能替代目前 3 条 Demo 冒烟；不应靠页面文字代替 SDK 内部结果断言 |
| Maestro | 最终二进制的跨平台黑盒 UI 流程 | iOS 当前官方文档仅支持 Simulator | 对简单页面更易写，但不能直接观察 RTC 状态，也不能绕开 CoreSimulator |
| Appium XCUITest Driver | 最终 App UI、跨语言/远程设备自动化 | Appium server + driver + WDA + XCTest；支持 Simulator/真机 | 已有跨平台设备平台时可用；当前引入会增加进程和通信层 |
| 独立客户 App + 外部控制器 | npm 真安装、Pods/SPM、真实初始化、双端媒体、升级与 Archive | Xcode，两个目的设备/Simulator，RTC 测试项目/可用网络 | 现有 fixture 已具备大半能力；最小重构是让 XCTest 接管测试结果和生命周期，而不是重写整套协议 |

RNTL 官方说明它在 Node 使用测试 renderer，不执行 native code、也不查询真实 native view hierarchy。[RNTL testing environment](https://oss.callstack.com/react-native-testing-library/docs/advanced/testing-env)

XCUITest 的 `XCUIApplication` 提供启动、等待状态和终止 App 的能力，可使用 launch arguments/environment 配置独立测试 App。[Apple XCUIApplication](https://developer.apple.com/documentation/xcuiautomation/xcuiapplication)

Maestro 官方说明 RN 支持以可访问性层实现，测试最终 App，不要求向 App 安装 npm 驱动；其 UIKit 页面当前明确物理 iOS 设备尚不支持。选择前不能把 Android 真机能力推断到 iOS。[Maestro RN](https://docs.maestro.dev/get-started/supported-platform/react-native)、[Maestro UIKit limitations](https://docs.maestro.dev/get-started/supported-platform/ios/uikit)

Appium 官方架构为 client→Appium server→XCUITest driver→WebDriverAgent→XCTest；Simulator 操作仍使用 simctl/CoreSimulator 工具。它支持真机，但不是消除 Apple 平台服务依赖的方法。[Appium architecture](https://appium.github.io/appium-xcuitest-driver/latest/overview/)、[system requirements](https://appium.github.io/appium-xcuitest-driver/latest/installation/requirements/)

## Hosted XCTest 原型的可行依据与注意点

Apple 将 `TEST_HOST` 定义为测试 bundle 被注入的可执行文件路径；`BUNDLE_LOADER` 指定加载 bundle 的可执行文件，并影响符号解析。因此应创建 **unit-test bundle 并明确绑定独立客户 App**，而不是 UI-test runner 或无宿主测试 bundle。[Apple build settings](https://developer.apple.com/documentation/xcode/build-settings-reference)

典型设置（生成工程时仍需确认 target dependency、scheme Test action、产品路径与配置一致）：

```text
TEST_HOST = $(BUILT_PRODUCTS_DIR)/AgoraCustomer.app/AgoraCustomer
BUNDLE_LOADER = $(TEST_HOST)
```

**关于读取 Documents 的结论：** hosted bundle 被注入宿主进程，因此通过同一个 `FileManager.documentDirectory / userDomainMask` 应取得宿主数据目录，可直接读取 reporter JSON。这个结论由测试注入模型和 iOS app container 模型共同推导；原型应通过一次运行确认，不能仅凭编译成功认定。[Apple TEST_HOST](https://developer.apple.com/documentation/xcode/build-settings-reference)、[iOS app data containers](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html)、[FileManager directory lookup](https://developer.apple.com/documentation/foundation/filemanager/urls(for:in:))

原型首条测试应核对 `Bundle.main.bundleIdentifier` 是客户 App，reporter 与 XCTest 的 PID/`NSHomeDirectory`/Documents 路径相符，并用本次运行的随机 run ID 排除旧报告。UI-test runner 是另一进程，不应假定自己的 Documents 就是被测 App 的目录。reporter 原子写入 JSON 的现有行为适合复用；收到失败字段就立即失败，缺少报告、空测试、旧 run ID 均不能算通过。

先做单端、无入会网络依赖的真实集成冒烟：版本→初始化返回 0→通过公开 API 释放→再次创建/初始化/释放。它仍使用测试 AppID，但不以公共 RTC 网络入会为前提。JS 必须调用安装后包的公开 API，不能在 XCTest 里仅直接调用 AgoraRtcKit 后宣称 RN 桥已通过；也不要 mock native specs 或改 Demo/SDK 启动逻辑。

异步就绪应使用 `XCTestExpectation` 或 predicate expectation，并设置短而明确的阶段 deadline。不要在主线程写阻塞 sleep/while 来等 JS/RN 主队列完成；Apple 为异步回调、通知和 predicate 提供了 XCTest 等待机制。[Apple async expectations](https://developer.apple.com/documentation/xctest/asynchronous-tests-and-expectations)

`executionTimeAllowance` 默认 600 秒，并向上取整到分钟；必须启用 test timeouts 才生效。因此阶段级 10/30/60 秒等待与外部 xcodebuild deadline 仍有意义。测试超时不覆盖测试 bundle 尚未启动前的所有平台停滞。[Apple executionTimeAllowance](https://developer.apple.com/documentation/xctest/xctestcase/executiontimeallowance)

## 构建、双端编排与结果

Apple 支持先 `build-for-testing` 生成 `.xctestrun`，再对精确 destination 执行 `test-without-building`，复用已经构建的测试与 App。使用 `.xctestrun` 时其中的 bundle 路径必须有效。[Apple TN2339](https://developer.apple.com/library/archive/technotes/tn2339/_index.html)

```sh
xcodebuild build-for-testing \
  -workspace AgoraCustomer.xcworkspace -scheme AgoraCustomer \
  -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath "$TEST_DERIVED_DATA"

xcodebuild test-without-building -xctestrun "$TEST_RUN_FILE" \
  -destination "platform=iOS Simulator,id=$TEST_DEVICE_UDID" \
  -parallel-testing-enabled NO \
  -test-timeouts-enabled YES \
  -default-test-execution-time-allowance 120 \
  -maximum-test-execution-time-allowance 180 \
  -resultBundlePath "$TEST_RESULT_BUNDLE"
```

上面命令是原型执行形式，不表示已实际构建或运行。参数已用本机 **Xcode 16.4 / 16F6** 的 `xcodebuild -help` 核对，包括 `-destination-timeout`、test timeouts、并行 worker 控制和 `-resultBundlePath`。`.xcresult` 可保留测试、失败与附件；CI 必须核对存在预期测试且数量大于 0，不能只看进程退出码。Apple 的 release notes 说明 `-resultBundlePath` 产生可在 Xcode 查看、由 xcresulttool 导出的结果包。[Apple result bundles](https://developer.apple.com/documentation/xcode-release-notes/xcode-11-release-notes/)

双端阶段再运行两份 `test-without-building`，各自指定独立 UDID、resultBundle 路径和本次唯一频道/角色；每个目的设备内部关闭测试并行。对 `.xctestrun` 需要修改环境时，为每个角色制作独立副本，不要并发改同一个文件。可读共享构建产物，避免两个运行同时编译或改签名。两客户端通过实际 RTC 网络交互；测试报告包含匹配本轮频道/UID 的入会成功、远端解码尺寸、首帧渲染、释放重建与错误列表，并保留接收端截图。

旧/新架构由真实构建矩阵决定，运行时报告 `nativeFabricUIManager` / bridgeless 标志再确认。CocoaPods/SPM 由独立 npm 客户项目的安装与依赖审计确认。仅把 XCTest 放到一个纯 Native App 中，不能覆盖 RN 的这两个架构；只在 Repo workspace 链接源文件，也不能代替 npm 交付验收。

## Simulator 隔离与稳定性边界

Xcode 官方说明并行测试会产生 Simulator clone，并可控制 worker 数；这证明 destination/runner 可分开，但不提供“每个 UDID 拥有独立平台服务”的保证。Apple 还在 Xcode 16.2 release notes 中记录过 CoreSimulatorService 的内存问题。由此不能推断更换为 XCTest、Maestro 或 Appium 就绕开了既有服务层停滞。[Apple parallel testing](https://developer.apple.com/documentation/xcode-release-notes/xcode-10-release-notes/)、[Apple CoreSimulator fixes](https://developer.apple.com/documentation/xcode-release-notes/xcode-16_2-release-notes/)

建议独立 run ID/UDID、每用户一条运行队列、固定 Xcode/runtime、仅删除任务拥有的设备、使用进程组控制外部 deadline，并保留第一处失败证据。只能将独立系统 App/Simulator 操作同样失败的情况归为环境失败；App crash、已有失败测试、SDK 错误、未知进程状态都保留失败。这个策略是本项目的工程选择，不是 Apple 对平台稳定性的承诺。两台签名真机能移除 CoreSimulator 变量，但还需要设备接入、签名、权限和 RTC 网络，不能作为当前无设备环境已完成的验证。

## Yarn/Git 安装失败的独立处理

仓库 `.yarn/releases/yarn-3.6.1.cjs` 可见 Git clone 参数是 `['clone', '-c core.autocrlf=false', ...]`。Yarn 上游 [PR #6983](https://github.com/yarnpkg/berry/pull/6983) 明确说明 Git 2.52.0 开始拒绝该合并参数，并将其修为 `['clone', '-c', 'core.autocrlf=false', ...]`；[Yarn 4.12.0 release](https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg%2Fcli%2F4.12.0) 列出了该修复。已通过 Connection 读取上游 PR 及实际代码 diff，不只是根据错误信息猜测。

这解释了当前新 Git runner 的 `invalid key:  core.autocrlf` 安装错误，与 Agora SPM 二进制无关。本机 Git 2.45.2 对合并参数和拆分参数都成功，所以旧本机复现不报错不能推翻版本兼容问题。旧 Demo 全量依赖安装仍需在通用工具链分支选择已修复版本或最小 backport，并单独核对 Node 要求、lockfile 与完整安装；不要把 Yarn major 升级悄悄塞回 SPM PR，也不要靠缓存命中或无限重跑掩盖它。

本轮还实际验证了一条更小的 SDK 测试准备路径：在源提交 `c1e267a21b6c634d61b368e8484a9de14a92d8b5` 的全新临时 checkout 中，使用仓库已有的 workspace-tools 插件执行 `POD_INSTALL=0 LEFTHOOK=0 DETOX_DISABLE_POSTINSTALL=1 YARN_ENABLE_IMMUTABLE_INSTALLS=true yarn workspaces focus react-native-agora`，随后 `yarn test --runInBand` 和 `yarn prepare` 均通过；6 个测试套件、45 条 UT 通过，临时依赖树已删除。已回读 [summary.json](/Users/guoxianzhe/.codex/visualizations/2026/11/24/01a20b7b-ab8f-7ca3-a3a4-de00b12e958a/focused-sdk-install/summary.json) 与 [UT 日志](/Users/guoxianzhe/.codex/visualizations/2026/11/24/01a20b7b-ab8f-7ca3-a3a4-de00b12e958a/focused-sdk-install/unit-tests.log)。因此 SDK UT/打包可只安装 root workspace，独立客户 App 再用 npm 安装，不必为新测试方式先做 Yarn major 升级。此实测绕开不需要的 Demo Git 依赖，**没有证明旧 Demo 全量安装的兼容错误已经修好**。

## 建议落地顺序与验收门槛

1. 保持现有 Node/Jest UT；给测试层准确命名，普通 UT 不启动模拟器。
2. 在独立测试改造分支复用客户 fixture，加 hosted XCTest 单端冒烟；产出真实 `.xcresult`、版本/架构/本轮 run ID 与生命周期报告。先同时验证成功与故意失败能够正确使 CI 失败。
3. 给 CocoaPods/SPM × 新旧架构各构建一次，确保原型验证的是当前 SPM-only npm 包；保存 source SHA 和 tarball SHA256。
4. 加双端网络用例，核对远端解码/渲染与释放重建，保留截图；至少分别在冷 Simulator 与可复用环境观察稳定性，再决定默认合并检查的矩阵和重跑政策。
5. 原型证明覆盖与诊断结果后，移除 iOS 对 Detox 的依赖。Android 的替代驱动另行核对；不能用 iOS XCTest 替掉跨平台覆盖后仍声称 Android E2E 保持。

当前证据支持方案可实现，不支持“所有运行故障已经修好”或“SPM 两个 PR 已达到合并门槛”。

## 补充：RNTA、官方 RNTester 与 Harness 是否值得替代当前原型

本节于 2026-11-26 补充，只核对一手仓库、发布信息与当前实现，不安装新依赖。比较基准是本地 `codex/ios-xctest-prototype` 的 `46857b146a3ea10405d96581a1dbb83cb91aee63`，不是设想中尚不存在的框架。

### 当前原型具体维护了什么

`prepare.cjs` 生成普通 Community CLI RN 0.79.5 客户 App 并安装打包的 SDK；`configure-xctest.rb` 复制独立测试 App 的 JS、添加约 50 行配置的 hosted test target 和 scheme；`BridgeSmokeApp.js` 经公开 RN API 做两轮真实引擎版本、初始化、连接状态、释放；`BridgeSmokeTests.m` 校验 run ID、宿主进程/容器、架构、两轮结果，并把 JSON 附入测试结果；`run-xctest.py` 使用 Apple 的运行器、解析 `.xcresult`、运行故意版本错误的反向对照并验证任务拥有设备的清理。工作流构建的是 **Release 内嵌 bundle**，测试时不启动 Metro。

这确实包含自维护代码，尤其工程生成、目的设备编排和结果分类；也已经避免写 RN 自有的 `RCTBridge`/ReactHost 启动器，宿主生命周期由所选 CLI 模板负责。当前是一条 iOS 桥生命周期用例，并非完整双端 RTC 或 Android 替代实现。此处只审查源码，没有据此补报任何 CI 成功结果。

### Microsoft react-native-test-app（RNTA）

**维护与成熟度。** 这是 `microsoft/react-native-test-app` 下的 Microsoft 开源项目，并非 React Native 官方提供的测试运行器。Connection 实时查询显示仓库未归档，最新非预发布版为 **5.4.17，2026-11-04**；不能采用搜索索引仍列出的 5.4.16 当当前版本。[RNTA release](https://github.com/microsoft/react-native-test-app/releases/tag/5.4.17)、[official README](https://github.com/microsoft/react-native-test-app/blob/5.4.17/README.md)

**它解决的部分。** RNTA 将跨平台原生测试 App 包装为依赖，支持 Android/iOS 等平台，可以减少自行跟进模板的工作。发布源码中的 app package 声明 RN peer 范围 `0.76 - 0.88 || >=0.89.0-0 <0.89.0`，覆盖本项目的 0.77/0.79；Node 要求 `>=20.19.4`。这是依赖兼容范围，不等同于本 SDK 的矩阵已经通过。[RNTA app package](https://github.com/microsoft/react-native-test-app/blob/5.4.17/packages/app/package.json)

新架构、bridgeless 由 RN 版本和构建配置控制；官方 iOS 指引提供 `RCT_NEW_ARCH_ENABLED`、`:fabric_enabled` 等入口。RN 0.82 起自身不再支持旧架构，因此任何框架都无法在这些 RN 版本“恢复”旧架构覆盖；旧/新架构对照应继续固定在仍支持两者的 RN 版本。[RNTA iOS architecture options](https://github.com/microsoft/react-native-test-app/wiki/Platform-Specifics:-iOS,-macOS,-visionOS)

**无 Metro 与 SPM。** RNTA 的 `bundleRoot`/`resources` 支持把 JS bundle 和 assets 装入应用，所以它可以承载离线运行的测试 App。iOS `use_test_app!` 本身走 CocoaPods，其实现提供额外 `options[:post_install]` 回调，可在里面接入 Agora 的 SPM helper；能否正确承载这里的 `spm_dependency`、dynamic frameworks、Archive 去重，仍应实际跑矩阵验证，RNTA 不自动给第三方 SDK 提供这项保证。[manifest schema](https://github.com/microsoft/react-native-test-app/blob/5.4.17/packages/app/schema.json)、[iOS Pod generation](https://github.com/microsoft/react-native-test-app/blob/5.4.17/packages/app/ios/test_app.rb)

**本项目判断。** RNTA 主要替换 `prepare.cjs` 所用宿主/工程生成方式，不能替换 `BridgeSmokeApp.js` 的 SDK 断言、XCTest target、`.xcresult` 判定、双端协同或平台超时诊断。它会再引入 RNTA/React Native Host、manifest 和 post-install 扩展点的集成与升级验证。对当前一个固定 RN CLI 客户 fixture，收益尚未超过迁移成本，**本轮不引入**。若后续需要长期覆盖很多 RN 版本、Android/iOS/macOS/Windows 的库开发宿主，值得独立做一次 RNTA 原型；保留普通 CLI/npm 客户验收，防止只验证一种特殊宿主。

### React Native 官方 RNTester / IntegrationTests

**定位。** RNTester 是 RN 官方仓库中展示/回归 RN 自身 views 和 modules 的 App。其 README 明确它从仓库源码构建 RN，而普通 CLI App 使用已发布的特定 RN 依赖。因此它适合 RN 核心开发，不能直接等价为客户 npm 交付环境。[RNTester v0.79.5 README](https://github.com/react/react-native/blob/v0.79.5/packages/rn-tester/README.md)

**版本限制是实质问题。** v0.79.5 中存在 `IntegrationTests`、`RNTesterIntegrationTests` 和 `RCTTest`；`RCTTestRunner.m` 直接创建 `RCTBridge` / `RCTRootView`，默认从 localhost:8081 加载开发 bundle，也允许显式 script URL 或内嵌 `main.jsbundle`。复用它意味着适配旧桥内部测试 API，不能据此声称覆盖了真实 bridgeless 启动路径。[RCTTestRunner source](https://github.com/react/react-native/blob/v0.79.5/packages/rn-tester/RCTTest/RCTTestRunner.m)、[old Podfile](https://github.com/react/react-native/blob/v0.79.5/packages/rn-tester/Podfile)

截至本次查询的官方 `main` 已不包含上述三处集成测试目录，Podfile 也没有 `RNTesterIntegrationTests`/`React-RCTTest`，README 只描述 `RNTesterUnitTests` 和新的 visual tests。这不是可稳定安装、独立维护的第三方库测试产品。此观察不推断具体删除原因或所有历史 RN 版本支持情况。[current RNTester tree](https://github.com/react/react-native/tree/main/packages/rn-tester)、[current Podfile](https://github.com/react/react-native/blob/main/packages/rn-tester/Podfile)、[current README](https://github.com/react/react-native/blob/main/packages/rn-tester/README.md)

**本项目判断。** 不引入 RNTester/RCTTest 作为依赖，也不复制旧 `RCTTestRunner`。可借鉴其 XCTest 异步断言方式，但普通客户 CLI 模板 + 原生 hosted XCTest 更贴近交付路径，也避免把 RN 私有启动机制再维护一份。RNTester 虽有 Android App，旧 iOS IntegrationTests 并不自动成为跨平台统一运行器。

### React Native Harness

**维护方与当前成熟度。** 已确认是 **Callstack** 在 `callstackincubator/react-native-harness` 维护的项目，package 作者为 Callstack 的 Szymon Chmal；它不是 RN 官方运行器，也不是 Microsoft RNTA 的一部分。Connection 实时查询显示未归档，最新 GitHub 正式发布是 **v1.6.0，2026-10-16，prerelease=false**。已有正式 1.x，不能因为搜索页仍展示早期 alpha 就说它“还是 alpha”；正式版本号也不代表本仓库兼容性或稳定性已被验证。[Harness README](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/README.md)、[v1.6.0 release](https://github.com/callstackincubator/react-native-harness/releases/tag/v1.6.0)、[runtime package](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/packages/runtime/package.json)

**与 Node Jest 有本质区别。** Harness 确实在真实设备的 RN JS runtime 内运行 Jest 风格用例，可以调用真实 NativeModules/TurboModules；它能省去跨平台断言与报告协议的一部分自维护工作，而非只做 mock。测试仍要调用安装后 SDK 的公开 API，并分别构建旧/新架构宿主；runtime package 中 RN peer `*` 不是两种架构以及每个 RN 版本的兼容证明。本轮核对的安装/架构资料未给出这个 Agora SDK 在 0.77/0.79 两种架构均通过的证据。[Harness introduction](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/website/src/docs/getting-started/introduction.md)、[runtime peer dependencies](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/packages/runtime/package.json)

**当前目标下的决定性限制。** v1.6.0 官方 architecture 文档明确通过 **Debug App + Metro 替换测试 bundle + WebSocket 控制/上报** 实现；逐个测试文件还会请求 Metro 动态打包，明确不能在预打包 bundle 的 Release 构建上运行。因此它不是当前 Release、运行时无 Metro 的客户验收的直接替代方案，也无法覆盖 Release Archive、签名或 embed 的独有差异。不能仅因复用了同一 native 库就把 Debug 成功当 Release 已验收。[Harness architecture](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/website/src/docs/getting-started/architecture.md)、[quick start](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/website/src/docs/getting-started/quick-start.mdx)

**设备与失败处理。** Harness 有 iOS Simulator、物理 iOS 设备和 Android 平台适配；官方 iOS 文档说明 Simulator 用 simctl、真机用 devicectl，仍要求 Debug App。iOS 真机使用默认 Metro 8081，不能假定 Simulator 的自动端口回退也适用真机。配置包含默认 `maxAppRestarts=2`，若用于合并验收，要明确关闭或记录启动恢复，不能让自动重启遮盖首启缺陷。文档也提供原生 crash 采集和 CI action；它可能减少我们这部分维护，但没有绕开平台服务。[Harness iOS](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/website/src/docs/platforms/ios.mdx)、[configuration](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/website/src/docs/getting-started/configuration.mdx)、[CI guide](https://github.com/callstackincubator/react-native-harness/blob/v1.6.0/website/src/docs/guides/ci-cd.md)

**本项目判断。** Harness 是三者中最值得未来做对照原型的真正跨平台 native API 测试运行器。如果以后有大量 iOS/Android 原生 API 回归用例，且接受运行期 Metro，它比长期扩写自有测试语法、WebSocket 与动态加载协议更合理。当前只有一条 Release 生命周期冒烟，且仍要保留独立 npm/SPM/Archive/双端验收，**本轮不直接增加 Harness 及其 platform/Metro/Jest 依赖链**。不要为了省一条用例就增加在线 bundler 和控制通道，也不要复制它的框架重新实现一套。

### 这轮选择

| 方案 | 能减少当前哪部分维护 | 当前欠缺或新增成本 | 本轮决定 |
| --- | --- | --- | --- |
| RNTA | 跨版本/跨平台宿主模板 | 真实 SDK 断言、XCTest 与设备编排仍要维护；增加宿主生成器与 SPM hook 适配 | 暂不引入；多平台宿主维护变成主要成本时单独试验 |
| RNTester/RCTTest | 可借鉴 RN 核心测试案例 | 源码开发环境、旧内部 RCTBridge 测试 API、当前版本目录变化 | 不作为第三方依赖 |
| Harness 1.6 | 真机 JS 断言、跨平台 native runner、crash/reporting | 运行期 Debug+Metro/WebSocket，仍需客户安装与 Release/Archive 验收 | 后续大规模 native API 回归的候选；不替代本次离线 Release 验收 |
| 当前 CLI + hosted XCTest | 不增加额外测试运行器，复用 Apple 工具及普通客户宿主 | 自有少量 fixture/编排；Android 与双端覆盖尚需补齐 | 先完成成功/故意失败及真实运行验证，再评估维护成本 |

以上是针对当前需求和原型规模的选择，不是断言自写测试框架普遍优于现成工具。当前实现应停留在薄薄的 fixture/原生断言/平台调用层；一旦开始需要动态装载测试、跨平台匹配器、交互式重试或测试发现协议，就应重新评估 Harness，而不是继续造通用框架。任何候选都不能省略最终对真实 npm 包、SPM 动态库、Release Archive 和双端媒体结果的独立验收。

## 原型的真实验证结果

独立分支 `codex/ios-xctest-prototype` 已通过 [CI 45675518268](https://github.com/AgoraIO-Extensions/react-native-agora/actions/runs/45675518268)。没有修改 #990/#992，也没有替换默认 PR CI。

SDK 为 #990 的 SPM-only 提交 `c1e267a21b6c634d61b368e8484a9de14a92d8b5`，npm 包 SHA256 为 `19b4f5df3d5ce7eed43180b841a7b0cdcb027308f0bee8698f44d1c44175120e`。新客户 App 使用 RN 0.79.5、Release、新架构、SPM Native/Iris，在 Xcode 16.4 / iOS 18.5 / arm64 Simulator 上执行真实公开 RN API。

- 正向 hosted XCTest 实际通过：两次创建、初始化返回0、版本4.6.4.2、未入会连接态、同步 `release(true)`；核对运行ID、进程ID、宿主bundle和Documents，错误列表为空。
- 同一预编译 App 再运行错误版本断言，XCTest 返回65并报告预期测试方法中的版本比较失败；控制器按真实测试标识和失败文本确认反例，整体CI成功。
- 第五轮45672899676的正向测试已经成功，但控制器起初错误地要求失败文本包含宏名，导致整体失败；第六轮修正后再次完整通过。不能把早先整体失败记录改称绿色。
- 精确 Products 和原始 `.xctestrun` 以 tar 归档，第二台 CI runner 下载、校验来源后无需重编译就能执行。创建的独立模拟器已删除并验证。没有自动重跑测试或重置全局服务。

控制器适配也通过真实运行修正了两处假设：scheme testables 生成的是 `.xctestrun` 格式1；Xcode精确目的设备匹配要求保留大写UUID。格式1/2和空结果、错误反例、清理失败等边界另有普通Python进程测试；它们只验证控制器，不算SDK集成通过。

快速 UT 已在两个独立临时 checkout 实测：main45条、special64条通过。special 的库声明构建会经测试文件import拉入Demo；声明构建排除 `src/__tests__` 后，64条UT仍单独执行，库打包成功，原有SDK源文件SHA均未变化。原型将声明构建配置作为制品元数据记录，没有把它混入SPM PR。

当前原生通过范围只有 **main SDK / RN0.79.5 / SPM / 新架构 / 单端离线生命周期**，使用格式合法的合成AppID，不验证RTC账号授权、入会、音视频或真实设备。CocoaPods/旧架构/special原生矩阵、双端解码渲染及长期稳定性对照尚未完成；Android尚未迁移。当前结果证明新入口可运行，不能证明CoreSimulator永不挂起，也不能据此宣布SPM完整客户验收或默认CI替换已完成。

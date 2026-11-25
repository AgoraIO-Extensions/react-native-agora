# RN RTC iOS 测试方案调研（2026-11-26）

建议保留 Node/Jest 单元测试，把真实 RN→Iris→Native SDK 验收迁移到独立客户 App 的 hosted XCTest。少量 Demo 页面冒烟可用 XCUITest，双端 RTC 则单独运行两个客户实例。先验证原型，再决定删除 Detox；更换 UI 驱动本身不能证明 CoreSimulator 启动停滞已解决。以下方案尚未完成实际稳定性对照，不能提前声称优于现有方案。

本调研只新增这份研究笔记，不修改 SDK、Demo、工作流或 PR。通用测试改造与 Yarn/Git 兼容修复应独立于 #990/#992 的 SPM 功能改动。

## 现有测试究竟覆盖什么

- 当前 [Detox starter](https://github.com/AgoraIO-Extensions/react-native-agora/blob/c1e267a21b6c634d61b368e8484a9de14a92d8b5/examples/expo/e2e/starter.test.js) 只有 3 条断言：API Example 首页可见，以及点击后 JoinChannelAudio / JoinChannelVideo 页面可见。它并没有断言真实入会、远端解码、渲染或释放重建。
- [现有 MediaEngine Jest UT](https://github.com/AgoraIO-Extensions/react-native-agora/blob/c1e267a21b6c634d61b368e8484a9de14a92d8b5/src/__tests__/MediaEngineInternal.test.ts) mock 了原生 specs / TurboModuleRegistry。这适合事件分发、参数与返回值契约；原生 SDK 是否加载、动态库是否完整、SPM embed 是否正确，必须另测。
- 独立客户验收分支 `4a6f00b79326f05b9f870720b79094d8dc9492ab` 已有可复用资产：[App.js](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/scripts/customer-acceptance/App.js) 通过公开 RN API 初始化、入会、发布 RGB 帧、观察解码/渲染并释放重建；[CustomerAcceptance.m](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/scripts/customer-acceptance/CustomerAcceptance.m) 将 JS 结果原子写入 App 的 Documents；[runtime.py](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/scripts/customer-acceptance/runtime.py) 用 simctl 编排两个实例。
- 该分支的 [.github/workflows/build.yml](https://github.com/AgoraIO-Extensions/react-native-agora/blob/4a6f00b79326f05b9f870720b79094d8dc9492ab/.github/workflows/build.yml) 才是独立客户工作流；`ci.yml` 仍是普通 Demo CI。其 `SDK_SOURCE_REF` 还指向 `237140e`，包含已移出 SPM PR 的视频优化；新验收必须显式换成当前 SPM-only 提交并记录 npm 包摘要，不能复用旧结果作当前验收。

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

这解释了当前新 Git runner 的 `invalid key:  core.autocrlf` 安装错误，与 Agora SPM 二进制无关。本机 Git 2.45.2 对合并参数和拆分参数都成功，所以旧本机复现不报错不能推翻版本兼容问题。应在通用测试/工具链分支选择固定已修复的 Yarn 或最小 backport，并单独核对 Node 要求、lockfile 与完整安装；不要把 Yarn major 升级悄悄塞回 SPM PR，也不要靠缓存命中或无限重跑掩盖它。

## 建议落地顺序与验收门槛

1. 保持现有 Node/Jest UT；给测试层准确命名，普通 UT 不启动模拟器。
2. 在独立测试改造分支复用客户 fixture，加 hosted XCTest 单端冒烟；产出真实 `.xcresult`、版本/架构/本轮 run ID 与生命周期报告。先同时验证成功与故意失败能够正确使 CI 失败。
3. 给 CocoaPods/SPM × 新旧架构各构建一次，确保原型验证的是当前 SPM-only npm 包；保存 source SHA 和 tarball SHA256。
4. 加双端网络用例，核对远端解码/渲染与释放重建，保留截图；至少分别在冷 Simulator 与可复用环境观察稳定性，再决定默认合并检查的矩阵和重跑政策。
5. 原型证明覆盖与诊断结果后，移除 iOS 对 Detox 的依赖。Android 的替代驱动另行核对；不能用 iOS XCTest 替掉跨平台覆盖后仍声称 Android E2E 保持。

当前证据支持方案可实现，不支持“所有运行故障已经修好”或“SPM 两个 PR 已达到合并门槛”。

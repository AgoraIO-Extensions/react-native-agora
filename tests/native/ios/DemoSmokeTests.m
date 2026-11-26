#import <XCTest/XCTest.h>

@interface DemoSmokeTests : XCTestCase
@property(nonatomic, strong) XCUIApplication *app;
@end

@implementation DemoSmokeTests
- (void)setUp {
  [super setUp];
  self.continueAfterFailure = NO;
  self.app = [[XCUIApplication alloc] init];
  [self.app launch];
  NSPredicate *homeReady = [NSPredicate predicateWithFormat:@"exists == YES AND hittable == YES"];
  XCTestExpectation *expectation = [self expectationForPredicate:homeReady
                                          evaluatedWithObject:[self element:[self homeTitle]] handler:nil];
  [self waitForExpectations:@[expectation] timeout:60];
}

- (NSString *)homeTitle {
  return NSProcessInfo.processInfo.environment[@"AGORA_DEMO_HOME_TITLE"] ?: @"API Example";
}

- (XCUIElement *)element:(NSString *)label {
  NSPredicate *predicate = [NSPredicate predicateWithFormat:@"label == %@", label];
  return [[self.app descendantsMatchingType:XCUIElementTypeAny] matchingPredicate:predicate].firstMatch;
}

- (void)openPage:(NSString *)name {
  [[self element:name] tap];
  XCUIApplication *system = [[XCUIApplication alloc] initWithBundleIdentifier:@"com.apple.springboard"];
  NSPredicate *ready = [NSPredicate predicateWithBlock:^BOOL(id object, NSDictionary *bindings) {
    XCUIElement *alert = system.alerts.firstMatch;
    if (alert.exists) {
      for (NSString *title in @[@"Allow", @"OK", @"Allow While Using App"]) {
        XCUIElement *button = alert.buttons[title];
        if (button.exists) { [button tap]; break; }
      }
    }
    return [self element:@"join Channel"].hittable;
  }];
  XCTestExpectation *expectation = [self expectationForPredicate:ready evaluatedWithObject:self handler:nil];
  [self waitForExpectations:@[expectation] timeout:60];
  XCTAssertTrue([self element:name].exists);
}

- (void)testHomeIsVisible {
  XCTAssertTrue([self element:[self homeTitle]].hittable);
}

- (void)testAudioPageOpens {
  [self openPage:@"JoinChannelAudio"];
}

- (void)testVideoPageOpens {
  [self openPage:@"JoinChannelVideo"];
}

- (void)tearDown {
  if (!self.testRun.hasSucceeded) {
    XCTAttachment *image = [XCTAttachment attachmentWithScreenshot:XCUIScreen.mainScreen.screenshot];
    image.lifetime = XCTAttachmentLifetimeKeepAlways;
    [self addAttachment:image];
  }
  [self.app terminate];
  [super tearDown];
}
@end

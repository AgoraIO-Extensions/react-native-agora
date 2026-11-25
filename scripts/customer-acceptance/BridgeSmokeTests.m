#import <XCTest/XCTest.h>

@interface BridgeSmokeTests : XCTestCase
@end

@implementation BridgeSmokeTests
- (void)testRealReactNativeBridgeLifecycle {
  // A hosted test runs inside AgoraCustomer, not inside a UI automation runner.
  XCTAssertEqualObjects(NSBundle.mainBundle.infoDictionary[@"CFBundleExecutable"], @"AgoraCustomer");
  NSString *documents = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
  NSString *path = [documents stringByAppendingPathComponent:@"customer-acceptance.json"];
  NSString *runID = NSProcessInfo.processInfo.environment[@"AGORA_TEST_RUN_ID"];
  XCTAssertTrue(runID.length > 0);
  __block NSDictionary *state;
  NSPredicate *finished = [NSPredicate predicateWithBlock:^BOOL(id object, NSDictionary *bindings) {
    NSData *data = [NSData dataWithContentsOfFile:path];
    state = data ? [NSJSONSerialization JSONObjectWithData:data options:0 error:nil] : nil;
    return [state[@"runID"] isEqualToString:runID] && ([state[@"completed"] boolValue] || state[@"failure"] != nil);
  }];
  XCTestExpectation *expectation = [self expectationForPredicate:finished evaluatedWithObject:self handler:nil];
  XCTWaiterResult result = [XCTWaiter waitForExpectations:@[expectation] timeout:60];
  if (state) {
    NSData *data = [NSJSONSerialization dataWithJSONObject:state options:NSJSONWritingPrettyPrinted error:nil];
    XCTAttachment *attachment = [XCTAttachment attachmentWithData:data uniformTypeIdentifier:@"public.json"];
    attachment.name = @"real-rn-bridge-state.json";
    attachment.lifetime = XCTAttachmentLifetimeKeepAlways;
    [self addAttachment:attachment];
  }
  XCTAssertEqual(result, XCTWaiterResultCompleted, @"No final JS report; last state: %@", state);
  XCTAssertNil(state[@"failure"], @"%@", state[@"failure"]);
  XCTAssertEqualObjects(state[@"scenario"], @"bridge-smoke");
  XCTAssertEqualObjects(state[@"documents"], documents, @"The test must share the application's sandbox");
  XCTAssertEqualObjects(state[@"processID"], @(NSProcessInfo.processInfo.processIdentifier));
  XCTAssertEqualObjects(state[@"bundleID"], NSBundle.mainBundle.bundleIdentifier);
  XCTAssertEqualObjects(state[@"runID"], runID);
  XCTAssertEqualObjects(state[@"completed"], @YES);
  NSString *expectedArch = NSProcessInfo.processInfo.environment[@"AGORA_TEST_NEW_ARCH"];
  XCTAssertNotNil(expectedArch);
  XCTAssertEqualObjects(state[@"newArchitecture"], @([expectedArch isEqualToString:@"1"]));
  XCTAssertEqualObjects(state[@"errors"], @[]);
  NSArray *cycles = state[@"cycles"];
  XCTAssertEqual(cycles.count, 2u);
  NSString *expectedVersion = NSProcessInfo.processInfo.environment[@"AGORA_TEST_VERSION"] ?: @"4.6.4.2";
  for (NSDictionary *cycle in cycles) {
    XCTAssertEqualObjects(cycle[@"initialize"], @0);
    XCTAssertEqualObjects(cycle[@"connectionState"], @1);
    XCTAssertEqualObjects(cycle[@"released"], @YES);
    XCTAssertEqualObjects(cycle[@"version"][@"version"], expectedVersion);
  }
}
@end

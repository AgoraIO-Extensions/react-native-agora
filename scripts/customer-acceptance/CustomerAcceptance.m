#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface CustomerAcceptance : NSObject <RCTBridgeModule>
@end

@implementation CustomerAcceptance
RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup { return YES; }

- (NSDictionary *)constantsToExport {
  NSString *documents = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
  NSUserDefaults *defaults = NSUserDefaults.standardUserDefaults;
  return @{
    @"documents": documents,
    @"role": [defaults stringForKey:@"acceptanceRole"] ?: @"publisher",
    @"channel": [defaults stringForKey:@"acceptanceChannel"] ?: @"missing-channel"
  };
}

RCT_EXPORT_METHOD(report:(NSDictionary *)result) {
  NSData *data = [NSJSONSerialization dataWithJSONObject:result options:NSJSONWritingPrettyPrinted error:nil];
  NSString *documents = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
  [data writeToFile:[documents stringByAppendingPathComponent:@"customer-acceptance.json"] atomically:YES];
}

RCT_REMAP_METHOD(nextCommand, nextCommandWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *documents = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
  NSString *path = [documents stringByAppendingPathComponent:@"customer-command.json"];
  NSData *data = [NSData dataWithContentsOfFile:path];
  NSDictionary *command = data ? [NSJSONSerialization JSONObjectWithData:data options:0 error:nil] : nil;
  if (data) [[NSFileManager defaultManager] removeItemAtPath:path error:nil];
  resolve(command ?: @{});
}
@end

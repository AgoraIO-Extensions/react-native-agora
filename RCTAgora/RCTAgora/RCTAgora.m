//
//  RCTAgora.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/13.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "RCTAgora.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTView.h>

@implementation RCTAgora

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

RCT_EXPORT_METHOD(getViewWithTag:(nonnull NSNumber *)reactTag)
{
    
    UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];
    NSLog(@"%@",view);
    
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

@end


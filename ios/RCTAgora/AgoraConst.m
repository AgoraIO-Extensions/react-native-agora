//
//  MyAgoraRtcEngineKit.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/30.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "AgoraConst.h"

@implementation AgoraConst

static AgoraConst *_person;
+ (instancetype)allocWithZone:(struct _NSZone *)zone{
    static dispatch_once_t predicate;
    dispatch_once(&predicate, ^{
        _person = [super allocWithZone:zone];
    });
    return _person;
}

+ (instancetype)share {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _person = [[self alloc]init];
    });
    return _person;
}

- (id)copyWithZone:(NSZone *)zone {
    return _person;
}

@end

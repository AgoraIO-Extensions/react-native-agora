agorafile="AgoraView.js"
if [ ! -f "$agorafile" ]
then
  echo "Need to execute in root directory or else it won’t work"
  return
fi

dir0="ios/RCTAgora/libs"
if [ ! -d "$dir0" ]
then
  mkdir ios/RCTAgora/libs
fi

dir1="ios/RCTAgora/libs/AgoraRtcEngineKit.framework"
if [ ! -d "$dir1" ]
then
  curl -O https://storage.googleapis.com/z1-rumble-dev.appspot.com/AgoraRtcEngineKit.framework.zip
  unzip AgoraRtcEngineKit.framework.zip
  rm AgoraRtcEngineKit.framework.zip
  mv AgoraRtcEngineKit.framework/ ios/RCTAgora/libs/
  echo "$0: AgoraRtcEngineKit.framework downloaded to '${dir1}'."
fi

dir2="ios/RCTAgora/libs/AgoraRtcCryptoLoader.framework"
if [ ! -d "$dir2" ]
then
  curl -O https://storage.googleapis.com/z1-rumble-dev.appspot.com/AgoraRtcCryptoLoader.framework.zip
  unzip AgoraRtcCryptoLoader.framework.zip
  rm AgoraRtcCryptoLoader.framework.zip
  mv AgoraRtcCryptoLoader.framework/ ios/RCTAgora/libs/
  echo "$0: AgoraRtcCryptoLoader.framework downloaded to '${dir2}'."
fi

file1="ios/RCTAgora/libs/libcrypto.a"
if [ ! -f "$file1" ]
then
  curl -O https://storage.googleapis.com/z1-rumble-dev.appspot.com/libcrypto.a.zip
  unzip libcrypto.a.zip
  rm libcrypto.a.zip
  mv libcrypto.a ios/RCTAgora/libs/
  echo "$0: libcrypto.a downloaded to '${dir1}'."
fi

rm -rf __MACOSX
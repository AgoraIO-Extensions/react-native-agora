zipName="AgoraRtcSDK"
temp="/var/tmp"
libs="ios/RCTAgora/Libs"

mkdir -p $temp

version=$(grep "AgoraRtcEngine_iOS" react-native-agora.podspec | grep -o '\d.\d.\d' | sed 's/\./_/g')
echo $zipName "$version"

if [ ! -f $temp/$zipName"$version".zip ]; then
  echo "the zip file not exists, start downloading..."
  curl -o $temp/$zipName"$version".zip "https://download.agora.io/sdk/release/Agora_Native_SDK_for_iOS_v${version}_FULL.zip"
fi

echo "start unzip SDK..."
unzip -o -q $temp/$zipName"$version".zip "**/libs/*" -d $temp/$zipName"$version"

echo "start transfer dynamic framework to $libs..."
rm -rf $libs
mkdir -p $libs

for framework in $(find $temp/$zipName"$version" -maxdepth 5 -iname '*.xcframework'); do
  mv -f "$framework" $libs
done

echo "install finished"

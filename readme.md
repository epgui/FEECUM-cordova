Dependencies
=======================

Basic environment setup:
* [node.js](http://nodejs.org)
* [Apache Cordova](https://cordova.apache.org/)
* [Babel](https://babeljs.io/)

Installing Apache Cordova (requires npm):
```
npm install -g cordova
```

Installing Babel (requires npm):
```
npm install --global babel-cli
```

For iOS:
* [Xcode](https://developer.apple.com/xcode/)
* Xcode Command Line Tools

Installing Xcode Command Line Tools:
```
xcode-select --install
```

For Android:
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Android Studio](https://developer.android.com/studio/index.html)
* [Gradle](https://gradle.org/)


Updating
=======================

Update Apache Cordova CLI:
```
sudo npm update -g cordova
```

Check for platform updates:
```
cordova platform check
```

Update platforms (example):
```
cordova platform update android
cordova platform update ios
```


Deployment instructions
=======================

To deploy and launch in the browser:
```
> npm run build
> cordova run browser
```

To deploy and launch on Android simulator:

```
> npm run build
> cordova build android
> cordova run android --emulator
```

To deploy and launch on iOS simulator:

```
> npm run build
> cordova build ios
> cordova run ios --emulator
```

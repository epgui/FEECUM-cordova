Dependencies
=======================

Dependencies and their instructions are subject to change. These are provided as a rough guide.


Basic environment setup
-----------------------

* [node.js](http://nodejs.org)
* [Apache Cordova](https://cordova.apache.org/)
* [Babel](https://babeljs.io/)

Installing Apache Cordova (requires npm):
```
> npm install -g cordova
```

Installing Babel (requires npm):
```
> npm install --global babel-cli
```


For iOS
-----------------------

* [Xcode](https://developer.apple.com/xcode/)
* Xcode Command Line Tools
* [ios-sim](https://www.npmjs.com/package/ios-sim)
* [ios-deploy](https://www.npmjs.com/package/ios-deploy)

Installing Xcode Command Line Tools:
```
> xcode-select --install
```

Installing ios-sim and ios-deploy (requires npm):
```
> npm install -g ios-sim
> npm install -g ios-deploy
```

If ios-deploy fails to install on El Capitan, try:
```
> npm install --global --unsafe-perm ios-deploy
```


For Android
-----------------------

* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Android Studio](https://developer.android.com/studio/index.html)
* [Gradle](https://gradle.org/)


Updating
=======================

Update instructions are subject to change, but should be relatively stable.

Update Apache Cordova CLI:
```
> sudo npm update -g cordova
```

Check for platform updates (note: this doesn't seem to behave properly on my setup):
```
> cordova platform check
```

Update platforms (example):
```
> cordova platform update android
> cordova platform update ios
```


Deployment instructions
=======================

Deployment instructions are stable.

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

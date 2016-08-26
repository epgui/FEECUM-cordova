![FÉÉCUM: La Fédération des étudiantes et étudiants du Campus universitaire de Moncton](readme-header.png "FÉÉCUM: La Fédération des étudiantes et étudiants du Campus universitaire de Moncton")

Qu'est-ce que l'application mobile de la FÉÉCUM?
=======================

L'application mobile de la FÉÉCUM sera bientôt disponible pour les plateformes mobiles iOS et Android. Elle vous permettra d'accéder directement au calendrier d'événements de la FÉÉCUM, et vous donnera la possibilité de sauvegarder des événements à votre calendrier de téléphone: oublier un événement important sera bientôt chose du passé, avec toutes les fonctionnalités de votre téléphone mobile intégré (rappels avant l'événement, push notifications, alarmes, etc.).

![Le calendrier de la FÉÉCUM... bientôt à portée de la main.](calendrier-bientot.png "Le calendrier de la FÉÉCUM... bientôt à portée de la main.")

Pour plus d'information sur l'application mobile de la FÉÉCUM, veuillez lire
[cet article paru dans Le Front le 29 mars 2016](http://lefront.ca/app-feecum-vie-etudiante-a-portee-de-main/)

Table des matières
=======================

<ol style="background-color: #FCFCFC; padding: 20px;">
  <li>
    <a href="#todo">
      TODO
    </a>
  </li>
  <li>
    <a href="#dependencies">
      Dependencies
    </a>
    <ol>
      <li>
        <a href="#basic-environment-setup">
          Basic environment setup
        </a>
      </li>
      <li>
        <a href="#for-ios">
          For iOS
        </a>
      </li>
      <li>
        <a href="#for-android">
          For Android
        </a>
      </li>
    </ol>
  </li>
  <li>
    <a href="#updating">
      Updating
    </a>
  </li>
  <li>
    <a href="#deployment">
      Deployment
    </a>
  </li>
  <li>
    <a href="#debugging">
      Debugging
    </a>
  </li>
</ol>


![](readme-hr.png)

TODO
=======================
* Implement [webpack](http://webpack.github.io)
* Implement [flow](https://flowtype.org)
* Implement [Redux](http://redux.js.org)
* Implement [React Performance Tools](https://facebook.github.io/react/docs/perf.html)


![](readme-hr.png)

Dependencies
=======================

Dependencies and their instructions are subject to change. These are provided as a rough guide.


Basic environment setup
-----------------------

* [node.js (includes npm)](http://nodejs.org)
* [Apache Cordova](https://cordova.apache.org/)
* [Babel](https://babeljs.io/)

Installing Apache Cordova (requires npm):
```
$ npm install -g cordova
```

Installing Babel (requires npm):
```
$ npm install --global babel-cli
```


For iOS
-----------------------

* [Xcode](https://developer.apple.com/xcode/)
* Xcode Command Line Tools
* [ios-sim](https://www.npmjs.com/package/ios-sim)
* [ios-deploy](https://www.npmjs.com/package/ios-deploy)

Installing Xcode Command Line Tools:
```
$ xcode-select --install
```

Installing ios-sim and ios-deploy (requires npm):
```
$ npm install -g ios-sim
$ npm install -g ios-deploy
```

If ios-deploy fails to install on El Capitan, try:
```
$ npm install --global --unsafe-perm ios-deploy
```


For Android
-----------------------

* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Android Studio](https://developer.android.com/studio/index.html)
* [Gradle](https://gradle.org/)


![](readme-hr.png)

Updating
=======================

Update instructions are subject to change, but should be relatively stable.

Update Apache Cordova CLI:
```
$ sudo npm update -g cordova
```

Check for platform updates (note: this doesn't seem to behave properly on my setup):
```
$ cordova platform check
```

Update platforms (example):
```
$ cordova platform update android
$ cordova platform update ios
```


![](readme-hr.png)

Deployment
=======================

Deployment instructions are stable.

To deploy and launch in Chrome (assuming Chrome is the default browser):
```
$ npm run build
$ cordova run browser
```

To deploy and launch in Safari:
```
$ npm run build
$ cordova run browser --target=Safari
```

To deploy and launch on Android simulator:

```
$ npm run build
$ cordova build android
$ cordova run android --emulator
```

To deploy and launch on iOS simulator:

```
$ npm run build
$ cordova build ios
$ cordova run ios --emulator
```


![](readme-hr.png)

Debugging
=======================

* Install the [React Developer Tools](https://github.com/facebook/react-devtools)
* Enable [Remote Debugging with Safari Developer Tools](https://developer.apple.com/safari/tools/)
* [Debugging with Xcode](https://developer.apple.com/support/debugging/)
* [Debugging with Android Studio](https://developer.android.com/studio/debug/index.html)


![](readme-hr.png)

## Environment configuration:
-----------------------------
- Ionic install    
`npm install -g ionic`

- Cordova install  
`npm install -g cordova`

- Project checkout   
- Remove previous dependencies and install   
`rm -rf node_modules package-lock.json`  
`npm install`       
- To use package-lock.json versions     
`npm ci`           

  
## Project testing:
--------------------
- Run project on browser    
`ionic serve --lab`

- Run project on browser with Cordova plugins (camera access, geolocalization, etc.)    
`ionic cordova run browser`

- Generate and run project for mobile devices    

    _Remove platforms folders (if exists previously) and create_    
    `ionic cordova platform rm ios`     
    `ionic cordova platform add ios`    
    `ionic cordova build ios`    
    `ionic cordova platform rm android`     
    `ionic cordova platform add android`    
    `ionic cordova build android` --> This command generates the file app-debug.apk which can be installed in your Android real device for testing purposes (not needed to generate anything else on Android Studio)     

    _*iOS*: go to "platforms->ios". Open the file finished with "*.xcodeproject" on XCode, sign in with the correct profile (dev/prod) and run it._

    _*Android*: go to "platforms->android". Open the file finished with "*.project" on Android Studio and run it._ Note: If "*.project" doesn't exist:
    * open folder "platforms->android" on Android Studio and the project will be automatically created
    * once the project is loaded, click "Run Anything"
    * click "Make Project"
    * click "Edit Configurations..."
        * click "Add New Configuration"
        * Select "Android App"
        * Save configuration
    * Run the configuration you've just created
   

- Update project changes for mobile devices from the command line (if the project is currently open, it will be updated with the new changes)   
`ionic build ios/android` or `ionic cordova build ios/android`  
  
 ## Code debugging:
 ------------------
 - Run project on Ionic Lab
  `ionic lab`
 
 - App is ready in _localhost:8200_
 
 - Use Dev Tools on your preferred browser (Google Chrome is highly recommended)

For degugging on a real device, follow these instructions: https://medium.com/one-tap-software/the-best-way-to-debug-an-ionic-app-on-a-device-79833bef5d1d
  
## Docs & Useful links
-----------------------   
- Ionic Docs    
<https://ionicframework.com/docs/>    
- Ionic Commands    
<https://ionicframework.com/docs/cli/>      
- Ionic Icons   
<https://ionicframework.com/docs/ionicons/>     

## External components  
----------------------  
- Searchable Select     
<https://ionicacademy.com/ionic-searchable-select-component/>     
- Selectable search (async)       
<https://github.com/eakoriakin/ionic-selectable#getting-started>      
<https://stackblitz.com/edit/ionic-selectable-on-search?file=services%2Fport.service.ts>    

## Fixes    
---------       
### SplashScreen configuration:   
<https://forum.ionicframework.com/t/after-splash-screen-display-white-screen-long-time/80162/31>    
    
    <preference name="AutoHideSplashScreen" value="false" />
    <preference name="SplashScreenDelay" value="10000" />
    <preference name="FadeSplashScreenDuration" value="1000" />
    <preference name="SplashScreen" value="screen" />
    <preference name="ShowSplashScreen" value="true" />
    <preference name="ShowSplashScreenSpinner" value="false" />
    <preference name="SplashShowOnlyFirstTime" value="false" />
    <preference name="FadeSplashScreen" value="true" />

  Note: This didn't work on Marie's environment

### Black screen on start fix:    
    Go to platforms/android/app/src/main/AndroidMainfest.xml
    Search android:theme="@android:style/Theme.DeviceDefault.NoActionBar"        
    Change with android:theme="@android:style/Theme.Translucent.NoTitleBar"   

  Note: This didn't work for white screen on Marie's environment

### Ionic Lab devices visualization problems:   
    Install: npm i @ionic/lab@rc      

### ERROR: Start Page at 'www/index.html' was not found.    
    Run and the project will be updated: ionic cordova build ios      

### ERROR: on generate Android platform: sdk not found & gradle not found     
    -Add next env vars:   
    export ANDROID_HOME=/Users/"USER"/Library/Android/sdk     
    export ANDROID_SDK_ROOT=/"USER"/juanbrusco/Library/Android/sdk      
    export ANDROID_AVD_HOME=/"USER"/juanbrusco/.android/avd     
    export PATH="/Applications/Android Studio.app/Contents/gradle/gradle-5.4.1/bin/:$PATH"      
    -Set perms. to gradle folder:     
    sudo chmod 777 /Applications/Android\ Studio.app/Contents/gradle/gradle-5.4.1/bin/gradle      

### ERROR: on generate iOS App to upload: app store icon problem (alpha & color)    
    <https://stackoverflow.com/questions/46585809/error-itms-90717-invalid-app-store-icon>        
  
### Delete Ionic/Cordova      
`npm uninstall -g ionic`    
`npm uninstall -g cordova`  
`npm cache clean -f`    
`npm list -g --depth=0 (check list of npm dependencies installed)`  

### Migrate to Ionic v5     
<https://ionicframework.com/blog/announcing-ionic-5/>       
<https://ionicframework.com/docs>       
<https://github.com/ionic-team/ionic/blob/master/BREAKING.md#version-5x>        
<https://ionicframework.com/docs/building/migration>             
`npm i @ionic/angular@latest --save --save-exact`    
`npm install @ionic/angular@latest @ionic/angular-toolkit@latest --save`        
`ionic info`        
    Ionic CLI                     : 5.2.1       
    Ionic Framework               : @ionic/angular 5.0.0    
Then migrate Angular ... ->     

### Migrate to Angular 8 and Node 12        
<https://update.angular.io/#7.2:8.0l3>          
`ng update @angular/cli@8 @angular/core@8`      
`nvm install v12.1.0`     
`nvm use v12.1.0` or just `nvm use`     
`rm -rf node_modules`     
`npm cache clean --force`       
`npm ci`       

### ERROR: gyp: No Xcode or CLT version detected          
`rm -rf node_modules`     
`npm i node-gyp --save`     
`sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`     
`npm ci`       

### ERROR: doc.find is not a function       
Config.xml -> iOS Platform -> change `edit-config` to `config-file`     
<https://stackoverflow.com/questions/47404622/edit-config-for-ios-usage-descriptions-doc-find-is-not-a-function>        
     


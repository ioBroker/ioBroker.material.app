## Global

## Settings
- Loading indicator
<!-- - Show in settings hint: you can slide right to left to show settings button -->

## Logic
<!-- Open menu in material by slide left to right -->
<!-- Show settings button in App by slide right to left and hide after 5 seconds -->
- Send to webview GPS coordinates, battery (GPS must run in background too)
- Settings: instance (example: 'kids') => material.0.app.kids.battery (position)
- Settings: send GPS and battery to ioBroker (Warning: APP will run in background)

## img
Wi-Fi https://www.flaticon.com/free-icon/wifi_159599?term=wifi&page=1&position=7
see https://www.flaticon.com/free-icon/eye-closeup_63786?term=see&page=1&position=15&page=1&position=15&related_id=63786&origin=search
settings https://www.flaticon.com/free-icon/settings_2099174?term=settings&page=1&position=42&page=1&position=42&related_id=2099174&origin=search
refresh https://www.flaticon.com/free-icon/refresh-page-option_25429?term=refresh&page=1&position=10&page=1&position=10&related_id=25429&origin=search

## How to build android app
0. Call: npx jetify
1. Place ioBroker.vis.keystore into android/app
2. Write password in android/app/build.gradle on the line 158 and 160
3. cd android
4.1 gradlew bundleRelease - to create aab
4.2. gradlew assembleRelease - to create apk

## How to test android
node node_modules\react-native\cli.js run-android --variant=release

If it does not work:
cd android && gradlew clean && cd .. && node node_modules\react-native\cli.js run-android
## SETUP

### Installation 

You will need to install 
- nativescript
- genymotion
- virtualbox

1 Start genymotion and create a new device

2 Start the new device / emulator in the genymotion

3 Go to the app's root and start your app in the emulator


`tns livesync android --watch`

(this will deploy all code changes on the fly )


### Debugging
To debug just attach debugger to the running app:

`tns debug android --start`

TIP: 

Remember to turn off the nginx listening at the same port as debugger

TIP: If your XML gets "broken" and after fixing it your app still isn't working try renaming the view's folder as this should avoid the cached version of it. Later rename it back ;)

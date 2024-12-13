# Remote Wifi Battery Status for TP-Link

> [!WARNING]
> This application only works with TP-Link type router

> [!IMPORTANT]
> Please follow the instructions step by step

1. Install [Node Js]([https://pages.github.com/](https://nodejs.org/en/download/package-manager))
2. Download this project [^1]
3. Open terminal in project
4. Enter commands in terminal [^2].

[^1]: Do not enter commands in new terminal
[^2]: Follow commands one by one
```
  npm init
  npm i sound-play
  npm i path
  npm i url
  npm i puppeteer
  npm i electron
  npm i electron-packager
  npm i fs
```

In the project folder you will have a new folder named **router-status-win32-x64** inside there will be a folder with the application, all you have to do is launch the application itself, after which the application icon will appear in your tray.

> [!NOTE]
> Rules
> 1. The application updates data every 5 minutes
> 2. If the application is running, you will be deauthorized from the browser if you are logged in when the application is launched (the deauthorization interval is 5 minutes) since the application is logging in
> 3. There is a problem with compiling the icon, for some unknown reason it does not want to be installed on the application. You can use the npm run package command to build the application with the icon, but in this case there will be no sound effect that plays every 5 minutes to notify the user that the data has been updated.

## Supported OS
- [x] Windows 10+ x64/x32
- [ ] Ubuntu (Not tested)
- [ ] MacOS (Not tested)

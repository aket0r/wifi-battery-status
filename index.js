const sound = require("sound-play");
const path = require("path");
const url = require("url");
const puppeteer = require('puppeteer');
const {app, BrowserWindow, Menu, Tray} = require("electron");
const fs = require("fs");
const soundFilePath = path.join(__dirname, '/assets/sounds/update.mp3')
let isTray = true;
let appTray = null;
let isWindow = false;
let trayMenuTemplate = [
    {
        label: "Exit",
        click: function () {
            app.quit();
            app.quit();
        }
    }
];

let status = "0";

async function checkingBatteryStatus() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://192.168.0.1/login.html', {waitUntil: 'networkidle2'});
    await page.waitForSelector('#password');
    await page.$eval('input', el => el.value = 'YOUR_PASSWORD'); // Enter your password
    await page.click('button');
    await page.waitForSelector('#topElectricity');
    await page.waitForNavigation();
    const text = await page.evaluate(() => {
        const anchor = document.querySelector('ul');
        return [anchor.querySelectorAll("li")[6].title.replace("Charging (", "").replace(")", "").trim(), anchor.querySelectorAll("li")[6].title, document.querySelector("body").innerHTML];
    });
    status = text[1];
    fs.writeFileSync('status.txt', text[1]);
    await browser.close();
    sound.play(soundFilePath, 0.5);
    if(!isWindow) {
        createWindow();
    }
}

async function createWindow() {
    isWindow = true;
    trayIcon = path.join('assets/icons/');
    appTray = new Tray(path.join (trayIcon, 'icon.ico'));
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setToolTip(`${status}`);
    appTray.setContextMenu(contextMenu);

    appTray.addListener("click", function() {
        win = new BrowserWindow({
            resizable: false,
            width: 350,
            height: 200,
            autoHideMenuBar: true,
            icon: `${__dirname}/assets/icons/icon.ico`,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                __dirname: true
            },
            show: true
        });
            
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        }));
        win.removeMenu();
        app.focus();
        // win.webContents.openDevTools();
    
        win.on('closed', () => {
            win = null;
            isTray = false;
        });      
    }, {
        once: true
    })  
}

app.on('ready', function() {
    checkingBatteryStatus();
    setInterval(checkingBatteryStatus, 60*1000*5);
});
app.on('window-all-closed', () => {});

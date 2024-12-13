const puppeteer = require('puppeteer');
const fs = require("fs");
// Or import puppeteer from 'puppeteer-core';
let connectionStatus = document.querySelector("#connection-status span");
let networkType = document.querySelector("#network-type span");
let ssid = document.querySelector("#ssid span");
let currentClients = document.querySelector("#current-clients span");
let wirelessBand = document.querySelector("#wirelessBand span");
let batteryStatusText = document.querySelector("#battery-status span");
const data = [];
let batteryStatus = fs.readFileSync('status.txt', { encoding: 'utf8', flag: 'r' });

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://192.168.0.1/login.html', {waitUntil: 'networkidle2'});
    const keys = await page.evaluate(() => {
        function d(el) {
            return document.querySelector(el).innerText;
        }
        const body = document.querySelector("body").innerHTML;
        return {
            connectionStatus: d("#connection"),
            networkType: d("#networkType"),
            ssid: d("#ssid"),
            currentClients: d("#curClients"),
            wirelessBand: d("#wirelessBand")
        };
    });
    data.push(keys);
    loadElementsData();
    await browser.close();
})();

function loadElementsData() {
    connectionStatus.innerText = data[0].connectionStatus;
    networkType.innerText = data[0].networkType;
    ssid.innerText = data[0].ssid;
    currentClients.innerText = data[0].currentClients;
    wirelessBand.innerText = data[0].wirelessBand;
    batteryStatusText.innerText = batteryStatus;
}
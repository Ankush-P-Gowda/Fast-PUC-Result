const puppeteer = require('puppeteer');
const BASE_URL = "http://karresults.nic.in/indexpuc_2020.asp";
const fs = require('fs');
let browser = null;
let page = null;

const result = {
    start : async () => {
        browser = await puppeteer.launch({
            // headless:false,
            // slowMo:50,
        });
        page = await browser.newPage();
        await page.goto(BASE_URL);  
    },

    compute : async (reg_no) => {
        await page.goto(BASE_URL);  
        reg = reg_no.toString(); 
        try{
            await page.type('#reg',reg);
            await Promise.all([
                page.waitForNavigation(),
                page.click('.btn')
            ]);
            let details = await page.evaluate(() => {
                return{
                    name : document.querySelector('#details tr:nth-child(1) td:nth-child(2) span').innerText,
                    reg: document.querySelector('#details > tbody > tr:nth-child(2) > td:nth-child(2) > span').innerText,
                    subject1:{
                        sub_name: document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(1)').innerText,
                        marks: document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(4').innerText,
                    },
                    subject2:{
                        sub_name: document.querySelector('  body > div.col-lg-6.col-md-offset-3 > div:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(1)').innerText,
                        marks:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(4)').innerText
                    },
                    subject3:{
                        sub_name:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(1)').innerText,
                        marks:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(4)').innerText
                    },
                    subject4:{
                        sub_name:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(1)').innerText,
                        marks:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4)').innerText
                    },
                    subject5:{
                        sub_name:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(4) > td:nth-child(1)').innerText,
                        marks:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(4) > td:nth-child(4)').innerText
                    },
                    subject6:{
                        sub_name:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(5) > td:nth-child(1)').innerText,
                        marks:document.querySelector('body > div.col-lg-6.col-md-offset-3 > div:nth-child(5) > table > tbody > tr:nth-child(5) > td:nth-child(4)').innerText
                    },
                    total:document.querySelector('#result > tbody > tr:nth-child(1) > td:nth-child(2)').innerText,
                    percentage:document.querySelector('#result > tbody > tr:nth-child(1) > td:nth-child(2)').innerText/6
                }
            })
            await page.goBack();
            return details;
        }
        catch(error){
            await page.goBack();
            return null;
        }
    },

    json: async (strengthDetails) => {
        fs.writeFileSync('./data.json',JSON.stringify(strengthDetails),'utf-8');
    },

    close: async () => {
        await browser.close();
    }
};

module.exports = result;

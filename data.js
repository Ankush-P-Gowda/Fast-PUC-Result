const puppeteer = require('puppeteer');
const result    = require('./result');
let startReg = 100000;
let strength = 1;
let strengthDetails = [];

(async () => {
    await result.start();
    while(strength <= 100000){
        let detail = await result.compute(startReg);
        if(detail == null){
            console.log("invalid reg no");
            startReg++; 
        }else{
            strengthDetails.push(detail);
            console.log(strength); 
            startReg++;
            strength++;
        }      
    }
    await result.json(strengthDetails);
    await result.close();   
    console.log(strengthDetails);
    console.log(strength-1);
    
})();
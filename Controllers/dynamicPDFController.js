const fs = require('fs')  
const path = require('path')  
const puppeteer = require('puppeteer');

puppeteer.launch().then(browserInstance => {
    browserInstance.newPage().then(page => {
        page.goto('http://localhost:8000/cv_naukri').then((response) => {
            page.setViewport({
                width: 1020,
                height: 1638,
                deviceScaleFactor: 2
            }).then(() => {
                page.pdf({path: './dynimages/cv_naukri_generated.pdf', format: 'A4', printBackground: true}).then(data => {
                    console.log('done');
                    process.exit();
                });
            });
            
        })
    });
})
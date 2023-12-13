//import {test,expect} from '@playwright/test';
const {test,expect} = require('@playwright/test')
test('Pop up validation', async({page})=>
{
    await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
   // await page.pause();
    await page.locator("#mousehover").hover();
    const framesPage=await page.frameLocator("#courses-iframe");
    await framesPage.locator("li [href='lifetime-access']:visible").click();
    //await page.pause();
    const subscribers= await framesPage.locator(".text h2").textContent();
    console.log(subscribers);
    console.log(subscribers.split(" ")[1]);
    //await page.pause();

})

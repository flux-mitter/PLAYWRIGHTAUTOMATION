const {test, expect} = require('@playwright/test')

test('Browser context Playwright test',async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://www.flipkart.com/");
    console.log(await page.title());
})

test('Page Playwright test',async ({browser,page})=>
{
    // const context= await browser.newContext();
    // const page= await context.newPage();
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
})

test('Validate Rahulshetty Page',async ({browser,page})=>
{
    // const context= await browser.newContext();
    // const page= await context.newPage();
    const userName = page.locator('input#username')
    const signIn =  page.locator("input#signInBtn");
    const cardTitles=page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("input[name='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("div[style*='block']").textContent());
    ////label[text()='Username:']/../preceding-sibling::*
    await expect(page.locator("div[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles)
})

test('Validate Register Page Rahulshetty',async({browser,page}) =>
{

    await page.goto("https://www.rahulshettyacademy.com/client/");
    //await page.waitForTimeout(5000); 
    await page.locator("a.btn1:has-text('Register')").click();
    await page.locator("input[type='firstName']").fill("Yash");
    await page.locator("input[type='lastName']").fill("Miter");
    await page.locator("input[type='email']").fill("yash.mitter@gmail.com");
    await page.locator("input[formcontrolname='userMobile']").fill("9008654412");
    await page.locator("label input[value='Male']").click();
    await page.locator("input[formcontrolname='userPassword']").fill("Test1234$");
    await page.locator("input[formcontrolname='confirmPassword']").fill("Test1234$");
    await page.locator("input[formcontrolname='required']").click();
    await page.locator("input#login").click();
    await page.waitForTimeout(5000); 

})
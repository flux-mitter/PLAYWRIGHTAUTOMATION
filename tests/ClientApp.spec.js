const {test, expect} = require('@playwright/test');
const { text } = require('wd/lib/commands');

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

test("Browser Context-Validating Error Login", async({page})=>
{
    const cardTitles=page.locator("div.card-body b");
    await page.goto("https://www.rahulshettyacademy.com/client/");
    await page.locator("input[formcontrolname='userEmail']").fill("yash.mitter@gmail.com");
    await page.locator("input[formcontrolname='userPassword']").fill("Test1234$");
    await page.locator("input#login").click();
    //Dynamic wait but discontinued
    //await page.waitForLoadState('networkidle');
    //Wait for e particular element
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(await cardTitles.first().textContent());
   // await page.waitForTimeout(5000); 


})

test("Ui Controls",async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('input#username');
    const signIn =  page.locator("input#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("a[href*='documents-request']")
    await dropdown.selectOption("consult");
    await page.locator("span.radiotextsty").nth(1).click();
    await page.locator("button#okayBtn").click();
    await expect(page.locator("span.radiotextsty").nth(1)).toBeChecked();
    console.log(await page.locator("span.radiotextsty").nth(1).isChecked())
    await page.locator("input#terms").click();
    await expect(page.locator("input#terms")).toBeChecked();
    await page.locator("input#terms").uncheck();
    expect(await page.locator("input#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class",'blinkingText'); 
    //await page.pause();

    
})

test("Child Window handling", async({browser})=>
{
     const context = await browser.newContext();
    const page= await context.newPage();
    const userName = page.locator('input#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("a[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        
        context.waitForEvent('page'),
        await documentLink.click(),
        
    ])
    const text= await newPage.locator("p.red").textContent();
    const arrayText = text.split("@");
    const domainText=arrayText[1].split(" ");
    const domain = domainText[0];
    const emailText = arrayText[0].split(" ");
    const user = emailText[emailText.length-1];
    const email = user+"@"+domain;
    page.locator()
    console.log(email);
    await userName.type(domain);
    
})

test("Test end to end flow for product buying ",async({page}) =>
{
    await page.goto("https://www.rahulshettyacademy.com/client/");
    const cardTitles=page.locator("div.card-body b");
    const products = page.locator("div.card-body");
    const productName = "zara coat 3";
    const totalCartItems = page.locator("div ul li[class*='inserted']");
    const orders =  page.locator("tbody tr");
    await page.locator("input[formcontrolname='userEmail']").fill("yash.mitter@gmail.com");
    await page.locator("input[formcontrolname='userPassword']").fill("Test1234$");
    await page.locator("input#login").click();
    await cardTitles.first().waitFor();
  
    //Delete all the previously Selected Items
    await page.locator(".btn.btn-custom:has-text('Cart')").click();
    
    const count = await totalCartItems.count();
    for(let i =0; i<count;i++)
    {
        await totalCartItems.nth(i).locator("button i[class*='trash']").click();
    }
    await page.locator("button:has-text('home')").click();
    await page.locator("button:has-text('ORDERS')").click();
    //await orders.first().waitFor();
    await page.waitForTimeout(3000); 
    const totalPreviousOrders =await orders.count();
    for(let i=0;i<totalPreviousOrders;i++)
    {
        
        await page.waitForTimeout(1000); 
            await orders.nth(i).locator("td button:has-text('Delete')").click();
         
        
    }
    await page.locator("button:has-text('home')").click();

    await cardTitles.first().waitFor();
    
    const counts= await products.count();
    const allTitles = await cardTitles.allTextContents();
    console.log(await cardTitles.first().textContent());
  
   console.log("countting = "+counts);
    for(let i=0;i<counts;i++)
    {
        console.log(i);
       if (await products.nth(i).locator("b").textContent()==productName)
       {
        //add to cart
        await products.nth(i).locator("button:has-text('Add to Cart')").click();
       }
    }
    
    await page.locator(".btn.btn-custom:has-text('Cart')").click();
    await page.locator("div li").first().waitFor();
    const itemPresent = await totalCartItems.first().isVisible();
    
    expect(itemPresent).toBeTruthy();
    
    await page.locator("button:has-text('checkout')").click();
    await page.locator("div:has-text('cvv code').title+input").fill("123");
    await page.locator("//div[contains(text(),'Name on Card')]/following-sibling::input").fill("Yash Mitra");
    //div:has-text('cvv code').title input[class*='input txt']
    await page.locator("input[placeholder*='Country']").type("Ind", {delay:100});
    const section = page.locator(".ta-results");
    await section.waitFor();
    const dropDown = page.locator(".ta-results button span");
  
    const optionsCount= await dropDown.count();
    for(let i=0;i<optionsCount;i++)
    {
       const text=(await dropDown.nth(i).textContent()).trim();
       console.log(text);
       if(text=="India")
       {
        await dropDown.nth(i).click();
        break;
       }
    }
    await page.locator("a:has-text('Place Order')").click();
    //await page.pause();
    //let confirmation = await page.locator("h1").textContent();
    //expect(confirmation).toContainText("THANKYOU FOR THE ORDER");
    await expect(page.locator("h1")).toContainText(" Thankyou for the order. ");
    const orderNumberRaw = await page.locator("tr.ng-star-inserted label").textContent();
    
    const arrayText = orderNumberRaw.split(" ");
    const confirmationId = arrayText[2];
    console.log(confirmationId);
    await page.locator("button:has-text('ORDERS')").click();
    await page.locator("tbody").waitFor();
    const totalOrders =await orders.count();
    for(let i=0;i<totalOrders;i++)
    {
        if(await orders.nth(i).locator("th[scope='row']").textContent()==confirmationId)
        {
            await orders.nth(i).locator("td button:has-text('View')").click();
            break;
        }
    }
    await page.pause();



})

async function deleteAllCartValues({page},totalItems) {
    await page.locator(".btn.btn-custom:has-text('Cart')").click();
    page.locator("div li").waitFor();
    const count = await totalItems.count();
    for(let i =0; i<count;i++)
    {
        await totalItems.nth(i).locator("button i[class*='trash']").click();
    }
    await page.locator("button:has-text('home')").click();
  }


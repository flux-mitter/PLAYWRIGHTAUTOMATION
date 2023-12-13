import {test,expect} from '@playwright/test';
test('playwright special locators',async({page}) =>
{
 await page.goto("https://www.rahulshettyacademy.com/angularpractice/");
 //await page.getByRole("",{name:'name'}).fill("yash");
 await page.locator("input.form-control[name='name']").fill("yash");
 await page.locator("input.form-control[name='email']").fill("yash.mitter@gmail.com");
 await page.getByPlaceholder("Password").fill('abc123');
 await page.getByLabel("Check me out if you Love IceCreams!").click();
 await page.getByLabel("Gender").selectOption("Male");
 await page.getByLabel("Student").check();
 //await page.locator("input.form-control[name='bday']").fill("12051997");
 await page.getByRole("button" , {name:'Submit'}).click();
 await page.getByRole("link",{name:"Shop"}).click();
 await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button",{hasText:"Add"}).click();


})
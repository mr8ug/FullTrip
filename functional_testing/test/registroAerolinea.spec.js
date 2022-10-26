require('chromedriver');
require('dotenv').config();

const { Builder, By, Key, until } = require('selenium-webdriver')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')


describe('RegistroAerolinea', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })



  it('RegistroAerolinea', async function() {
    await driver.get(process.env.REACT_APP_URL)
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    //find and scroll into element
    let element = driver.findElement(By.id("unfocused"))
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300);
    

    
    await driver.findElement(By.xpath("//select[@id='tipo_empresa']")).click()
    await driver.sleep(500)
    {
      const dropdown = await driver.findElement(By.xpath("//select[@id='tipo_empresa']"))
      await driver.sleep(500)
      await dropdown.findElement(By.xpath("//option[. = 'Aerolinea']")).click()
    }
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300);
    
    await driver.findElement(By.id("nombre")).sendKeys("AeroFlights")
    
    await driver.findElement(By.id("correo")).sendKeys("af@gmail.com")
    
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Australia']")).click()
    }
    await driver.sleep(2000)
    
    
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Agnes Water']")).click()
    }
    
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.findElement(By.xpath("//form/div[2]/button")).click()
    await driver.sleep(500)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })
})

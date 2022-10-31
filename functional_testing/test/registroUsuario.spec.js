require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')



describe('RegistroUsuario', function() {
  this.timeout(30000)
  let driver
  let vars
  const chromeOptions = new ChromeOptions();
  chromeOptions.excludeSwitches('enable-logging');
  beforeEach(async function() {
  
    driver = await new Builder().
    withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(chromeOptions)
    .build()
    
  })
  afterEach(async function () {
    await driver.quit();
  })

  it('RegistroUsuario', async function () {
    await driver.get(process.env.REACT_APP_URL+"Registrarse")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("correo")).click()
    await driver.findElement(By.id("correo")).sendKeys("seleniumregtest@gmail.com")
    await driver.findElement(By.id("user")).sendKeys("seleniumregtest")
    await driver.findElement(By.id("nombre")).sendKeys("Registro Selenium")
    
    await driver.findElement(By.id("fecha")).sendKeys("31-07-1998")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.sleep(1000)
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala']")).click()
    }
    await driver.sleep(2000)
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala City']")).click()
    }
    await driver.findElement(By.xpath("//button[2]")).click()
    await driver.sleep(2000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    // await driver.sleep(2000)
    // expect (await driver.findElement(By.css(".swal2-confirm")).getText()).to.equal("Ok")
  })

  it('RegistroUsuario 2', async function () {
    await driver.get(process.env.REACT_APP_URL+"Registrarse")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("correo")).click()
    await driver.findElement(By.id("correo")).sendKeys("hs@gmail.com")
    await driver.findElement(By.id("user")).sendKeys("seleniumregtest")
    await driver.findElement(By.id("nombre")).sendKeys("Registro Selenium")
    
    await driver.findElement(By.id("fecha")).sendKeys("31-07-1998")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.sleep(1000)
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala']")).click()
    }
    await driver.sleep(2000)
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala City']")).click()
    }
    await driver.findElement(By.xpath("//button[2]")).click()
    await driver.sleep(2000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    // await driver.sleep(2000)
    // expect (await driver.findElement(By.css(".swal2-confirm")).getText()).to.equal("Ok")
  })

  it('Fallo RegistroUsuario 3', async function () {
    await driver.get(process.env.REACT_APP_URL+"Registrarse")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("correo")).click()
    await driver.findElement(By.id("correo")).sendKeys("hs@gmail.com")
    await driver.findElement(By.id("user")).sendKeys("seleniumregtest")
    await driver.findElement(By.id("nombre")).sendKeys("Registro Selenium")
    
    await driver.findElement(By.id("fecha")).sendKeys("31-07-1998")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.sleep(1000)
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala']")).click()
    }
    await driver.sleep(2000)
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala City']")).click()
    }
    await driver.findElement(By.xpath("//button[2]")).click()
    await driver.sleep(2000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    // await driver.sleep(2000)
    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("El correo o el usuario ya se encuentra registrado")
  })

  
})
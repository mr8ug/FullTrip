require('chromedriver');
require('dotenv').config();

const { Builder, By, Key, until } = require('selenium-webdriver')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')


describe('RegistroUsuario', function () {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
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
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala']")).click()
    }
    await driver.manage().setTimeouts({ implicit: 3000 })
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Guatemala City']")).click()
    }
    await driver.findElement(By.css(".RegistroUsuario_btn_crear__cLDrC")).click()
    await driver.findElement(By.css(".swal2-confirm")).click()
  })
})
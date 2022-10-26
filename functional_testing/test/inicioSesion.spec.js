require('chromedriver');
require('dotenv').config();

const { Builder, By, Key, until } = require('selenium-webdriver')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')

describe('IniciarSesion', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
  
    driver = await new Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
    
  })

  afterEach(async function() {
    await driver.quit()
  })

  it('IniciarSesion', async function() {
    console.log('process ', process.env)
    await driver.get(String(process.env.REACT_APP_URL)+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("nombre_usuario")).click()
    await driver.findElement(By.id("nombre_usuario")).sendKeys("pruebaselenium@gmail.com")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
  })
})







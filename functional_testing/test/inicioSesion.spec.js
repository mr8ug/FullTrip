require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')



describe('IniciarSesion', function() {
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

  afterEach(async function() {
    await driver.quit()
  })

  it('IniciarSesion 1', async function() {
    // console.log('process ', process.env)
    await driver.get(String(process.env.REACT_APP_URL)+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("nombre_usuario")).click()
    await driver.findElement(By.id("nombre_usuario")).sendKeys("pruebaselenium@gmail.com")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(1000) 
    // await driver.findElement(By.xpath("//button[contains(.,'Ok')]")).click()

    expect(    await driver.findElement(By.id("swal2-title")).getText()).to.equal("Bienvenido")

  })

  it('IniciarSesion 2', async function() {
    // console.log('process ', process.env)
    await driver.get(String(process.env.REACT_APP_URL)+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("nombre_usuario")).click()
    await driver.findElement(By.id("nombre_usuario")).sendKeys("hs2@gmail.com")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(1000) 
    // await driver.findElement(By.xpath("//button[contains(.,'Ok')]")).click()

    expect(    await driver.findElement(By.id("swal2-title")).getText()).to.equal("Bienvenido")

  })

  it('Fallo Inicio Sesion', async function(){
    await driver.get(String(process.env.REACT_APP_URL)+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("nombre_usuario")).click()
    await driver.findElement(By.id("nombre_usuario")).sendKeys("hs2@gmail.com")
    await driver.findElement(By.id("contrasena")).sendKeys("")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(1000)
    expect(await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("El email o la contraseña son incorrectos")
  })
})







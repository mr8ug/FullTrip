require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')



describe('ReviewServicio', function() {
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
    await driver.quit();
  })
  it('Review', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.id("nombre_usuario")).sendKeys("mrcarloscampos@gmail.com")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.id("fill-tabs-tab-reservas")).click()

    await driver.sleep(2000)
    let element = driver.findElement(By.className("card-footer"))
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300)
    await driver.findElement(By.linkText("Calificar")).click()
    await driver.findElement(By.id("description")).sendKeys("SeleniumOpinion")
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//div/div/div/div[2]/form/button")).click()
    await driver.sleep(2000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.css(".swal2-confirm")).getText()).to.equal("Ok")
  })
})

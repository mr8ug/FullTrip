require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')

const path = require('path')


describe('ReviewServicio', function() {
  console.log('PATH',path.resolve(process.cwd()))
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
  it('RegistroHabitacion', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("hs2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//button[@type=\'submit\']")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//button[@id=\'fill-tabs-tab-favoritos\']")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//div[@id=\'fill-tabs-tabpane-favoritos\']/div/button")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("//button[@id=\'fill-tabs-tab-habitaciones\']")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("(//button[@type=\'button\'])[8]")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("//input[@id=\'room_name\']")).sendKeys("ElOcacio")

    var chooseFile = driver.findElement(By.id("imagen"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/habitacion.jpg");
    
    await driver.findElement(By.xpath("//input[@id=\'habitaciones\']")).sendKeys("10")
    await driver.findElement(By.xpath("//input[@id=\'fecha_disponible\']")).sendKeys("31-10-2022")
    await driver.findElement(By.xpath("//input[@id=\'fecha_fin\']")).sendKeys("31-12-2022")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("399")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })
})

require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options: ChromeOptions } = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')



describe('ReservaServicios', function () {
    this.timeout(30000)
    let driver
    let vars
    const chromeOptions = new ChromeOptions();
    chromeOptions.excludeSwitches('enable-logging');
    beforeEach(async function () {

        driver = await new Builder().
            withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(chromeOptions)
            .build()

    })
    afterEach(async function () {
        await driver.quit();
    })
    it('ReservarAuto', async function () {
        await driver.get(process.env.REACT_APP_URL + "IniciarSesion")
        await driver.manage().window().setRect({ width: 945, height: 1020 })
        await driver.findElement(By.id("nombre_usuario")).click()
        await driver.findElement(By.id("nombre_usuario")).sendKeys("mrcarloscampos@gmail.com")
        await driver.findElement(By.id("contrasena")).click()
        await driver.findElement(By.id("contrasena")).sendKeys("1234")
        await driver.findElement(By.xpath("//div[2]/button")).click()
        await driver.sleep(2000)
        await driver.findElement(By.xpath("//div[6]/button")).click()
        await driver.sleep(2000)
        await driver.findElement(By.id("autos")).click()
        await driver.sleep(2000)
        await driver.findElement(By.linkText("Reservar")).click()
        await driver.sleep(2000)

        await driver.findElement(By.name("start_date")).sendKeys("26-10-2022")

        await driver.findElement(By.name("end_date")).sendKeys("31-10-2022")
        await driver.findElement(By.id("observations")).click()
        await driver.findElement(By.id("observations")).sendKeys("Tanque Lleno")
        await driver.findElement(By.id("contrasena")).sendKeys("1234")
        await driver.findElement(By.xpath("//div[2]/div/form/button")).click()
        await driver.sleep(2000)
        // await driver.findElement(By.xpath("//div[6]/button")).click()
        // await driver.sleep(1000)
        // expect (await driver.findElement(By.css(".swal2-confirm")).getText()).to.equal("OK")
    })

    it('ReservarHotel', async function () {
        await driver.get(process.env.REACT_APP_URL + "IniciarSesion")
        await driver.findElement(By.id("nombre_usuario")).click()
        await driver.findElement(By.id("nombre_usuario")).sendKeys("mrcarloscampos@gmail.com")
        await driver.findElement(By.id("contrasena")).click()
        await driver.findElement(By.id("contrasena")).sendKeys("1234")
        await driver.sleep(2000)
        await driver.findElement(By.xpath("//div[@id=\'root\']/div/div/form/div[2]/button")).click()
        await driver.sleep(2000)
        await driver.findElement(By.xpath("//div[6]/button")).click()
        await driver.findElement(By.id("hoteles")).click()
        await driver.sleep(2000)
        await driver.findElement(By.linkText("Reservar")).click()
        await driver.sleep(2000)
        // await driver.findElement(By.id("start_date")).click()
        await driver.findElement(By.id("start_date")).sendKeys("25-11-2022")
        await driver.findElement(By.id("end_date")).click()
        await driver.findElement(By.id("end_date")).sendKeys("2022-11-30")
        await driver.findElement(By.id("description")).click()
        await driver.findElement(By.id("description")).sendKeys("SeleniumTest4")
        await driver.findElement(By.id("contrasena")).sendKeys("1234")
        await driver.sleep(2000)
        await driver.findElement(By.xpath("//button[contains(.,'Solicitar Reserva')]")).click()
        await driver.sleep(2000)
        expect(await driver.findElement(By.css(".swal2-confirm")).getText()).to.equal("OK")

    })

    it('ReservarVuelo', async function () {
        await driver.get(process.env.REACT_APP_URL + "IniciarSesion")
        await driver.manage().window().setRect({ width: 945, height: 1020 })
        await driver.findElement(By.id("nombre_usuario")).click()
        await driver.findElement(By.id("nombre_usuario")).sendKeys("mrcarloscampos@gmail.com")
        await driver.findElement(By.id("contrasena")).click()
        await driver.findElement(By.id("contrasena")).sendKeys("1234")
        await driver.findElement(By.xpath("//div[2]/button")).click()
        await driver.sleep(2000)
        await driver.findElement(By.xpath("//div[6]/button")).click()
        await driver.sleep(2000)
        await driver.findElement(By.id("aerolineas")).click()
        await driver.sleep(2000)
        await driver.findElement(By.linkText("Reservar")).click()
        await driver.sleep(2000)
        await driver.findElement(By.name("fecha")).sendKeys("31-10-2022")
        await driver.findElement(By.id("observaciones")).click()
        await driver.findElement(By.id("observaciones")).sendKeys("Selenium")
        await driver.findElement(By.id("contrasena")).sendKeys("1234")
        await driver.findElement(By.xpath("//div[2]/div/form/button")).click()
        await driver.sleep(2000)
        // await driver.findElement(By.xpath("//div[6]/button")).click()
        // await driver.sleep(2000)
        expect(await driver.findElement(By.css(".swal2-confirm")).getText()).to.equal("OK")
    })
})
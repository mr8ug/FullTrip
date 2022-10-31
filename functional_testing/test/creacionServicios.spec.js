require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')

const path = require('path')


describe('CreacionServicio', function() {
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
  it('CrearHabitacion 1', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("hs2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    
    await driver.findElement(By.xpath("(//button[@type=\'button\'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-habitaciones")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear una habitacion\')]")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//input[@id=\'room_name\']")).sendKeys("ElOcacio")

    var chooseFile = driver.findElement(By.id("imagen"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/habitacion.jpg");
    
    await driver.findElement(By.xpath("//input[@id=\'habitaciones\']")).sendKeys("10")
    await driver.findElement(By.xpath("//input[@id=\'fecha_disponible\']")).sendKeys("30-11-2022")
    await driver.findElement(By.xpath("//input[@id=\'fecha_fin\']")).sendKeys("31-12-2022")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("399")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })

  it('CrearHabitacion 2', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("hs2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    
    await driver.findElement(By.xpath("(//button[@type=\'button\'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-habitaciones")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear una habitacion\')]")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//input[@id=\'room_name\']")).sendKeys("ElOcacio Segundo")

    var chooseFile = driver.findElement(By.id("imagen"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/habitacion.jpg");
    
    await driver.findElement(By.xpath("//input[@id=\'habitaciones\']")).sendKeys("20")
    await driver.findElement(By.xpath("//input[@id=\'fecha_disponible\']")).sendKeys("30-11-2022")
    await driver.findElement(By.xpath("//input[@id=\'fecha_fin\']")).sendKeys("31-12-2022")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("999")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })

  it('Fallo CrearHabitacion 3', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("hs2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    
    await driver.findElement(By.xpath("(//button[@type=\'button\'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-habitaciones")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear una habitacion\')]")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//input[@id=\'room_name\']")).sendKeys("ElOcacio Tercero")

    var chooseFile = driver.findElement(By.id("imagen"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/habitacion.jpg");
    
    await driver.findElement(By.xpath("//input[@id=\'habitaciones\']")).sendKeys("20")
    await driver.findElement(By.xpath("//input[@id=\'fecha_disponible\']")).sendKeys("30-11-2022")
    await driver.findElement(By.xpath("//input[@id=\'fecha_fin\']")).sendKeys("31-12-2022")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("999")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("12345")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    // await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("Por favor ingrese la contraseña correcta")
  })

  

  it('CrearAuto 1', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("arse@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("(//button[@type='button'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-arrendador")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear un Auto\')]")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//input[@id=\'marca\']")).sendKeys("Test")
    await driver.findElement(By.xpath("//input[@id=\'linea\']")).sendKeys("Car 1")
    await driver.findElement(By.xpath("//input[@id=\'modelo\']")).sendKeys("2022")
    await driver.findElement(By.xpath("//input[@id=\'placa\']")).sendKeys("P999666")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("3500")

    var chooseFile = driver.findElement(By.id("foto"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/auto.jpg");

    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(4000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })

  it('CrearAuto 2', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("arse@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("(//button[@type='button'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-arrendador")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear un Auto\')]")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//input[@id=\'marca\']")).sendKeys("Test")
    await driver.findElement(By.xpath("//input[@id=\'linea\']")).sendKeys("Car 2")
    await driver.findElement(By.xpath("//input[@id=\'modelo\']")).sendKeys("2022")
    await driver.findElement(By.xpath("//input[@id=\'placa\']")).sendKeys("P999666")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("3500")

    var chooseFile = driver.findElement(By.id("foto"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/auto.jpg");

    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(4000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })

  it('Fallo CrearAuto 3', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("arse@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[2]/button")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("(//button[@type='button'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-arrendador")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear un Auto\')]")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("//input[@id=\'marca\']")).sendKeys("Test")
    await driver.findElement(By.xpath("//input[@id=\'linea\']")).sendKeys("Car 2")
    await driver.findElement(By.xpath("//input[@id=\'modelo\']")).sendKeys("2022")
    await driver.findElement(By.xpath("//input[@id=\'placa\']")).sendKeys("P999666")
    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("3500")

    var chooseFile = driver.findElement(By.id("foto"));
    
    await chooseFile.sendKeys(path.resolve(process.cwd())+"/test_resources/auto.jpg");

    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("12345")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    // await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(4000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("Por favor ingrese la contraseña correcta")
  })

  

  it('CrearVuelo 1', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("as2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//button[@type=\'submit\']")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("(//button[@type='button'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-aerolinea")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear un Vuelo\')]")).click()
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//input[@id=\'asientos\']")).sendKeys("250")
    await driver.findElement(By.xpath("//select[@id=\'pais_origen\']")).sendKeys("Guatemala")
    await driver.sleep(2000)

    
    await driver.findElement(By.xpath("//select[@id=\'ciudad_origen\']")).sendKeys("Guatemala City")
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//select[@id=\'pais_destino\']")).sendKeys("Austria")
    await driver.sleep(2000)

    await driver.findElement(By.xpath("//select[@id=\'ciudad_destino\']")).sendKeys("Buch")
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//input[@id=\'fecha\']")).sendKeys("31-12-2022")
    

    await driver.findElement(By.xpath("//input[@id=\'hora\']")).sendKeys("12:00")
    

    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("7500")
    
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })

  it('CrearVuelo 2', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("as2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//button[@type=\'submit\']")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("(//button[@type='button'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-aerolinea")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear un Vuelo\')]")).click()
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//input[@id=\'asientos\']")).sendKeys("150")
    await driver.findElement(By.xpath("//select[@id=\'pais_origen\']")).sendKeys("Austria")
    await driver.sleep(2000)

    
    await driver.findElement(By.xpath("//select[@id=\'ciudad_origen\']")).sendKeys("Buch")
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//select[@id=\'pais_destino\']")).sendKeys("Guatemala")
    await driver.sleep(2000)

    await driver.findElement(By.xpath("//select[@id=\'ciudad_destino\']")).sendKeys("Guatemala City")
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//input[@id=\'fecha\']")).sendKeys("31-12-2022")
    

    await driver.findElement(By.xpath("//input[@id=\'hora\']")).sendKeys("12:00")
    

    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("9500")
    
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()
    
    await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
  })

  it('Fallo CrearVuelo 3', async function() {
    await driver.get(process.env.REACT_APP_URL+"IniciarSesion")
    await driver.manage().window().setRect({ width: 945, height: 1020 })
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'nombre_usuario\']")).sendKeys("as2@gmail.com")
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).click()
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("1234")
    await driver.findElement(By.xpath("//button[@type=\'submit\']")).click()
    await driver.sleep(2000)
    await driver.findElement(By.xpath("(//button[@type='button'])[4]")).click()
    await driver.findElement(By.id("fill-tabs-tab-favoritos")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Dashboard Empresarial\')]")).click()
    await driver.findElement(By.id("fill-tabs-tab-aerolinea")).click()
    await driver.findElement(By.xpath("//button[contains(.,\'Crear un Vuelo\')]")).click()
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//input[@id=\'asientos\']")).sendKeys("150")
    await driver.findElement(By.xpath("//select[@id=\'pais_origen\']")).sendKeys("Austria")
    await driver.sleep(2000)

    
    await driver.findElement(By.xpath("//select[@id=\'ciudad_origen\']")).sendKeys("Buch")
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//select[@id=\'pais_destino\']")).sendKeys("Guatemala")
    await driver.sleep(2000)

    await driver.findElement(By.xpath("//select[@id=\'ciudad_destino\']")).sendKeys("Guatemala City")
    await driver.sleep(1000)

    await driver.findElement(By.xpath("//input[@id=\'fecha\']")).sendKeys("31-12-2022")
    

    await driver.findElement(By.xpath("//input[@id=\'hora\']")).sendKeys("12:00")
    

    await driver.findElement(By.xpath("//input[@id=\'precio\']")).sendKeys("9500")
    
    await driver.findElement(By.xpath("//input[@id=\'contrasena\']")).sendKeys("12345")
    await driver.findElement(By.xpath("//div[@id=\'crear\']/div/form/div[2]/button")).click()

    
    // await driver.wait(until.elementLocated(By.xpath("//div[6]/button")), 10000)
    await driver.sleep(3000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()

    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("Por favor ingrese la contraseña correcta")
  })

  
})

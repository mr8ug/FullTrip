require('chromedriver');
require('dotenv').config();

const { expect } = require('chai');
const { Builder, By, Key, until} = require('selenium-webdriver')
const {Options: ChromeOptions} = require('selenium-webdriver/chrome')
var assert = require('chai').assert

var webdriver = require('selenium-webdriver')



describe('RegistroServicios', function() {
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
    await driver.sleep(1000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.xpath("//div[6]/button")).getText()).to.equal("Ok")
  })

  it('Fallo RegistroAerolinea', async function() {
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
    await driver.sleep(2000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("Hubo un error al registrar el Aerolinea")
  })

  it('RegistroArrendador', async function() {
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
      await dropdown.findElement(By.xpath("//option[. = 'Arrendador']")).click()
    }
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300);
    
    await driver.findElement(By.id("nombre")).sendKeys("Arrendadora Todo Autos")
    
    await driver.findElement(By.id("correo")).sendKeys("ata@gmail.com")
    
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Mexico']")).click()
    }
    await driver.sleep(2000)
    
    
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Chiapas']")).click()
    }
    
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.findElement(By.xpath("//form/div[2]/button")).click()
    await driver.sleep(1000)
    await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.xpath("//div[6]/button")).getText()).to.equal("Ok")
  })

  it('Fallo RegistroArrendador', async function() {
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
      await dropdown.findElement(By.xpath("//option[. = 'Arrendador']")).click()
    }
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300);
    
    await driver.findElement(By.id("nombre")).sendKeys("Arrendadora Todo Autos")
    
    await driver.findElement(By.id("correo")).sendKeys("ata@gmail.com")
    
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Mexico']")).click()
    }
    await driver.sleep(2000)
    
    
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Chiapas']")).click()
    }
    
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.findElement(By.xpath("//form/div[2]/button")).click()
    await driver.sleep(1000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("Hubo un error al registrar el Arrendador")
  })

  it('RegistroHotel', async function() {
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
      await dropdown.findElement(By.xpath("//option[. = 'Hotel']")).click()
    }
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300);
    
    await driver.findElement(By.id("nombre")).sendKeys("Hotel Buena Vista")
    
    await driver.findElement(By.id("correo")).sendKeys("hbv@gmail.com")
    
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Puerto Rico']")).click()
    }
    await driver.sleep(3000)
    
    
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Rio Grande']")).click()
    }
    
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.findElement(By.xpath("//form/div[2]/button")).click()
    await driver.sleep(2000)
    //wait driver.findElement(By.xpath("//div[6]/button")).click()
    expect (await driver.findElement(By.xpath("//div[6]/button")).getText()).to.equal("Ok")
    
  })

  it('Fallo RegistroHotel', async function() {
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
      await dropdown.findElement(By.xpath("//option[. = 'Hotel']")).click()
    }
    await driver.executeScript("arguments[0].scrollIntoView();", element)
    await driver.sleep(300);
    
    await driver.findElement(By.id("nombre")).sendKeys("Hotel Buena Vista")
    
    await driver.findElement(By.id("correo")).sendKeys("hbv@gmail.com")
    
    {
      const dropdown = await driver.findElement(By.id("pais"))
      await dropdown.findElement(By.xpath("//option[. = 'Puerto Rico']")).click()
    }
    await driver.sleep(3000)
    
    
    {
      const dropdown = await driver.findElement(By.id("ciudad"))
      await dropdown.findElement(By.xpath("//option[. = 'Rio Grande']")).click()
    }
    
    await driver.findElement(By.id("contrasena")).sendKeys("1234")
    
    await driver.findElement(By.id("contrasena2")).sendKeys("1234")
    await driver.findElement(By.xpath("//form/div[2]/button")).click()
    await driver.sleep(2000)
    // await driver.findElement(By.xpath("//div[6]/button")).click()
    // expect (await driver.findElement(By.xpath("//div[6]/button")).getText()).to.equal("Ok")
    expect (await driver.findElement(By.id("swal2-html-container")).getText()).to.equal("Hubo un error al registrar el Hotel")
  })
})

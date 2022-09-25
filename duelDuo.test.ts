
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})
test('Check Draw button displays when click', async () => {

    await driver.findElement(By.id('draw')).click()
    await driver.sleep(300)

    const choicesDiv = await driver.findElement(By.id('choices'))
    expect(choicesDiv).not.toBe('')

})
// //kyles example
// test('Select a bot displays in our new div', async () => {

//     await driver.findElement(By.id('draw')).click()
//     await driver.sleep(3000)
//     await driver.findElement(By.xpath('//*[text()="Add to Duo"])[1]')).click()

//     const palyerDuoDiv = await driver.findElement(By.id('player-duo'))
//     const displayed = await palyerDuoDiv.isDisplayed()

//     expect(displayed).toBe(true)
// })


//didn't relize i was writing the same test as klye til i was halfway through
// test('Check to see if the Add to Duo will work', async () => {
    
//     await driver.findElement(By.id('draw')).click()
//     await driver.sleep(300)
//     await driver.findElement(By.xpath('(//*[text()="Add to Duo"])[1]')).click()

//     const

// })

//still working on this test to check and see if the robots get removed 

test('to check and see if bot is removed', async () => {
    
    await driver.findElement(By.id('draw')).click()
    await driver.sleep(3000)
    await driver.findElement(By.xpath('(//*[text()="Add to Duo"])[1]')).click()

    const removeBot = driver.findElement(By.xpath('(//*[text()="Remove from Duo])[1]')).click()
    
    expect(removeBot).toBe(true)
})
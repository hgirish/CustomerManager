using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium;
using Protractor;

namespace CustomerManager.E2ETests.Views
{
    // ReSharper disable InconsistentNaming
    // ReSharper disable PossibleNullReferenceException

    [TestFixture]
    public class CustomersViewTests
    {
        private IWebDriver driver;

        [SetUp]
        public void SetUp()
        {
            // Using NuGet Package 'PhantomJS' (Headless browser testing for build servers)
            //driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver();

            // Using NuGet Package 'WebDriver.ChromeDriver.win32'
            driver = new OpenQA.Selenium.Chrome.ChromeDriver();

            driver.Manage().Timeouts().SetScriptTimeout(TimeSpan.FromSeconds(30));
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
        }

        [Test]
        public void Card_View_ByDefault()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);

            ngDriver.Navigate().GoToUrl("http://localhost:58918/#/customers");

            Assert.IsTrue(ngDriver.FindElement(By.ClassName("cardContainer")).Displayed);
            Assert.IsFalse(ngDriver.FindElement(By.ClassName("gridContainer")).Displayed);

        }

        [Test]
        public void Switch_to_List_view()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);

            ngDriver.Navigate().GoToUrl("http://localhost:58918/#/customers");
            IWebElement listViewMenu = ngDriver.FindElement(By.XPath("//ul//li[contains(.,'List View')]"));
            Assert.IsFalse(listViewMenu.GetAttribute("class").Contains("active"));
            listViewMenu.Click();

            

            Assert.IsFalse(ngDriver.FindElement(By.ClassName("cardContainer")).Displayed);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("gridContainer")).Displayed);
            Assert.IsTrue(listViewMenu.GetAttribute("class").Contains("active"));
        }
    }

    // ReSharper restore InconsistentNaming
    // ReSharper restore PossibleNullReferenceException
}
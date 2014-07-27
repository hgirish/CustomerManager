using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Protractor;

namespace CustomerManager.E2ETests
{
    // ReSharper disable InconsistentNaming
    // ReSharper disable PossibleNullReferenceException

    [TestFixture]
    public class IndexTests
    {
        private IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();

            driver.Manage().Timeouts().SetScriptTimeout(TimeSpan.FromSeconds(30));
        }

        [TearDown]
        public void Teardown()
        {
            driver.Quit();
        }
        [Test]
        public void Customers_View_ByDefault()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58918/");

            Assert.IsTrue(ngDriver.Url.EndsWith("#/customers"));

        }
    }

    // ReSharper restore InconsistentNaming
    // ReSharper restore PossibleNullReferenceException
}
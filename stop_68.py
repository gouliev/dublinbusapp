import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class ChromeSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome('./chromedriver')

    def search_bus_routes(self):
        driver = self.driver
        driver.get("http://127.0.0.1:5000")
        self.assertIn("Bus Routes", driver.title)
        elem = driver.find_element_by_name("68")
        elem.send_keys(Keys.RETURN)

    def tearDown(self):
        self.driver.close()

    if __name__ == "__main__":
        unittest.main()
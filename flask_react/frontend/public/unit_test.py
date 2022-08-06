from selenium import webdriver
from selenium.webdriver.common.keys import Keys
origin = "UCD"
destination = "Spire"
driver = webdriver.Chrome()
driver.get("http://34.250.91.72/")
element = driver.find_element_by_id("origin")
element.send_keys(origin)
element = driver.find_element_by_id("destination")
element.send_keys(destination)
element.send_keys(Keys.RETURN)
element.close()
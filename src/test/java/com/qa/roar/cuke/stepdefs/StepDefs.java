package com.qa.roar.cuke.stepdefs;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.context.jdbc.Sql.ExecutionPhase;

import io.cucumber.java.After;
import io.cucumber.java.Before;

@ActiveProfiles("test")
@SpringBootTest
//@Sql(scripts = {"/Choonz_Project/src/test/resources/Choonz-schema.sql",
//			"/Choonz_Project/src/test/resources/data.sql"
//			},
//	executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class StepDefs {
	
	private static RemoteWebDriver driver;
	
	@Before
	public void setup() {
		System.setProperty("webdriver.chrome.driver","src/test/resources/driver/chromedriver.exe" );
		driver=new ChromeDriver();
	}
	
	@After
	public void tearDown() {
		driver.quit();
	}
	

}

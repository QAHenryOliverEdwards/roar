package com.qa.roar.cuke.stepdefs;

import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.PageFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.context.jdbc.Sql.ExecutionPhase;

import com.qa.roar.cuke.SeleniumDriver;
import com.qa.roar.cuke.pom.LandingPage;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

@ActiveProfiles("test")
@SpringBootTest
public class StepDefs {
	
	private static RemoteWebDriver driver;
	private static LandingPage landingPage;
	
	@Before
	public void setup() {
		driver=SeleniumDriver.getDriver();
		landingPage= PageFactory.initElements(driver, LandingPage.class);
	}
	//Scenario 1
	@Given("that I go the site1")
	public void that_i_go_the_site1() {
		driver.get(LandingPage.URL);
	}
	@When("I click the register button")
	public void i_click_the_register_button() {
	    landingPage.getRegisterBtn().click();
	}
	@When("I enter my {string},{string},{string} and {string}")
	public void i_enter_my_and(String name, String email, String username, String password) {
	    landingPage.register( username,name, email, password);
	}
	
	@Then("I see a Welcome message and logout button1")
	public void i_see_a_welcome_message_and_logout_button1() {
	    landingPage.verifyLoggedIn();
	}
	
	
	//Scenario 2
	@Given("that I go the site2")
	public void that_i_go_the_site2() {
		driver.get(LandingPage.URL);
	}
	@When("I enter my {string} and {string} and submit")
	public void i_enter_my_and_and_submit(String username, String password) {
	    landingPage.login(username, password);
	}
	@Then("I see a Welcome message and logout button2")
	public void i_see_a_welcome_message_and_logout_button2() {
	    landingPage.verifyLoggedIn();
	}

}

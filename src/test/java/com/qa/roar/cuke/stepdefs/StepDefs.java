package com.qa.roar.cuke.stepdefs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.openqa.selenium.By;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.context.jdbc.Sql.ExecutionPhase;

import com.qa.roar.cuke.SeleniumDriver;
import com.qa.roar.cuke.pom.AboutPage;
import com.qa.roar.cuke.pom.LandingPage;
import com.qa.roar.cuke.pom.LoginPage;
import com.qa.roar.cuke.pom.RegisterPage;

import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

@ActiveProfiles("test")
@SpringBootTest
public class StepDefs {
	
	private static RemoteWebDriver driver;
	private static LandingPage landingPage;
	private static RegisterPage registerPage;
	private static LoginPage loginPage;
	private static AboutPage aboutPage;
	private static WebDriverWait wait;
	
	@Before
	public void setup() {
		driver=SeleniumDriver.getDriver();
		landingPage= PageFactory.initElements(driver, LandingPage.class);
		registerPage=PageFactory.initElements(driver, RegisterPage.class);
		loginPage=PageFactory.initElements(driver, LoginPage.class);
		aboutPage=PageFactory.initElements(driver, AboutPage.class);
		wait=new WebDriverWait(driver,3);
	}
	//Register
	@Given("that I go to the home page1")
	public void that_i_go_to_the_home_page1() {
		driver.get(LandingPage.URL);
	}	
	@When("I navigate to the register page")
	public void i_navigate_to_the_register_page() {
		 landingPage.getRegisterNav().click();
	}
	@When("I enter my {string},{string},{string} and {string} and click Register")
	public void i_enter_my_and_and_click_register(String name, String email, String username, String password) {
		  registerPage.register(username,name, email, password);
	}
	@Then("I see a logout link in the navigation bar1")
	public void i_see_a_logout_link_in_the_navigation_bar1() throws InterruptedException {
		landingPage.verifyLoggedIn();
	}


	
	//Login
	@Given("that I go to the home page2")
	public void that_i_go_to_the_home_page2() {
		driver.get(LandingPage.URL);
	}
	@When("I navigate to the login page")
	public void i_navigate_to_the_login_page() {
	    landingPage.getLoginNav().click();
	}
	@When("I enter my {string} and {string} and click Login")
	public void i_enter_my_and_and_click_login(String username, String password) {
	   loginPage.login(username,password);
	}
	@Then("I see a logout link in the navigation bar2")
	public void i_see_a_logout_link_in_the_navigation_bar2() {
	    landingPage.verifyLoggedIn();
	}

	//Logout
	@Given("that I am logged in")
	public void that_i_am_logged_in() throws InterruptedException {
		driver.get(LandingPage.URL);
	    landingPage.getLoginNav().click();
	    loginPage.login("testUser1","testPassword1");
	}
	@When("I click the logout button")
	public void i_click_the_logout_button() {
	    driver.findElement(By.id("logout")).click();
	    driver.findElement(By.xpath("//button[@text()='Click to logout']")).click();
	}
	@Then("I am redirected to the home page and nav bar shows Login\\/Register")
	public void i_am_redirected_to_the_home_page_and_nav_bar_shows_login_register() {
	    assertEquals(driver.getCurrentUrl(),LandingPage.URL+"/home");
	    assertTrue(driver.findElement(By.id("login")).isDisplayed());
	    assertTrue(driver.findElement(By.id("register")).isDisplayed());
	}
}

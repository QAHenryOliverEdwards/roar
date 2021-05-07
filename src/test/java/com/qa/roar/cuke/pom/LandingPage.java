package com.qa.roar.cuke.pom;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.WebDriverWait;

import lombok.Data;

@Data
public class LandingPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(xpath="//*[@id=\"root\"]/div/div[2]/div/h1")
	private WebElement homepageHeading;
	
	@FindBy(xpath="//div[@class='navbar-nav']")
	private WebElement navBar;
	
	@FindBy(linkText = "About")
	private WebElement aboutNav;
	
	@FindBy(linkText = "Login")
	private WebElement loginNav;
	
	@FindBy(linkText = "Register")
	private WebElement registerNav;
	
	@FindBy(linkText="Logout")
	private WebElement logoutNav;
	
	
	public void verifyLoggedIn() {	
		assertTrue(logoutNav.isDisplayed());
	}
	
	
}

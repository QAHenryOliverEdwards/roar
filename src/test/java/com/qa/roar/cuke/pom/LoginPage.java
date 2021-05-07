package com.qa.roar.cuke.pom;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import lombok.Data;

@Data
public class LoginPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(xpath="//input[@placeholder='Username']")
	private WebElement usernameLogin;
	
	@FindBy(xpath="//input[@placeholder='Password']")
	private WebElement passwordLogin;
	
	@FindBy(xpath="//button[text()='Login']")
	private WebElement loginBtn;
	
	
	public void login(String username,String password) {
		usernameLogin.sendKeys(username);
		passwordLogin.sendKeys(password);
		loginBtn.click();
	}
	
}

package com.qa.roar.cuke.pom;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import lombok.Data;

@Data
public class LoginPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(id="username-input")
	private WebElement usernameLogin;
	
	@FindBy(id="password-input")
	private WebElement passwordLogin;
	
	@FindBy(id="login-button")
	private WebElement loginBtn;
	
	
	public void login(String username,String password) {
		usernameLogin.sendKeys(username);
		passwordLogin.sendKeys(password);
		loginBtn.click();
	}
	
}

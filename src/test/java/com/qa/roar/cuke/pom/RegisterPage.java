package com.qa.roar.cuke.pom;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import lombok.Data;

@Data
public class RegisterPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(id="username-input")
	private WebElement usernameRegister;
	@FindBy(id="password-input")
	private WebElement passwordRegister;
	@FindBy(id="email-input")
	private WebElement emailRegister;
	@FindBy(id="name-input")
	private WebElement nameRegister;
	
	@FindBy(id="register-button")
	private WebElement registerBtn;
	
	
	public void register(String username,String name, String email, String password) {
		usernameRegister.sendKeys(username);
		nameRegister.sendKeys(name);
		emailRegister.sendKeys(email);
		passwordRegister.sendKeys(password);
		registerBtn.click();
	}
	
}

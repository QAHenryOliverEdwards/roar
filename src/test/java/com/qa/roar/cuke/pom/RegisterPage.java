package com.qa.roar.cuke.pom;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import lombok.Data;

@Data
public class RegisterPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(xpath="//input[@placeholder='Username']")
	private WebElement usernameRegister;
	@FindBy(xpath="//input[@placeholder='Password']")
	private WebElement passwordRegister;
	@FindBy(xpath="//input[@placeholder='Email']")
	private WebElement emailRegister;
	@FindBy(xpath="//input[@placeholder='Name']")
	private WebElement nameRegister;
	
	@FindBy(xpath="//button[text()='Register']")
	private WebElement registerBtn;
	
	
	public void register(String username,String name, String email, String password) {
		usernameRegister.sendKeys(username);
		nameRegister.sendKeys(name);
		emailRegister.sendKeys(email);
		passwordRegister.sendKeys(password);
		registerBtn.click();
	}
	
}

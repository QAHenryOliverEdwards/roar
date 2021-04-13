package com.qa.roar.cuke.pom;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import lombok.Data;

@Data
public class LandingPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/button[2]")
	private WebElement registerBtn;
	@FindBy(xpath = "//*[@id=\"root\"]/div/div/div/input[1]")
	private WebElement usernameLogin;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/input[2]")
	private WebElement passwordLogin;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/button[1]")
	private WebElement loginBtn;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/input[1]")
	private WebElement usernameRegister;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/input[2]")
	private WebElement nameRegister;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/input[3]")
	private WebElement emailRegister;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/input[4]")
	private WebElement passRegister;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div/button")
	private WebElement submitRegisterBtn;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div[1]/h1")
	private WebElement welcomeMessage;
	@FindBy(xpath="//*[@id=\"root\"]/div/div/div[1]/button")
	private WebElement logoutBtn;
	
	public void login(String username,String password) {
		usernameLogin.sendKeys(username);
		passwordLogin.sendKeys(password);
		loginBtn.click();
	}
	
	
	public void register(String username,String name, String email, String password) {
		usernameRegister.sendKeys(username);
		nameRegister.sendKeys(name);
		emailRegister.sendKeys(email);
		passRegister.sendKeys(password);
		submitRegisterBtn.click();
	}
	
	public void verifyLoggedIn() {
		assertTrue(welcomeMessage.getText().contains("Welcome to Roar"));
		assertTrue(logoutBtn.isDisplayed());
	}
	
	
}

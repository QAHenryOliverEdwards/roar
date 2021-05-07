package com.qa.roar.cuke.pom;

import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import lombok.Data;

@Data
public class AboutPage {
	public final static String URL="http://localhost:8082";
	
	@FindBy(xpath="//*[@id=\"root\"]/div/div[2]/div")
	private WebElement aboutText;
	

	
}

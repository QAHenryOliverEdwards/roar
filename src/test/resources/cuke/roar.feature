Feature: Roar web application tests

Scenario Outline: As a user, I want to create an account so I can save my credentials in the system.
Given that I go to the home page1
When I navigate to the register page
And I enter my "<name>","<email>","<username>" and "<password>" and click Register
Then I see a logout link in the navigation bar1

Examples:
|name|email|username|password|
|Test User 1| test1@email.com|testUsername1|testPass1|
|Test User 2| test2@email.com|testUsername2|testPass2|


Scenario Outline: As a user, I want to login so that I can access my account.
Given that I go to the home page2
When I navigate to the login page
And I enter my "<username>" and "<password>" and click Login
Then I see a logout link in the navigation bar2

Examples:
|username|password|
|testUsername1|testPass1|
|testUsername2|testPass2|


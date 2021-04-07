Feature: Roar web application tests

Scenario Outline: As a user, I want to create an account so I can save my credentials in the system.
Given that I go the site
When I go to the sign up page
And I enter my "<name>","<email>","<username>" and "<password>"
And I click submit
Then I see 

Examples:
|name|email|username|password|
|Test User 1| test1@email.com|testUsername1|testPass1|
|Test User 2| test2@email.com|testUsername2|testPass2|


Scenario Outline: As a user, I want to login so that I can access my account.
Given that I go the site
When I go to the login page
And I enter my "<username>" and "<password>"
And I click submit
Then I see 

Examples:
|username|password|
|testUsername1|testPass1|
|testUsername2|testPass2|


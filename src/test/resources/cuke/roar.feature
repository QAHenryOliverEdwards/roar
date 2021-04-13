Feature: Roar web application tests

@ignore
Scenario Outline: As a user, I want to create an account so I can save my credentials in the system.
Given that I go the site1
When I click the register button
And I enter my "<name>","<email>","<username>" and "<password>" and submit
Then I see a Welcome message and logout button1

Examples:
|name|email|username|password|
|Test User 1| test1@email.com|testUsername1|testPass1|
|Test User 2| test2@email.com|testUsername2|testPass2|


Scenario Outline: As a user, I want to login so that I can access my account.
Given that I go the site2
And I enter my "<username>" and "<password>" and submit
Then I see a Welcome message and logout button2

Examples:
|username|password|
|testUsername1|testPass1|
|testUsername2|testPass2|


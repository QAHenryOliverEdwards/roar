# Roar Messenger

## Contents

* introduction
* objectives
* scope
* chosen technologies
* deliverables
* client requirements
    * general
    * user home
    * posts
    * messages
    * non-functional testing

### Introduction

The purpose of this document is to outline the group project specification that we will be working on during our bench time at QA.

This project will encapsulate the concepts from all core training modules in addition to leveraging new technologies not previously learned at QA.

### Objectives

The overall objective of the project is the following:

```
To build and provide a full test suite for a full-stack Web application
suitable for a given client specification - with utilisation of supporting
tools, methodoligies and technologies that encapsulate all modules covered
during traning as well as new techologies not previously covered.
```

Specifically we are required to create a new web appication according to our (fictional) client's specification:

* Our client wants a platform for social messaging 
* Our team has been tasked with creating a website which should present information about users, and messages.
* There are various features which the client has requested; some are 'essential' while others are 'desirable'.
* Our client has insisted that a full test suite for the application must be implemented, covering the following key ares:
    * **Unit Testing** of the back-end
    * **Integration Testing** of the back-end
    * **User-Acceptance Testing** of the front-end
    * A **Non-Function Testing** suite
    * A **Functional Testing** suite
* Our client does not have a hard deadline. We have time for:
    * A **sprint zero**
    * **An unknown number of sprints** to be undertaken while on the bench

### Scope

The scope of the project is as follows:

* The team must demonstrate a full commitment to an Agile approach throughout the project, include **stand-up meetings**.
* Our client requests that the codebae is **fully integrated into a central repository**.
* The team is required to utilise the **feature-branch model**.
* It is recommended that the team regularly builds **project releases**.
* Our client requires a paper-trail, and therefore expcts to see a **project management board** with full expansion on user stories, acceptance criteria and prioritisation.
* Our client also requests that a **risk assessment** is undertaken prior to the first sprint
* The team must periodically **run the code through a static analysis tool** for relevant refactoring of the code accordingly to reduce code smells, bugs, and vulnerabilities.
* Fully designed test suites - **unit, integration, user-acceptance, functional, non-functional** - for the project. We should aim to reach the industry standard of **80%** test coverage on the back-end.

Our client may change their mind over various requirements for the project over time. As such **the team should ensure that features worked on are prioritised** according to the scope, likelihood of completion, and overall importance to the project, **while avoiding time-sinks**.

### Chosen Technologies

Our client has **lax** technological constraints, as such the team has chosen the following enterprise-level technologies to create the project.

* Version Control System: Git
* Source Code Management: GitHub
* Kanban Boad: Jira
* Back-End Programming Language: Java
* API Development Platform: Spring
* Authentication Framework: Spring Security
* Front-End Web Technologies:
    * HTML
    * CSS
    * JavaScript
    * React
* Build Tool: Maven
* Static Analysis: SonarQube
* DevOps and build automation:
    * Jenkins
    * Groovy
* Testing Frameworks:
    * JUnit
    * Mockito
    * Selenium
    * Cucumber
    * Gherkin
    * JMeter

### Deliverables

The final deliverable for this project is an full-stack web applicaiton that has a fully functional front-end.
This front-end should be able send and recieve requests, have a consistant style (e.g. bootstrap) and take advantage of JavaScript frameworks (e.g. react). The back-end should be able to handle these requests, query the database and return the suitable result, the back-end should use a suitable server technology such as Spring Boot. 

### Client Requirements

These requirements have been determined by our client:

#### General

* multiple users can sign up to the system
* the styling of the front-end should be consistent
* users can browse the system without logging in, but won't be able to CRUD
* it would be nice to inclue some form of search functionality

#### User Home

* users can CRUD new posts
* users should see a list of all posts on their home screen

#### Posts

* users should be able to see each post on its own page
* the post should contain a time it was created
* the post should contain a link to the users page
* the post should contain a list of replies

#### Messages

* users can send messages to each other
* these messages are private
* .
* .
* .

#### Non-Functional Testing

* Response times should be < 10 ms.
* Latenct should be < 2 seconds at 1000 concurrent users
* Throughput rate should be > 300/s
* RAM allocation should be minimal, with few (if any) memory leaks
* The application should be spike-, load-, stress-, and soak-tested

## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?

The gitflow is an additional toolset and methodology for working with git branches. 
The procedure is the following:
- To create additional branches named develop, feature, release and hotfix. 
- In the develop brans we merge all the features. This branch will contain the full history of the project, and the master branch will contain a short one.
- Each new feature should have its own branch that can be pushed to the central repository for backups or team collaboration. Feature branches are not created based on master, but based on develop. When the function is complete, the corresponding branch is merged back into the develop branch. Functions should not be sent directly to the master branch.
- When the develop branch has enough features for release, a release branch is created from the develop branch. The creation of this branch starts the next release cycle, and from this point on, new features cannot be added - only debugging bugs, creating documentation and solving other tasks related to the release is allowed. When the release is complete, the release branch is merged into master and given a version number. It also requires a merge with the develop branch, which may have had changes since the release branch was created.
- Support branches or hotfix branches are used for quick fixes to production releases. Hotfix branches are very similar to release and feature branches, except that they are created from master and not from develop. This is the only branch that should be created directly from the master. Once the fix is complete, the branch should be merged with master and develop (or the current release branch), and the master branch should be marked with an updated version number. Having a dedicated bug fix branch allows the team to resolve issues without interrupting the rest of the workflow or waiting for the next release cycle.

For projects with many releases every day or with a small team, Git-flow is not very suitable due to its quite complex structure. Even the author of Git Flow Vincent Driessen recommended using a much simpler workflow like GitHub flow. GitHub flow is a lightweight, branch-based workflow that supports teams and projects where deployments are made regularly.

There are also other alternatives like GitLab Flow, One Flow and others.  

2. What is Continuous integration ?

Continuous integration is a software development practice that basically answering the question of "what should we do to avoid a merge hell?". It gives us 2 main benefits: no merge hell and testable build which achieving by putting some automation and regularly watching the code, building and testing it. If something went wrong on a unit test then we let the team know about it. 

The main principles of the CI are the following:
- Maintain a single source/code repository. For example, this can be achieved by using version control systems like Git. From this single repository, developers can clone the code into their private machines and work on it. If they did some changes they can the changes to the shared repository.
- Automate the build process and make the build self-testing. The CI server monitors the repository and analyzes changes as they occur. Once it seems the changes it builds the system and runs unit and integration tests. The CI server gives the team reports of the successful build and test. If it fails the server alerts the development team. For example, for these purposes, we can use Jenkins. 
- Everyone committing to the baseline every day and every commit should build the mainline. Here is primarily about communication. Frequent communication allows developers to know as quickly as changes been made. The more often the changes committed, the fewer places you have to look for conflicts, and the more rapidly you fix the issues.
- Keep the build fast and fix broken builds immediately - A key part of doing a continuous build is that if the mainline build fails, it needs to be fixed right away. The whole point of working with CI is that you're always developing on a known stable base and providing rapid feedback. 
- Test in a Clone of the Production Environment - The point of these kinds of testings is to try out under controlled conditions, any problem that the system will have in the production.
- Make it easy to get the latest deliverables and everyone can see the results of the latest build
- Automatic deployment - To do Continuous Integration we need a quite few environments, one to run commit tests, one or more to run secondary tests. Since we are moving executables between these environments multiple times a day, we'll want to do this automatically. So it's important to have scripts that will allow us to deploy the application into any environment easily.
To automate deployment actions, tests on the qualification environment need to be automated to ensure that the new functionality to be pushed works properly.


3. What is Continuous deployment?

When I was googling what is continues deployment I have noticed that a lot of articles were talking about Continous Delivery. So I decided to understand the difference between them. So in my understanding, the difference is in the final step. In delivery, there is a final manual approval step before the production release and in deployment, all steps are automated so there is no time lag between when a code change passes application and platform-level testing and when it moves into live production. 
Continuous deployment is the continuation of Continuous Integration. Once the tests have been validated on the dev environment, it must be put into production. 
The tools for continuous deployment are often the same as those for continuous integration
  

4. What types of deployment can you name and describe? (Green-blue, etc.)

The deployment type or strategy is a way to change or upgrade an application. The aim is to make the change without downtime in a way that the user barely notices the improvements.

Recreate - Version 1 is terminated then version 2 is rolled out. If the downtime is not an issue this type could be used because it is simple and help us to avoid compatibility challenges.

One of the most popular strategies is to use a blue-green deployment. The new version (the blue version) is used for testing, while the users are using the stable version (the green version). When the new version is ready, the users are switched to the blue version. If a problem occurs, we can switch back to the green version. A downside of this deployment strategy could be doubling the cost of running 2 environments. A good thing about it - it is providing zero downtime.

A common alternative strategy is to use A/B versions that are both active at the same time and some users use one version, and some users use the other version. This type is good for experimenting with new features to get user feedback. It can also be used to verify stable operation in the production where problems impact a limited number of users. In comparing to the blue-green type here resources usage is more rational. For me the Canary deployment approach looks pretty much the same. 

Rolling Strategy - basically incrementally replaces instances of the previous version of an application with instances of the new version of the application. A rolling deployment typically waits for new instances to become ready via a readiness check before removing the old components. 


5. What types of testing do you know? What are they?

In general all tests are designed to guarantee that each piece of software behaves as expected by using test uses cases provided by business analyst or the design team. There are two main categories of the testing: functional and non-functional. The firs ones are running when we would like to test applications against business requirements. The non-functional testing is focusing on operational aspects of the software like performance, security, usability and compatibility. 
The functional category usually include the following methods in conducted order:

Unit testing - It is the process of ensuring that individual software components at the code level are functional and perform as they were designed. Usually these tests are written by developers and they perform them prior to passing the unit/code/feature to the test team. 

Integration Testing - After unit testing each unit integrates with other to create modules or components designed to perform specific tasks. They are then tested as a group using integration testing to ensure that entire segments of the application behave as expected (ie, communication between modules is seamless).

System Testing - The system testing part of a testing methodology involves testing the entire system for errors and bugs. This test is carried out by interfacing the hardware and software components of the entire system (that have been previously unit tested and integration tested), and then testing it as a whole.

User Acceptance Testing (UAT) - Acceptance testing is the last phase of functional testing and is used to assess whether or not the final piece of software is ready for delivery. It involves ensuring that the product is in compliance with all of the original business criteria and that it meets the end user’s needs. This requires the product be tested both internally and externally, meaning you’ll need to get it into the hands of your end users for beta testing along with those of your QA team. Beta testing is key to getting real feedback from potential customers and can address any final usability concerns.

Non-functional testing.

Performance Testing - is used to understand how the application behaves under increaed volumes of users, trafic etc. The goal is to test its responsiveness and stability. There are 4 types of this test: 
- load testing to verify if it can handle what it’s designed to handle 
- stress testing - to test responsiveness at beyond its peak load
- endurance testing - to test the application with specific load over longer amounts of time
- spike testing - to understand what will happen when the load is suddenly and significantly increased

Security Testing - techniques used to determine if the information and data in a system is protected

Usability Testing - to measure an application is ease-of-use from the a user perspective 

Compatibility Testing - to test how the application will work in different environments 

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?

Let's assume that the business needs and requirements drives us to follow Canary deployment strategy and we have the 5 environments and the code's "path" in the following sequence: 

1) Development environment - Which is basically developer's computer where he writes the code 
2) CI/CD enviroment which is central repository like Git, tools like Jenkins etc. created to execute automated tests and to run deployments
3) Test or stage environment - used for all kind of tests
4) The canary environment — used to test new features with a small set of users
5) The production environment where users access the final code after all of the updates and testing


## Tasks

* Log in to https://circleci.com/ with your github account 

* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)

    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog

    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing

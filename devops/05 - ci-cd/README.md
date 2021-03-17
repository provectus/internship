## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?
    GitFlow is a branching model for Git, created by Vincent Driessen. It has attracted a lot of attention because it is very well suited to collaboration and scaling the development team. Good for waterfall development
    GitHub flow is better for faster development lifecycle with microservices architecture.
    https://habr.com/ru/company/flant/blog/491320/

2. What is Continuous integration ?
    Continuous Integration (CI) is a software development practice where developers regularly merge their code changes into a central code repository, after which automated builds and tests are run. CI helps find and address bugs quicker, improve software quality, and reduce the time it takes to validate and release new software updates.

3. What is Continuous deployment?
    Continuous Deployment (CD) is a software release process that uses automated testing to validate if changes to a codebase are correct and stable for immediate autonomous deployment to a production environment.

4. What types of deployment can you name and describe ? (Green-blue, etc.)
    All-at-once deployments: all traffic is shifted from the original environment to the replacement environment all at once.
    Recreate: Version A is terminated then version B is rolled out.
    Ramped (also known as rolling-update or incremental): Version B is slowly rolled out and replacing version A.
    Blue/Green: Version B is released alongside version A, then the traffic is switched to version B.
    Canary: Version B is released to a subset of users, then proceed to a full rollout.
    A/B testing: Version B is released to a subset of users under specific condition.
    Shadow: Version B receives real-world traffic alongside version A and doesn’t impact the response.

5. What types of testing do you know? What are they?
    Functional and non-functional testing like sanity testing and performance testing
    More info here:  https://www.softwaretestinghelp.com/types-of-software-testing/

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?
    In short:
    1) Build on developer pc in the framework to make sure that the code doesn't have any typos and can build fine
    2) Push into developer's git branch and build in CI tool (like Jenkins), run tests on it
    3) Merge with the main develop branch after PR and successful tests
    4) Deploy main develop branch into staging environment and run other tests there (regression test by QA and so on)
    5) After successful test merge develop branch with release/main/production branch, deploy it into production and run sanity tests


## Tasks

* Log in to https://circleci.com/ with your github account
    Completed.
* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)
      Completed: https://hub.docker.com/repository/docker/accuratiorem/flaskapp
      Image with tag 0.16-fb272c0 after successful build #16
    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog

    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing

## Prerequsite

* Minikube v1.6.2 or greater

* Docker 19.03 or greater

* Git 2.28 or greater

## Questions

1. What is git flow and its variations?
Git-flow is a branching model and release management strategy for Git.
There are variations, for example if 'develop' branch exists or not, if main branch is always ready for deployment or not, etc.

2. What is Continuous integration ?
Continuous integration is the practice of merging all developers' working copies to a shared repository several times a day.

3. What is Continuous deployment?
Continuous deployment is automated deployment to production if autotests passed.

4. What types of deployment can you name and describe ? (Green-blue, etc.)
	In blue-green deployments, two servers are maintained: a "blue" server and a "green" server. At any given time, only one server is 
handling requests (e.g., being pointed to by the DNS). For example, public requests may be routed to the blue server, making it 
the production server and the green server the staging server, which can only be accessed on a private network. Changes are installed 
on the non-live server, which is then tested through the private network to verify the changes work as expected. Once verified, 
the non-live server is swapped with the live server, effectively making the deployed changes live.
	A canary deployment is a deployment strategy that releases an application or service incrementally to a subset of users. 
All infrastructure in a target environment is updated in small phases (e.g: 2%, 25%, 75%, 100%). A canary release is the lowest risk-prone,
compared to all other deployment strategies, because of this control.

5. What types of testing do you know? What are they?

6. `*` Describe how the code from the developer's computer reaches the production environment? What stages would you set up?
	1. Developer commits to repository (i.e. git).
	2. Code is reviewed by other developer.
	3. AutoTests are running in CI tool after commit.
	4. Tester checks if autotests passed in CI tool and performs manual tests.
	5. Tester publish app from CI tool.
	6. Tester performs manual tests on production env.

## Tasks

* Log in to https://circleci.com/ with your github account 

* Edit `.circleci/config.yaml` and create pipelines that:
    * build your [dockerfile](../02%20-%20dockerfile/Dockerfile) with new version tag and store in into a registry (dockerhub or smth else with public access)

    *  `*` update your [docker-compose](../03%20-%20docker-compose/example/docker-compose.yaml) with a new tag and create new release with changelog

    *  `*` update you helm charts and umbrella helm chart, create release in your repository, download release and redeploy umbrella helm chart to minikube for testing

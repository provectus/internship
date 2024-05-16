## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* after passing other test tasks (02 - dockerfile, 03 - docker-compose, 04 - bash, 05 - cloud-ops) need to squash all your commits to one

> sorry, forgot to make commits for the each task, my bad

* make a pull-request with the results of the tasks and tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?

> git log

2. What command can I use to undo the last commit?

> git reset --hard (or soft) HEAD~1

3. What command can I use to create a new branch and a new tag?

> git checkout -b / git tag

4. How do I exclude a file / folder from a commit?

> git reset

5. In case of a merge conflict, what commands can be used to resolve it?

> https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

> Git hook scripts are useful for identifying simple issues before submission to code review. We run our hooks on every commit to automatically point out issues in code such as missing semicolons, trailing whitespace, and debug statements. (c) pre-commit.com
> 
> This might be a part of the CI process or you can do any usefull job with git hooks

7. `*` How do I change the last commit without adding a new commit?

> git commit --amend --no-edit

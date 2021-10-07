## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* after passing other test tasks (02 - dockerfile, 03 - docker-compose, 04 - bash, 05 - cloud-ops) need to squash all your commits to one

* make a pull-request with the results of the tasks and tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history? `git log` command

1. What command can I use to undo the last commit? the `git reset` command with the `–soft` option that will preserve changes done to your files

1. What command can I use to create a new branch and a new tag? `git branch <branch name>; git tag <tag name>`

1. How do I exclude a file / folder from a commit? in `.gitignore`, add the relative path to the file 

1. In case of a merge conflict, what commands can be used to resolve it?<br />
- `git log --merge` to check the the list of conflicting commits <br />
- `git reset --mixed`  reset can be used to undo changes <br />
- `git merge --abort`  it will exit from the merge process and return the branch to the state before the merge began.

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?<br />
- pre-commit hooks are run fast, they let you excute right before the commit to make sure about the tests run<br />
- post-commit hooks are right after the commit, it's used to notify about new change-information

1. `*` How do I change the last commit without adding a new commit? using `git commit --amend --no-edit`

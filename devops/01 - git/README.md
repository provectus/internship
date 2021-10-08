## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository (Done)

* after passing other test tasks (02 - dockerfile, 03 - docker-compose, 04 - bash, 05 - cloud-ops) need to squash all your commits to one (Done)

* make a pull-request with the results of the tasks and tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history? `git log`

1. What command can I use to undo the last commit? `git reset --soft HEAD~1`

1. What command can I use to create a new branch and a new tag? `git checkout -b newbranch; git tag newtag`

1. How do I exclude a file / folder from a commit? Add that file name to ".gitignore" for example adding `*.txt` to ".gitignore" to exclude all text files from commit

1. In case of a merge conflict, what commands can be used to resolve it? `git status` to identify conflict files, `git log --merge` to see a list of conflicting commits between merging branches, `git reset` to reset conflicted files to previous state, `git merge --abort` to abort the merge process

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

1. `*` How do I change the last commit without adding a new commit? Add the changes, the use `git commit --amend --no-edit` then force push it.
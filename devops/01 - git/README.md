## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* clone it, find the commit "failed changes commit, revert me" and revert them! 

*Please note that after completing this task, the number of folders with tasks must change!*

* after passing all the questions from all folders, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?
git log

1. What command can I use to undo the last commit?
git reset HEAD^

1. What command can I use to create a new branch and a new tag?
git branch test
git tag -a v1.0 -m "version 1.0"

1. How do I exclude a file / folder from a commit?
git rm --cached filename

1. In case of a merge conflict, what commands can be used to resolve it?
git mergetool 

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?
Pre-commit hooks are useful for code checks or commit message validation.
Post-commit hooks can be used for showing info alerts.

1. `*` How do I change the last commit without adding a new commit?
git commit --amend
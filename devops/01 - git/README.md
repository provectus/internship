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

git reset --soft HEAD~1

or

git reset --hard HEAD~1

or

git revert HEAD

1. What command can I use to create a new branch and a new tag?

git branch some_branch
git tag some_tag

1. How do I exclude a file / folder from a commit?

Adding to .gitignore is the most common option

1. In case of a merge conflict, what commands can be used to resolve it?

use git mergetool

git merge --abort
git diff 
git checkout

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

Pre-commit hooks are performed in order to run tests (formatting, spell checking, linting)
Post-commit hooks may be used to trigger notification sending 

1. `*` How do I change the last commit without adding a new commit?

amend command in its variations (with/without editing the commit message)

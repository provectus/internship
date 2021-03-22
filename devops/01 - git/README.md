## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* clone it, find the commit "failed changes commit, revert me" and revert them! 

*Please note that after completing this task, the number of folders with tasks must change!*

* after passing all the questions from all folders, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)

***
## Questions

1. What command can I use to view the commit history?
```bash
git log
```
1. What command can I use to undo the last commit?
```bash
git reset --soft HEAD~1
```
1. What command can I use to create a new branch and a new tag?
```bash
git checkout -b <branch name>
git tag -a v1.5.3 -m "Tag message"
```
1. How do I exclude a file / folder from a commit?

    if file/folder already indexed: Not staging

    else: add file/folder to .gitignore

1. In case of a merge conflict, what commands can be used to resolve it?
```
git add <filepath> - After manually editing files with conflicts.
git merge -s <strategy> - Use another strategy.
git merge --abort - Abort merge
```
1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

    All Git hooks are ordinary scripts that Git executes when certain events occur in the repository.
pre-commit and post-commit hooks performed before and after commit respectively 

1. `*` How do I change the last commit without adding a new commit?
```bash
git commit --amend
```

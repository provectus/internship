## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* clone it, find the commit "failed changes commit, revert me" and revert them! 

*Please note that after completing this task, the number of folders with tasks must change!*

* after passing all the questions from all folders, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?
git log => lists the commits
git log -p or --patch => shows the difference

1. What command can I use to undo the last commit?
git reset --soft HEAD^ => cancels the last commit
git reset --hard HEAD^ => removes the commit completely
git revert commit-[name] => undo a published commit

1. What command can I use to create a new branch and a new tag?
git tag -a => Creating an annotated tag
git checkout -b [name] => To create a new branch and switch to it at the same time
git branch [name] => Create new branch

1. How do I exclude a file / folder from a commit?
touch .gitignore => creates a file in the directory

1. In case of a merge conflict, what commands can be used to resolve it?
git status => Show the working tree status
git add 
git commit -m => adds a comment to the commit

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?
custom scripts that run when certain events occur
pre-commit - it runs first, it is used to check the data before creating a commit and lets you see if you have forgotten something
post-commit - starts after the commit is created, usually, this script is used for notifications

1. `*` How do I change the last commit without adding a new commit?
git commit --amend

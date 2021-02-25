## Prerequsite

* Git 2.28 or greater

## Questions

1. What command can I use to view the commit history?

The command is 'git log' but I use have defined alias hist using 'git config alias.hist "log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short"' so that 'git hist' prints out commt history in a prettier format

1. What command can I use to undo the last commit?

If the commit has not been puhsed to remote repositories yet you can use 'git reset <previous commit>' which does not create a new commit. Otherwise use 'git revert', the downside (is it>) is that it creates a new revert commit, so it clutter up commit history if you just need to undo an accidental commit.

1. What command can I use to create a new branch and a new tag?

'git checkout -b <branch name>' creates a branch from the current commit and checks out to it. 
'git tag <tagname> <commit>' creates a tag with tagname on the given commit

1. How do I exclude a file / folder from a commit?

'git reset' allows to reset a given file to a previusly commited state.


1. In case of a merge conflict, what commands can be used to resolve it?

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

1. `*` How do I change the last commit without adding a new commit?

## Tasks

* fork the current repository

* clone it, find the last failed changes and cancel them

* after passing all the questions, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)

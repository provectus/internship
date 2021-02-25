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

'git reset <file>' unstages and added file from commit and 'git checkout <commit> <file>' allows to reset a given file to a previusly commited state.


1. In case of a merge conflict, what commands can be used to resolve it?

Basic way is to manually edit conflicting file and commit it to resolve a conflict.

Another way is to checkout a file from one of the conflicting commits and then commit it, this is useful when conflicting files are  not in text format (for example a picture).

1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?
Hooks in general are scripts that are run when certain actions are made with git.Both post-commit and pre-commit hooks are client-side hooks and are run when a user calls 'git commit' command. Pre-commit is called before a commit is created and usually is used to check contents of the files to be commited for mistakes. Post-commit is run after the commit is created.

1. `*` How do I change the last commit without adding a new commit?

'git commit --amend' is the command for this

## Tasks

* fork the current repository

* clone it, find the last failed changes and cancel them

* after passing all the questions, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)

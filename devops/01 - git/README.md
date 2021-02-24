## Prerequsite

* Git 2.28 or greater

## Questions

1. What command can I use to view the commit history?
git log 

1. What command can I use to undo the last commit?
git reset

1. What command can I use to create a new branch and a new tag?
git checkout -b "branchname" 
git tag "tagname" 

1. How do I exclude a file / folder from a commit?
.gitignore 

1. In case of a merge conflict, what commands can be used to resolve it?
for first will be nice to check by "git status" command to identify a type of a problem
then "git log --merge" will show us a journal of merging conflicts between branches


1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?
Hooks can be written in any scripting language to connect to any modules that will help automate the check of your code before committing, sometimes you can forget the "comma" or "space"

1. `*` How do I change the last commit without adding a new commit?

for example here is how to add something missed 

git commit -m 'initial commit'
git add forgotten_file
git commit --amend
## Tasks

* fork the current repository

* clone it, find the last failed changes and cancel them

* after passing all the questions, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)

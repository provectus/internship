## Prerequsite

* Git 2.28 or greater

## Questions

1. What command can I use to view the commit history?

		git log #to get lists of commits

		git log -p #to see difference
1. What command can I use to undo the last commit?

        	git reset --soft HEAD~1 #to remove

		git reset --hard HEAD~1 #or to remove it and not keep anymore
1. What command can I use to create a new branch and a new tag?

		git tag -a tagname

		git checkout -b nameofnewbranch tagname
1. How do I exclude a file / folder from a commit?

		touch .gitignore #create file in directory or ~/.gitignore_global with lists of files and folders inside it
1. In case of a merge conflict, what commands can be used to resolve it?

if a few persons make a commits at the same time:

	git status #list of files inclided in this conflict, open it and chose one commit we want to save, delete conflict markers on it
	git add .
	git commit -m

if commit was done on a deleted file:

	git status
	git add filename #move it back
	git rm filename #remove it from repository
	git commit -m
1. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

		commit hooks are built-in scripts executed for special events and run locally

		pre-commit runs firsts (for checking code, whitespaces, documentation)
		post-commit runs after commit proccess is complited (for notifications)
1. `*` How do I change the last commit without adding a new commit?

    		git commit --amend
## Tasks

* fork the current repository

* clone it, find the last failed changes and cancel them

* after passing all the questions, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)

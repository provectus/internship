## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* after passing other test tasks (02 - dockerfile, 03 - docker-compose, 04 - bash, 05 - cloud-ops) need to squash all your commits to one

* make a pull-request with the results of the tasks and tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?

Answer 1: **git log**

2. What command can I use to undo the last commit?

Answer 2: **the “git reset” command with the “–soft” option that will preserve changes done to your files. and "--hard incase of removing changes"**

3. What command can I use to create a new branch and a new tag?

Answer 3: 
***A. git branch: us used to create, list,rename and delete branches. Moreover, we can use (git checkout -b) to creare***

***B. tagging are use to make a point in git history (e.g. v1.2). git tag <tag name> is used to create tag.***

4. How do I exclude a file / folder from a commit?

Answer 4: ***A. you can also use (git update-index --assume-unchanged filepath) this command modifies the index or directory cache.***

***B. To exclude a file from being published, we need to creat a file named ".gitignore". in this we can list the names of the files that we don't want to expose it either to local or remote repo. Files could be some (key, passpord) such that we don't want to expose it***

5. In case of a merge conflict, what commands can be used to resolve it?


Answer 5:

***(git log --merge):Passing the --merge argument to the git log command will produce a log with a list of commits that conflict between the merging branches.***
***(git merge --abort) exit the merge process.***
***(git reset): Git reset can be used during a merge conflict to reset conflicted files to a know good state***

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

Answer 6: ***hooks are the secriptes that run after or before a git action we do. suppose we want to write a script to send email everytime we commit.therefore we need to hook a script to the commit action.***
***Pre-commit hook: this hook or script runs before the action commit is being done, we use it in case we want to run the hook script before commit (f.e. pervent commit action, or give a warning.) in the other hand we have post-commit hooks with run after a commit is done, we use it for some notification purpose. (f.e. email me each time commit is done.)*** 

7. `*` How do I change the last commit without adding a new commit?

Answer 7: ***we can use (git commit --amend --no-edit)***
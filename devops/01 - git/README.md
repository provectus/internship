## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

Done

* after passing other test tasks (02 - dockerfile, 03 - docker-compose, 04 - bash, 05 - cloud-ops) need to squash all your commits to one

Done

* make a pull-request with the results of the tasks and tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?

git log
<<<<<<< HEAD

2. What command can I use to undo the last commit?

git reset HEAD~1

3. What command can I use to create a new branch and a new tag?

git checkout -b NEWBRANCHNAME

git tag -a NEWTAG

4. How do I exclude a file / folder from a commit?

You should to add a name of this file/folder to file .gitignore or ./git/info/exclude

5. In case of a merge conflict, what commands can be used to resolve it?

git status	

#to see which files are unmerged

git diff branch1..branch2

#to see difference between branches

git log branch1...branch2

#to see log/commit history after making branch

git reset HEAD

#to cancel merge, if it will be useful

git restore *

#to restore all files, if it will be useful

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

pre-commit - checking the correctness of the data before commit.

post-commit - used to send notifications after commit.

7. `*` How do I change the last commit without adding a new commit?

=======

2. What command can I use to undo the last commit?

git reset HEAD^1

3. What command can I use to create a new branch and a new tag?

git checkout -b NEWBRANCHNAME

git tag -a NEWTAG

4. How do I exclude a file / folder from a commit?

You should to add a name of this file/folder to file .gitignore or ./git/info/exclude

5. In case of a merge conflict, what commands can be used to resolve it?

git status	

#to see which files are unmerged

git diff branch1..branch2

#to see difference between branches

git log branch1...branch2

#to see log/commit history after making branch

git reset HEAD

#to cancel merge, if it will be useful

git restore *

#to restore all files, if it will be useful

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

pre-commit - checking the correctness of the data before commit.

post-commit - used to send notifications after commit.

7. `*` How do I change the last commit without adding a new commit?

git commit --amend

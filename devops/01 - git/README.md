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
    with --stat option it looks more informative

2. What command can I use to undo the last commit?
    to undo last local commit:      git reset --soft HEAD~1
    to undo the last remote commit: git revert HEAD

3. What command can I use to create a new branch and a new tag?
    git checkout -b newbranch && git tag -a v1.0 -m "newtag"

4. How do I exclude a file / folder from a commit?
    To exclude file/folder from a commit, you have two ways:
    1) in the main repo folder add them into .git/info/exclude file to exclude it from the whole repository
    2) create .gitignore file in any folder, so you can exclude files for one folder or for the whole repo. depends on where you'll create the .gitignore file

5. In case of a merge conflict, what commands can be used to resolve it?
    In case of a merge conflict, open the file with the text editor (for example: vim file), then resolve the conflict by deleting the wrong strings (it would be nice to contact with the person who pushed the same file to find out what is right in the file and solve conflict together), then commit -am "resolve merge conflict" and git push

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?
    Pre-commit hook is a script to verify what is about to be commited. You can add some test there that will be run for your code before commiting it. For example, in ansible repo you can call ansible-lint by adding it to the pre-commit hook and your code changes won't be commited if the check fails
    Post-commit hook is meant primarily for notification, and cannot affect the outcome of git commit
    
7. `*` How do I change the last commit without adding a new commit?
    git commit --amend

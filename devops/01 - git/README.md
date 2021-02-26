## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* clone it, find the commit "failed changes commit, revert me" and revert them! 

*Please note that after completing this task, the number of folders with tasks must change!*

* after passing all the questions from all folders, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?
```
git log
```

2. What command can I use to undo the last commit?
```
git revert HEAD

Doesn't overwrite history, adds a new commit that reverts the changes
```

3. What command can I use to create a new branch and a new tag?
```
git branch <branch_name>
git tag <tag_name>
```

4. How do I exclude a file / folder from a commit?
```
git reset <file/folder>  // for unstaging a file before commiting
or
Add them to .gitignore
git rm -rf --cached <file/folder>
```

5. In case of a merge conflict, what commands can be used to resolve it?
```
git status  // to see where the conflicts are
// resolve <<<<<<< ======= >>>>>>> conflicts in any text editor
git commit

Better use IDE
```

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?
```
The pre-commit hook runs quick local tests (like linter, spell checking) and aborts commiting if the tests fail
The post-commit are used for sending notifications/emails
```

7. `*` How do I change the last commit without adding a new commit?
```
git commit --amend
git commit --amend -m "New msg"
Substitutes the last commit with the new one. Changes history, not recommended if already pushed to remote.
```

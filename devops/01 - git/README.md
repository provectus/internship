## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* clone it, find the commit "failed changes commit, revert me" and revert them! 

*Please note that after completing this task, the number of folders with tasks must change!*

* after passing all the questions from all folders, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?

    `git log` - full history
   
    `git log --pretty` - with user-friendly output

2. What command can I use to undo the last commit?
  
    `git reset HEAD~1` - if we don't care about history and want to delete commit, preferred for local repos

    `git revert HEAD` - preferred way for remote repos and command work (adds additional 'revert' commit and saves history)

3. What command can I use to create a new branch and a new tag?

    `git checkout -b newbranch` - create new branch and switch to it

    `git branch newbranch` - just create new branch (stay on current branch)

    `git tag v1.0` - create new lightweight tag (pointer to commit)

    `git tag -a v1.0` - create new annotated tag (stores in git as object)

    `git checkout -b newbranch v1.0` - to create new branch from tag and switch to it

4. How do I exclude a file / folder from a commit?

    add it to `.gitignore` file in repo OR

    add it to `.git/info/exclude` - for local development (ignore files from being staged)

5. In case of a merge conflict, what commands can be used to resolve it?

    resolve conflicts in text editor, then

    `git add conflictfile`

    `git commit -m "resolve conflict"`

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

    hooks are scripts used to automate/check something before/after commit. Examples:

    pre-commit - checks code for restricted words before user is able to commit changes

    post-commit - notify team members via slack about new commit

7. `*` How do I change the last commit without adding a new commit?

    `git commit --amend`


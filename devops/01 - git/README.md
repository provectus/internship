## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* after passing other test tasks (02 - dockerfile, 03 - docker-compose, 04 - bash, 05 - cloud-ops) need to squash all your commits to one

* make a pull-request with the results of the tasks and tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?

`git log [<options>] [<revision range>] [[--] <path>…]`

2. What command can I use to undo the last commit?

- `git reset --soft HEAD~1` - return to the previous commit, saving changes as uncommitted local modifications
- `git reset --hard HEAD~1` - return to the previous commit, removing changes

3. What command can I use to create a new branch and a new tag?

- `git branch <branch_name>` - create branch
- `git tag <tag_name>` - create new tag

4. How do I exclude a file / folder from a commit?

`git update-index --assume-unchanged <path>`

5. In case of a merge conflict, what commands can be used to resolve it?

- `git log --merge` - view commits that cause conflict
- `git diff` - identify differences between states
- `git checkout` - undo the changes to the file or change branch
- `git reset --mixed` - undo changes to the working directory and staging area
- `git merge --abort` - exit the merge process and return back to the state before the merging began
- `git reset` - reset the conflicted files to their original state

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

- pre-commit hooks - scripts, executed every time you run `git commit` before entering message, for identifying simple issues before submission
- post-commit hooks - scripts, executed immediately after the commit-msg and used for notification purpose 

7. `*` How do I change the last commit without adding a new commit?

- change the last commit and commit message
```
git add <new_file>
git commit --amend -m "message"
``` 
- change the last commit without changing commit message
```
git add <new_file>
git commit --amend --no-edit
``` 

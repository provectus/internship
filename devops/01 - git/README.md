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

2. What command can I use to undo the last commit?

git reset

3. What command can I use to create a new branch and a new tag?

git checkout -b <branch-name>
git tag -a <version> -m 'message'
git branch <branch-name>

4. How do I exclude a file / folder from a commit?

Create .gitignore file, stage and commit it preferably to the root directory of the repository 
Add files (filename.extention) or folders (foldername/) to be ignored to the .gitignore file
Commit changes in .gitignore file

5. In case of a merge conflict, what commands can be used to resolve it?

To view the conflict details and see which exact files have conflicts we can use "git status" and "git log". 
Then we should resolve the conflict lines manually in text editors like nano or for example in Visual Studio Code by either accepting current/incoming change or both changes. 
Let's say we had conflict in only 1 file so after resolving we should execute "git add <file-name>" to stage it. 
We also can run "git ls-files -s" and "git status" to check if there are no conflicts. 
Finally, to complete the merge we should commit changes by performing "git commit". To check we again can use "git status" and "git log" commands. 

6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

Git hooks are executable scripts that could be executed before or after specific git events. For example, before creation of the commit message or before pusing to remote or at the server before receiveing updates from the client. 
Pre-commit and post-commit hooks are 2 out of 4 commit hooks. The other 2 hooks in the middle are called prepare-commit-msg and commit-msg. All 4 commit hooks are belongs to client hooks and are not copying during cloning operation. 
The pre-commit hook runs first, before you print the commit message. It is used to validate the data before making a commit and allows you to see if you forgot something, run tests, or perform other necessary code validation. The creation of a commit will be canceled if the hook finishes with nonzero code. You can skip the hook execution with git commit --no-verify. Using this hook, you can check the code style (run lint or similar), check for spaces at the end of lines (this is what the standard hook does), or check for documentation for new methods.
The post-commit hook runs after the commit has been created. It takes no parameters, but you can easily get information about the last commit by running "git log -1 HEAD". Usually, this script is used for notifications.

7. `*` How do I change the last commit without adding a new commit?

git commit --amend

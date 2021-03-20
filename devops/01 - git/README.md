## Prerequsite

* Git 2.28 or greater

## Tasks

* fork the current repository

* clone it, find the commit "failed changes commit, revert me" and revert them! 

*Please note that after completing this task, the number of folders with tasks must change!*

* after passing all the questions from all folders, make a pull-request with the results of the task and the tag Done-current date (e.g. `Done-01-01-2021`)


## Questions

1. What command can I use to view the commit history?
    
    `git log`
2. What command can I use to undo the last commit?
    * Undo the last commit with `revert`

        `git revert HEAD`
    * Undo the last commit with `reset --soft`
    
        This will preserve changes done to the files

        `git reset --soft HEAD~1`
    * Undo the last commit with `reset --hard`

        This will discard all changes in the working directory and index

        `git reset --hard HEAD~1`
    * Undo the last commit with `reset --mixed`
        
        This will keep changes in the working directory but not in the index

        `git reset --mixed HEAD~1`

3. What command can I use to create a new branch and a new tag?
    * Create a new branch

        `git branch <branchname>`
    * Create a new tag
        * Create a new lightweight tag
            
            Stores the commit only

            `git tag <tagname>`
        * Create a new annotated tag

            Stores tag data along with the commit

            `git tag -a <tagname> -m "tagging message"`
4. How do I exclude a file / folder from a commit?

    Delete file / folder from index

    `git reset <file / folder>` 
    
    Add file/folder to `.gitignore`

    `echo <file / folder> >> .gitignore`

    `git rm -rf --cached <file / folder>`

5. In case of a merge conflict, what commands can be used to resolve it?
    * To resolve a conflict

        To see conflicts

        `git status`

        Resolve `<<<<<<< ======= >>>>>>>` conflicts in files in text editor

        `git commit -m "merged and resolved the conflict"`

    * Undo a merge

        We can return to the state before we started the merge

        `git merge --abort`

        In case a mistake was done while resolving a conflict

        `git reset`


6. `*` What are pre-commit hooks and post-commit hooks, and what are they for?

    The pre-commit hook is executed every time developer runs git commit before Git asks the developer for a commit message or generates a commit object. pre-commit hook can be used to inspect the snapshot that is about to be committed. For example, developer may want to run some automated tests that make sure the commit doesn’t break any existing functionality.

    The post-commit hook can’t change the outcome of the git commit operation, it’s used primarily for notification purposes. For example, if developer wants an email every time commits a snapshot, he/she could add the post-commit hook.
7. `*` How do I change the last commit without adding a new commit?

    Example of changing the last commit:
    1. Edit `hello.py` and `main.py`
    2. `git add hello.py`
    3. `git commit -m "commit message"`
    4. `git add main.py`
    5. `git commit --amend -m "updated commit message"`

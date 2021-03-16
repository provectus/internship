### Answers

1.- What command can I use to view the commit history? ;
> git log

------------

2.- What command can I use to undo the last commit?
> git reset --soft HEAD~1

3.-What command can I use to create a new branch and a new tag?

> git checkout -b {branche} {tag}

4.-How do I exclude a file / folder from a commit?
> create .gitignore or  manualy added files/folder except not usefull file/folder

5.- In case of a merge conflict, what commands can be used to resolve it?
>  git status // look for where is conflict
>  git commit -m  "added commit "
> git add .

7.-How do I change the last commit without adding a new commit?
> git commit --amend

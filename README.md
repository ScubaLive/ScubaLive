# ScubaLive
Dive Table implementation for SCUBA diving (DO NOT USE FOR REAL DIVES!)

# Dependency
Make sure that you have git installed on your computer whether you use [git bash](https://git-scm.com/downloads) or github client.

# How to clone project
There are two ways to clone the project: command line and github client

To clone the project in command line:
Mac Users (command-line):
1. Open the terminal (command + space, then type in terminal then enter to open)
2. Locate to your designated git folder (ex: \Users\<username>\git)
3. Copy the repository URL in git (click on clone or download. This will open a popup with the URL)
4. Type in the command: `git clone https://github.com/ScubaLive/ScubaLive.git`

# How to set up client project in your IDE
Follow directions in the READ.me [here](https://github.com/ScubaLive/ScubaLive/tree/master/client)

# How To Use Git
The master branch should always the branch that has no broken code in it. We do not want to touch this branch so what we need to do is to "branch off" this branch.
When branching off a branch, it will create a copy of the master branch and create a new branch for you to work on.

*To create a new branch (command-line):*
1. Make sure you are currently on the `scubaLive-dev` branch. To check what branch you are on, do the following command: `git branch`.
It will highlight and add an asterik (*) next to the branch you are currently on.
2. If you are not on the *master* branch, do the following command: `git checkout scubaLive-dev`. If you are on the `scubaLive-dev` branch, continue.
3. `git checkout -b <branch_name>` this command will create a new branch that will have the same content as the `scubaLive-dev` branch and will switch you to that branch. 
`<branch_name>` is the name of your branch that you want to create.
4. Do `git branch` to see that you are on the branch you created.
5. When you do this, you are creating a branch locally. Only you can see this branch on your machine. So we will need to push this branch up to the git repository. So everyone can see this branch.
`git push -u origin <branch_name>` will push your branch to the repository.
6. When going to the repository on github website, we can now see the newly created branch in the dropdown.

*To push code remote repository*
1. `git status` to view change files
2. Make sure files which were not changed do not show
3. If there are files listed in the "Changes not staged for commit", you can either select all files to add by using `git add .` or select specific files one at a time using `git add <file>`
4. Use `git status` again to check that those files have been staged.
5. If all wanted files are staged, use `git commit -m "<yourmessage>"` to commit your changes. NOTE: make message descripitve of what you did.
6. If you forgot to push prior to making changes, `git push -u origin <branch_name>`. Else, you could use `git push`.

*Reviewing code:*
When you are done coding on section of the code, it is important that we review code before merging it into the main branch as we do not want any broken code in the main branch.

*To create a pull request:*
1. Go to the repository on github. You will see a tab called "Pull Request". 
2. Click on New Pull Request or Compare & pull request.
3. We want to set the base branch to be `master` and compare branch to be the branch we want to merge into the master branch
4. Then click on create.
5. When created, we want to tag the other person in the project ti notify them that the code needs to be reviewed. To tag them you can simply write @<username> in the comments, or on the right side click on the gear icon and select the user you want to review.

From here, it is the other persons responsibility to review your code. Once the other person feels confident enough that the code is good. They will merge in the project.

*To merge pull request:*
1. On the bottom of the pull request, there will be a "merge pull request". Click on it
2. You will want to close and delete the branch. There is another button that will show up. Click on it.

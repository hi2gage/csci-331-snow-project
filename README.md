# csci-331-snow-project
Requirements:
- Install Docker
- Install Node

Steps to get started:

```
git clone https://github.com/hi2gage/csci-331-snow-project.git
cd csci-331-snow-project
docker compose up --build
```
You should have access [localhost:5000](http://localhost:5000)


Run this command before reading through the article to set the co alias
```
git config --global alias.co checkout
```
In order to contribute please check out this [article](https://medium.com/@jonathanmines/the-ultimate-github-collaboration-guide-df816e98fb67) about collaborating on Github.

Creating new branch:
```
git co <branch-name>
```

Creating new branch and jumping into it 
```
git co -b <branch-name>
```

Pushing your branch back to Github so we can review the changes
```
git push --set-upstream origin <branch-name>
git push
```


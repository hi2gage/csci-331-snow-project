# Presentation:
[Presentation link](https://docs.google.com/presentation/d/1J_xvRwUJ-h8E2FZkwmR7bhthAn2YrtyF_NdMj210m5c/edit?usp=sharing)

# csci-331-snow-project
Requirements:
- Install Docker
- Install Node

Steps to get started:

```
git clone https://github.com/hi2gage/csci-331-snow-project.git
cd csci-331-snow-project/client
npm install react-router-dom
npm install tailwindcss
cd ..
docker compose up --build
```
You should have access [localhost:5000](http://localhost:5000)


Run this command before reading through the article to set the co alias
```
git config --global alias.co checkout
```
In order to contribute please check out this [article](https://medium.com/@jonathanmines/the-ultimate-github-collaboration-guide-df816e98fb67) about collaborating on Github.


**Do not use the main branch for develoment**



Creating new branch and jumping into it 
```
git co -b <branch-name>
```

Adding all changes to staging
```
git add .
```

Committing all changes to your branch
```
git commit -m "message tell us about what your changed"
```

Pushing your branch back to Github so we can review the changes
```
git push --set-upstream origin <branch-name>
git push
```



Finally we will be using GitHub to manage all of the merges. 


### git hook
- github and gitlab 都有自己的webhook功能，
- 执行mr，通过gitlab webhook，发送一个请求 进行自动tag 
- gitlab的mr 没有找到 hook
### 通过tag [回滚](http://f2e.souche.com/blog/git-zi-dong-hui-gun-he-ying-yong-fa-bu-de-er-san-shi/) 
- git tag -n --sort=-taggerdate | head -n  1 // 获取最近一次tag
- git log --format="%h" ${tag}  | head -n  1 // 通过tag => 获取hash
- get reset --hard ${lastTagHash}  
- npm install
- pm2 gracefulReload 

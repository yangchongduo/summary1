#### vim
-------------------------------
```

vi xxx 进入文件
v：进入可视化状态  在可视化下面的操作
p：黏贴;
y：拷贝选择的内容到剪贴板。
c:：剪贴选择的内容到剪贴板并且进入插入模式
d：删除；
```   
#### 利用vim 处理冲突
-----------------
```
vim 进入文件之后
/<<  enter 即可
找到文件  dd   或者d + 下键
想查看 是否冲突处理完成  git add . git commit -m  或者 git checkout xxx 会有提示
ctrl+d(down)下一页 ctrl +u(up)上一页 
error: Committing is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```
#### 查看具体文件的修改
```
git log -p xxxx
hjkl 
```

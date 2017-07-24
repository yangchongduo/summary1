
|操作||
|---|---|
|ctrl+a|一键到顶|
|ctrl+e|一键到未|
|b|vim xx.js |
|e|vim xx.js |
#### vim
-------------------------------
```
多行编辑 ： 选中之后 I + 输入内容+ESC ok
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
#### 如何设置有行号
```
  cp /usr/share/vim/vimrc ~/.vimrc

  先复制一份vim配置模板到个人目录下

  注：redhat 改成 cp /etc/vimrc ~/.vimrc

步骤2：

  vi ~/.vimrc

  进入insert模式，在最后加二行

  syntax on

  set nu!

保存收工。
```

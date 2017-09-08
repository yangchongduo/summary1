#### 
------------------
```
ssh 登陆
ssh yangchongduo@服务器地址 (0.0.0.0) 密码
现在是进入 /boot 权限
sudo su apple 这个用户
cd       来到~
sudo su - xxxx 切换用户 就可以了
sudo su - //切换成root用户这样 就有很多权限了
剩下的操作
ps -ef 查看正在活动的进程
ps -ef |grep abc 查看含有"abc"的活动进程
ps -ef |grep -v abc 查看不含abc的活动进程
awk print 需要学习
tail -f 是什么功能 查看日志文件***********
我们如何必须需要日志 也就是页面中的log
我们讲log 放在一个文件下  可进行分割
然后我们在请求的时候可以查看这个 tail -f 来查看这个文件的追加的内容
tail -f fe.server.log| grep 'getinfo'
tail -f fe.server.log| grep 'duration'
lsof -i:80 端口号 查看端口是否占用   
502 bad getway 找到nginx错误文件 监听这个文件。。。   
open -a xxxx  打开一个软件或  者文本编辑器  
open -e xxxx 同样的道理    
grep -r 查找的内容 路径   forexample  grep 【-R || -r】 yangchongduo fe.....    
history | grep ''//  查看所有的历史命令，可以快速的查找命名   
cat /etc/group|grep docker   查看docker这个用户组有多少人  
grep -rin 'eee' ./xxx.js  在order.js文件下递归查询'eee'这个字符传
find . -name 名字
shift + d 删除光标之前的文字
d + 0 删除光标之后的文字
gg 头部
G 尾部
0 这一行的头部
A 这一行的尾部
yy 复制一整行
p 黏贴
dd 删除
v 进入可视化模式
whereis svn 只用于程序名的搜索 🔍 
ctrl + u  快速删除光标之前的  
Ctrl + a ：移到命令行首
Ctrl + e ：移到命令行尾
Ctrl + f ：按字符前移（右向）
Ctrl + b ：按字符后移（左向）
Alt + f ：按单词前移（右向）
Alt + b ：按单词后移（左向）
Ctrl + xx：在命令行首和光标之间移动
Ctrl + u ：从光标处删除至命令行首
Ctrl + k ：从光标处删除至命令行尾
Ctrl + w ：从光标处删除至字首
Alt + d ：从光标处删除至字尾
Ctrl + d ：删除光标处的字符
Ctrl + h ：删除光标前的字符
Ctrl + y ：粘贴至光标后
Alt + c ：从光标处更改为首字母大写的单词
Alt + u ：从光标处更改为全部大写的单词
Alt + l ：从光标处更改为全部小写的单词
Ctrl + t ：交换光标处和之前的字符
Alt + t ：交换光标处和之前的单词
Alt + Backspace：与 Ctrl + w ~~相同~~类似，分隔符有些差别 [感谢 rezilla 指正]
```
sudo apt-get install htop    
htop    
 
#### 1、cd命令
用于`切换当前目录`，它的参数是要切换到的目录的路径，可以是绝对路径，也可以是相对路径
```
cd /root/Docements     # 切换到目录/root/Docements  
cd ./path              # 切换到当前目录下的path目录中，“.”表示当前目录    
cd ../path             # 切换到上层目录中的path目录中，“..”表示上一层目录 
```
#### 2.ls命令(list)
列出当前目录中的文件`列表`
```
参数：
-l ：列出长数据串，包含文件的属性与权限数据等  
-a ：列出全部的文件，连同隐藏文件（开头为.的文件）一起列出来----------（常用）  
-d ：仅列出目录本身，而不是列出目录的文件数据  
-h ：将文件容量以较易读的方式（GB，kB等）列出来  
-R ：连同子目录的内容一起列出（递归列出），等于该目录下的所有文件都会显示出来
```
#### 3、grep命令
该命令常用于`分析一行的信息`，若当中有我们所需要的信息，就将该行显示出来，该命令通常与管道命令一起使用，用于对一些命令的输出进行筛选加工等等
```
#简单语法
grep [-acinv] [--color=auto] '查找字符串' filename  
#参数：
-a ：将binary文件以text文件的方式查找数据  
-c ：计算找到‘查找字符串’的次数  
-i ：忽略大小写的区别，即把大小写视为相同  
-v ：反向选择，即显示出没有‘查找字符串’内容的那一行
```
```
#举例：
# 取出文件/etc/man.config中包含MANPATH的行，并把找到的关键字加上颜色  
grep --color=auto 'MANPATH' /etc/man.config  
# 把ls -l的输出中包含字母file（不区分大小写）的内容输出  
ls -l | grep -i file 
```
#### 4、find命令
find是一个基于`查找`的功能非常强大的命令
````
#基本语法：
find [PATH] [option] [action] 
# 与时间有关的参数：  
-mtime n : n为数字，意思为在n天之前的“一天内”被更改过的文件；  
-mtime +n : 列出在n天之前（不含n天本身）被更改过的文件名；  
-mtime -n : 列出在n天之内（含n天本身）被更改过的文件名；  
-newer file : 列出比file还要新的文件名  
# 例如：  
find /root -mtime 0 # 在当前目录下查找今天之内有改动的文件  
  
# 与用户或用户组名有关的参数：  
-user name : 列出文件所有者为name的文件  
-group name : 列出文件所属用户组为name的文件  
-uid n : 列出文件所有者为用户ID为n的文件  
-gid n : 列出文件所属用户组为用户组ID为n的文件  
# 例如：  
find /home/ljianhui -user ljianhui # 在目录/home/ljianhui中找出所有者为ljianhui的文件  
  
# 与文件权限及名称有关的参数：  
-name filename ：找出文件名为filename的文件  
-size [+-]SIZE ：找出比SIZE还要大（+）或小（-）的文件  
-type TYPE ：查找文件的类型为TYPE的文件，TYPE的值主要有：一般文件（f)、设备文件（b、c）、目录（d）、连接文件（l）、socket（s）、FIFO管道文件（p）；  
-perm mode ：查找文件权限刚好等于mode的文件，mode用数字表示，如0755；  
-perm -mode ：查找文件权限必须要全部包括mode权限的文件，mode用数字表示  
-perm +mode ：查找文件权限包含任一mode的权限的文件，mode用数字表示  
# 例如：  
find / -name passwd # 查找文件名为passwd的文件  
find . -perm 0755 # 查找当前目录中文件权限的0755的文件  
find . -size +12k # 查找当前目录中大于12KB的文件，注意c表示byte  
```
#### 5、cp命令(copy)
该命令用于`复制文件`，它还可以把多个文件一次性地复制到一个目录下
```
#常用参数：
-a ：将文件的特性一起复制  
-p ：连同文件的属性一起复制，而非使用默认方式，与-a相似，常用于备份  
-i ：若目标文件已经存在时，在覆盖时会先询问操作的进行  
-r ：递归持续复制，用于目录的复制行为  
-u ：目标文件与源文件有差异时才会复制  
例：
cp -a file1 file2        #连同文件的所有特性把文件file1复制成文件file2  
cp file1 file2 file3 dir #把文件file1、file2、file3复制到目录dir中 
```
#### 6、mv命令(move)
该命令用于`移动文件、目录或更名`
```
#常用参数：
-f ：force强制的意思，如果目标文件已经存在，不会询问而直接覆盖  
-i ：若目标文件已经存在，就会询问是否覆盖  
-u ：若目标文件已经存在，且比目标文件新，才会更新  
#注：该命令可以把一个文件或多个文件一次移动一个文件夹中，但是最后一个目标文件一定要是“目录”。
#例如：
mv file1 file2 file3 dir # 把文件file1、file2、file3移动到目录dir中  
mv file1 file2 # 把文件file1重命名为file2  
```
#### 7、rm命令(remove)
该命令用于`删除`文件或目录
```
#常用参数：
-f ：就是force的意思，忽略不存在的文件，不会出现警告消息  
-i ：互动模式，在删除前会询问用户是否操作  
-r ：递归删除，最常用于目录删除，它是一个非常危险的参数  
#例如：
rm -i file # 删除文件file，在删除之前会询问是否进行该操作  
rm -fr dir # 强制删除目录dir中的所有文件  
```
#### 8、ps命令(progress)
该命令用于将某个时间点的`进程运行情况`选取下来并输出
```
#常用参数：
-A ：所有的进程均显示出来  
-a ：不与terminal有关的所有进程  
-u ：有效用户的相关进程  
-x ：一般与a参数一起使用，可列出较完整的信息  
-l ：较长，较详细地将PID的信息列出  

#ps一般使用的命令参数搭配:
ps aux # 查看系统所有的进程数据  
ps ax # 查看不与terminal有关的所有进程  
ps -lA # 查看系统所有的进程数据  
ps axjf # 查看连同一部分进程树状态
```
9、kill命令
该命令用于`向某个工作（%jobnumber）或者是某个PID（数字）传送一个信号`，它通常与ps和jobs命令一起使用
```
#基本语法：
kill -signal PID  
#signal的常用参数如下：
#注：最前面的数字为信号的代号，使用时可以用代号代替相应的信号。
SIGHUP，<启动>被终止的进程  
SIGINT，相当于输入ctrl+c，<中断>一个程序的进行  
SIGKILL，<强制中断>一个进程的进行  
SIGTERM，以<正常的结束进程方式来终止进程 > 
SIGSTOP，相当于输入ctrl+z，<暂停>一个进程的进行  
#例如：
#以正常的结束进程方式来终止第一个后台工作，可用jobs命令查看后台中的第一个工作进程  
kill -SIGTERM %1   
#重新改动进程ID为PID的进程，PID可用ps命令通过管道命令加上grep命令进行筛选获得  
kill -SIGHUP PID 
```
#### 10、killall命令
该命令用于`向一个命令启动的进程发送一个信号`
```
#语法：
killall [-iIe] [command name]  
#参数：
-i ：交互式的意思，若需要删除时，会询问用户  
-e ：表示后面接的command name要一致，但command name不能超过15个字符  
-I ：命令名称忽略大小写  
#例如：  
killall -SIGHUP syslogd # 重新启动syslogd
```
#### 11、file命令
该命令用于判断接在file命令后的`文件的基本数据`，因为在Linux下文件的类型并不是以后缀为分的
```
#基本语法：
file filename  
#例如：  
file ./test 
```
#### 12、tar命令
该命令用于`对文件进行打包`，默认情况并不会压缩，如果指定了相应的参数，它还会调用相应的压缩程序（如gzip和bzip等）进行压缩和解压
```
#常用参数:
-c ：新建打包文件  
-t ：查看打包文件的内容含有哪些文件名  
-x ：解打包或解压缩的功能，可以搭配-C（大写）指定解压的目录，注意-c,-t,-x不能同时出现在同一条命令中  
-j ：通过bzip2的支持进行压缩/解压缩  
-z ：通过gzip的支持进行压缩/解压缩  
-v ：在压缩/解压缩过程中，将正在处理的文件名显示出来  
-f filename ：filename为要处理的文件  
-C dir ：指定压缩/解压缩的目录dir  
#常用
压缩：tar -jcv -f filename.tar.bz2 要被处理的文件或目录名称  
查询：tar -jtv -f filename.tar.bz2  
解压：tar -jxv -f filename.tar.bz2 -C 欲解压缩的目录  
```
#### 13、cat命令
该命令用于`查看文本文件的内容`，后接要查看的文件名，通常可用管道与more和less一起使用，从而可以一页页地查看数据。
```
#例如：
cat text | less # 查看text文件中的内容  
#注：这条命令也可以使用less text来代替  
```
#### 14、chgrp命令
该命令用于`改变文件所属用户组`，它的使用非常简单
```
#基本用法：
chgrp [-R] dirname/filename  
-R ：进行递归的持续对所有文件和子目录更改  
#例如：  
chgrp users -R ./dir # 递归地把dir目录下中的所有文件和子目录下所有文件的用户组修改为users  
```
#### 15、chown命令
该命令用于`改变文件的所有者`，与chgrp命令的使用方法相同，只是修改的文件属性不同
#### 16、chmod命令
该命令用于`改变文件的权限`
```
#用法：
chmod [-R] xyz 文件或目录  
-R：进行递归的持续更改，即连同子目录下的所有文件都会更改  
同时，chmod还可以使用u（user）、g（group）、o（other）、a（all）和+（加入）、-（删除）、=（设置）跟rwx搭配来对文件的权限进行更改。
# 例如：  
chmod 0755 file # 把file的文件权限改变为-rxwr-xr-x  
chmod g+w file # 向file的文件权限中加入用户组可写权限
```
#### 17、vim命令
该命令主要用于`文本编辑`，它接一个或多个文件名作为参数，如果文件存在就打开，如果文件不存在就以该文件名创建一个文件。vim是一个非常好用的文本编辑器，它里面有很多非常好用的命令
```
#插入模式
i     从当前光标处进入插入模式
I     进入插入模式，并置光标于行首
a     追加模式，置光标于当前光标之后
A     追加模式，置光标于行末
o     在当前行之下新加一行，并进入插入模式
O     在当前行之上新加一行，并进入插入模式
Esc     退出插入模式
#可视模式
标记文本
v     进入可视模式，单字符模式
V     进入可视模式，行模式
ctrl+v     进入可视模式，列模式，类似于UE的列模式
o     跳转光标到选中块的另一个端点
U     将选中块中的内容转成大写
O     跳转光标到块的另一个端点
aw     选中一个字
ab     选中括号中的所有内容，包括括号本身
aB     选中{}括号中的所有内容
ib     选中括号中的内容，不含括号
iB     选中{}中的内容，不含{}
#退出编辑器
:w     将缓冲区写入文件，即保存修改
:wq     保存修改并退出
:x     保存修改并退出
:q     退出，如果对缓冲区进行过修改，则会提示
:q!     强制退出，放弃修改
```
#### 18、su su - root sudo
su和su-的区别：
`su`,运行替换用户和组标识的shell,修改有效用户标识和组标识为USER的
`su-`，以root身份登录,执行实际用户login以后的所有操作（包括环境变量的设置等）；而su只是简单的用户切换，pwd等信息
例：
```
hyk@hyk-linux:~$su
Password:（注意，切换以后的pwd并没有改变）
root@hyk-linux:/home#echo $HOME
/root
root@hyk-linux:/home#exit（后面显示exit）
exit
hyk@hyk-linux:~$su - root
Password:（切换以后pwd改变了）
root@hyk-linux:~#echo $HOME
/root
root@hyk-linux:~#exit（后面显示logout）
logout
```
`sudo`执行命令的流程是当前用户切换到root（或其它指定切换到的用户），然后以root（或其它指定的切换到的用户）身份执行命令，执行完成后，直接退回到当前用户；而这些的前提是要通过sudo的配置文件/etc/sudoers来进行授权
权限：在/etc/sudoers中有出现的使用者
```
   -V显示版本编号
　　-h会显示版本编号及指令的使用方式说明
　　-l显示出自己（执行sudo的使用者）的权限
　　-v因为sudo在第一次执行时或是在N分钟内没有执行（N预设为五）会问密码，这个参数是重新做一次确认，如果超过N分钟，也会问密码
　　-k将会强迫使用者在下一次执行sudo时问密码（不论有没有超过N分钟）
　　-b将要执行的指令放在背景执行
　　-pprompt可以更改问密码的提示语，其中%u会代换为使用者的帐号名称，%h会显示主机名称
　　-uusername/#uid不加此参数，代表要以root的身份执行指令，而加了此参数，可以以username的身份执行指令（#uid为该username的使用者号码）
　　-s执行环境变数中的SHELL所指定的shell，或是/etc/passwd里所指定的shell
　　-H将环境变数中的HOME（家目录）指定为要变更身份的使用者家目录（如不加-u参数就是系统管理者root）
　　command要以系统管理者身份（或以-u更改为其他人）执行的指令
　　
```

#### 19、echo
echo命令的功能是在显示器上显示一段文字，一般起到一个提示的作用
echo [-ne][字符串]或 echo [--help][--version]
-n 不要在最后自动换行
-e 若字符串中出现以下字符，则特别加以处理，而不会将它当成一般
文字输出
```
   \a 发出警告声；
   \b 删除前一个字符；
   \c 最后不加上换行符号；
   \f 换行但光标仍旧停留在原来的位置；
   \n 换行且光标移至行首；
   \r 光标移至行首，但不换行；
   \t 插入tab；
   \v 与\f相同；
   \\ 插入\字符；
   \nnn 插入nnn（八进制）所代表的ASCII字符；
–help 显示帮助
–version 显示版本信息
```
#### 20、tail
1．命令格式;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tail[必要参数][选择参数][文件]   
2．命令功能：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用于显示指定文件末尾内容，不指定文件时，作为输入信息进行处理。常用查看日志文件。
3．命令参数：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-f 循环读取
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-q 不显示处理信息
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-v 显示详细的处理信息
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-c<数目> 显示的字节数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-n<行数> 显示行数
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--pid=PID 与-f合用,表示在进程ID,PID死掉之后结束. 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-q, --quiet, --silent 从不输出给出文件名的首部 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-s, --sleep-interval=S 与-f合用,表示在每次反复的间隔休眠S秒
例：
```
tail -n 5 test.log        #显示文件最后五行内容
tail -n +5 test.log       #从文件的第五行开始显示
tail -f test.log          #循环查看文件内容
```

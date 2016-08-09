/* WORRING: git cmd all base-use */

//-----------------------------------------------
Git Bug（）{
    Error：
        error:invalid option: '<cmd>'
        错误：无效的参数: '<cmd>'
    EXP:
        参数是否输入错误？
        参数是否存在？
}
//-----------------------------------------------


$ git config （）{
    //------------------------------------------
    //			 ┏ 参数 --global 表示全局设置，所有项目都使用这个设置，如果不加--global参数，则表示在当前项目下创建并使用。
    $ git config --global user.name "<用户名>"	//使用git的第一件事  //这些是你在提交commit时候的签名
    $ git config --global user.email "<邮箱>" 	//┗设置用户名和邮箱	 //┗每次提交的时候都会包含这些信息
    //┗执行完成后上面的命令后会在Windows的当前用户(/我的文档/)中建立一个名为.gitconfig 的隐藏文件
    //							┗ Linux 的当前用户家目录(/home/<UserName>/)建立一个名为.gitconfig 的隐藏文件
    //			查看：使用ls -al 查看所有文件。     使用$ cat ~/.gitconfig 查看文件内容
    //	┏----eg: -- ---------------
                    $ cat ~/.gitconfig	//M$ & Linux git shell  //global配置的位置
                    $ cat <当前项目路径>.git/config	//M$ & Linux git shell  //查看独立的配置文件的位置
                    [filter "lfs"]											// ┗独立的：不加--global参数。仅对当前项目生效
                            clean = git-lfs clean %f
                            smudge = git-lfs smudge %f
                            required = true
                    [user]
                            name = <用户名>
                            email = <密码>

    //------------------------------------------

    $ git config --list //查看配置内容
    $ git config --global color.ui true //让Git显示颜色，会让命令输出看起来更醒目：
}

$ git init（路径）{
    //初始化
    //在当前项目的文件夹/目录下创建一个隐藏的.git文件夹（仓库）。这个仓库就是该git的运行库
}

$ git status（操作后）{
    //查看文件状态
    //eg:   新增       &      修改     &    删除
    //eg: new File(s)  &    modified   &  deleted (red)

<eg>
On branch master	//在主分支上

Initial commit	//？？？

Untracked files:	//显示处于Untracked状态文件
  (use "git add <file>..." to include in what will be committed)
  //使用 $ git add <FileName> 添加到要提交的缓存区中
    //┏ modified : 修改的：
    modified <Untracked FileNames List>	//红色显示的表示未提交的文件，需要使用git add <FileName> 添加到缓存区
    deleted  <Untracked FileNames List>	//红色 deleted 表示结果已经不存在的文件，使用 $ git rm <FN.E-N> 移除掉
    <Untracked FileNames List>	//绿色表示new file

nothing added to commit but untracked files present (use "git add" to track) 
//没有添加到提交但无Untracked状态的文件(可以使用git add 进行版本的跟踪)

    <FileName List>
    <FileName List>

</eg>

}

$ git add（添加文件）{
    $ git add <FileName.Expanded-Name> //添加文件：<FileName.E-N>
    
    $ git add '*.<E-N>'//添加同一扩展名的目录下所有文件
        
    $ git add * //添加所有

    $ git add -i // 比$ git status 详细的信息。

    $ git add -f <FN.E-N> //用于强制添加被忽略的文件。未强制错误见下方CASE1。

Error:
Q1：fatal:pathspec '<FileName.E-N>' did not match any files
    致命错误：添加的文件没有找到
Q2：使用git status查看后文件名是红色
Q3：使用git status查看后文件名是绿色

EXP:
A1：文件名有误？
A2：没有提交的文件，使用git add <Red FileName> 修改。
A3：是一个new file，新添加的。

```
CASE1:
    $ git add App.class
    The following paths are ignored by one of your .gitignore files:
    App.class
    Use -f if you really want to add them.
```




}
//code font name:DejaVu Sans Mono

$ git commit（添加文件说明备注）{
        ┣ $ git commit -m "<File Info Notes Msg>"：添加本次修改的注释。完成后就会记录一个新的项目版本
        ┣ $ git commit -a (=git add)：提交。//如果使用git commit -a -m "FINM" 的时候会变成填写并添加到缓存区
        ┣ $ git commit --date <YYYY.MM.DD> //在某一天提交
<eg>




</eg>


EXP:
1.首先先检查是否所有新建、修改的文件都被添加到了缓存区(gti status)
2.$ git commit -m "<File info Notes>" 

Q&A:
Q2：使用git status查看后文件名是红色？
Q3：使用git status查看后文件名是绿色。
A2：没有提交的文件，使用git add <Red FileName> 修改。<不正常>
A3：是一个new file，新添加的。<正常>
}


$ git log （查看操作日志）{
    $ git log --stat //显示每个commit提交中，有哪些文件被修改了，这些文件添加删除了多少行内容
        //                                                                   ┏full：
        //                                                                   ┃            ┏medium：
        //                                                                   ┃            ┃                  ┏format: $ git log --pretty=format:'%h : %s' --topo-order --graph
    $ git log [--reverse] [--topo-order] [--graph] --pretty=oneline[|email|full|fuller|medium|raw|short|format:] //格式化日志输出
        //          ┃           ┃           ┃                ┃        ┃          ┃            ┃   ┗short：
        //          ┃           ┃           ┃                ┃        ┃          ┃            ┗raw：
        //          ┃           ┃           ┃                ┃        ┃          ┗fuller：
        //          ┃           ┃           ┃                ┃        ┗email：
        //          ┃           ┃           ┃                ┗oneline：
        //			┃			┃			┗ --graph：使用ascii字符画出commit history提交历史线。
        //			┃			┗ --topo-order：子提交在它们的父提交前显示
        //          ┗ --reverse：倒序排列

}

git remote add <远程目录名> <远程git路径>（）{
    上传

Error:
fatal:   remote <远程目录名> already exists.
致命错误：<远程目录名>已经存在？

EXP:
<远程目录名>是否已创建/存在？是否<远程目录名>输入有误？
}


git push（）{
    //上传到服务器
    push -u:记住命令
    $ git push origin master
}


git pull origin master （）{

}


$ git diff（查看与上次版本提交的不同）{
        $ git diff --staged //查看最近一次的变化。
        $ git diff --cached //查看缓存区内与上次提交的哪些文件被修改了。
            //┃	 //		┗缓存区：使用git add <FileName> 操作后文件所在的位置。
            //┗ 退出$ git diff --cached界面输入 q 。

EXP:
在没有提交之前该命令运行后空白的。很明显，首次的操作没有对比			
}



$ git branch（创建分支）{
    $ git branch <分支名> //新建一个叫做<分支名>的分支
    $ git branch //查看当前的分支列表
        // ┗ * master: ━ master：默认主分支名称
        //   ┗> *：指向当前所在分支的符号
}

$ git checkout <分支名>（切换分支）{
    $ git checkout <分支名> //切换分支到<分支名>
    $ git checkout master  // 切换回主分支
}

$ git merge（合并分支）{
    $ git merge -m "<DescInfo>" <分支名> //合并分支并添加注释

Error:
    Q:冲突了怎么办
    A:http://git-scm.com/docs/git-merge#_how_conflicts_are_presented
EXP：
    无冲突：
        如果这俩个分支branch修改了不同的文件，那么合并的时候并不会有冲突，执行上面的命令后合并就完成了。
    有冲突：
        1.寻找冲突文件
        2.每个冲突分支(单独切换分支)内的文件单独修改($ git add -am"<FDI>")并提交
        3.合并($git merge <分支名>)

}

$ git branch（删除分支）{
    $ git branch -d <BranchName> //删除分支<分支名>
}

$ git reset （）{
    $ git reset --hard HEAD^ //撤销一个合并
}




git rm （）{
    //删除
    '*.<E-N>'：删除当前目录下某一类型的所有文件
    -r：连带目录一起递归删除
}


git push（）{
    提交
}



https://try.github.io/levels/1/challenges/25
To https://github.com/try-git/try_git.git
   3e70b0f..08fedf4  master -> master



//			 ┏Git URL Type: ssh://,  http[s]://, git://,
$ git clone <<GitURL>/<GitName>>（下载git仓库）{
    //在本地复制一份git仓库

<eg>	
$  git clone http://git.syl.com/syl/gitproject	//command line
Cloning into 'gitproject'...					//显示要clone的项目名称
remote: Counting objects: 3, done.				//远程：计数对象：<num>、完成。
remote: Total 3 (delta 0), reused 0 (delta 0)	//远程：总计 <num> (增加 <num>), 重复 <num> (增加 <num>)
Unpacking objects: 100% (3/3), done.			//拆包对象：<进度百分比%> (contnum/totalnum),完成。
Checking connectivity... done.					//检查连接......完成。
</eg>

EXP:
项目clone的位置为当前$ pwd所在的路径。
}


$ git rm <FileName> （）{
    //移除文件
}


.<SpecialFileName> （特殊文件名）{
    .gitignore //设置不提交的文件
               //  Syntax:
               //
               //	# :Notes
               //	*.<E-N>[E-N] :设置要忽略的文件扩展名
               //		┗ <E-N>[E-N] : 可批量添加相似扩展名,eg:*.py[cod] === *.pyc ; *.pyo ; *.pyd
               //	<FN>.<E-N> : 忽略这个文件名
               //	<DirName>/ : 忽略这个目录名下的所有文件
               //	/<DirName> : 只在当前路径下忽略这个目录下的所有文件。不包括<OtherDirName>/<DirName>
               //	! : 取反，除了这个。 //具有优先级，没忽略的忽略，忽略的不被忽略。
               //	? : 匹配单个字符
               //	* :	匹配0个或多个字符
               //	[0-9] : 等价于0123456789
               //	均可结合使用。
               //URL：http://www.jianshu.com/p/ea6341224e89
               //	：https://www.kernel.org/pub/software/scm/git/docs/gitignore.html 【En】
}






































































































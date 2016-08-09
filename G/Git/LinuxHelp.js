/*  EXP star*/
//
//  Linux下所有的同一命令的命令参数都可以合并填写，比如 git commit -a -m "<FINM>" 与 git commit -am "<FINM>" 相同。
//
/*  EXP end  */


//make dir
$ mkdir <DirName1> [,<DirName2> ,<DirName3> ,...]
$ touch <DirName1> [,<DirName2> ,<DirName3> ,...]

$ cd（）{
	$ cd <FilePath>/<FileName.E-N>

	//如何用$ cd创建&进入带有特殊符号的目录
		$ cd -- -\ SSgit
		$ cd -- -Sgit

		$ mkdir OR touch ./-\ SSgit/ 
		$ mkdir OR touch ./-Sgit
		
	//后退
		$ cd -
		
}

//show file content:
$ cat <FileName.E-N>

//edit file:
$ vi(m) <FileName.E-N>						//Normal(Edit & Save)
$ echo "<File Content Info Msg>" >> <FileName.E-N>	//Fast


//rename file
$ mv <OldFileName.E-N> <NewFileName.E-N>












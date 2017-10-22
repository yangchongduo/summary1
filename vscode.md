####  主题: zacks  
#### 插件

 - vscode-Live Server-----http服务器（相当于使用nodejs的http-server ）。
 
####  个人设置
-----------------------------------
```
{
    "editor.wordWrap": "bounded",
    "editor.fontSize": 17,
    "window.zoomLevel": 0,
    "terminal.integrated.shell.windows": "D:\\Program Files\\Git\\bin\\bash.exe",
    "vsicons.projectDetection.disableDetect": true, // 这里是我电脑上bash.exe的路径
     "editor.tabCompletion": false,
      "editor.snippetSuggestions": "top",
      "editor.fontFamily": "Consolas",
      "files.associations": {"*.extension": "html"},
    "editor.fontWeight": "Bold",
    "workbench.colorTheme": "Harmonic16 Light Theme",
    "workbench.iconTheme": "vscode-icons"
}
```
#### 代码片段 javascript
----------------------------
```
{
	/*
	 // Place your snippets for JavaScript here. Each snippet is defined under a snippet name and has a prefix, body and 
	 // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	 // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	 // same ids are connected.
	 // Example:
	 "Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	}
*/
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');"
		],
		"description": "Log output to console"
	},
	"Print to req": {
		"prefix": "req",
		"body": [
			"require('$1')"
		],
		"description": "Log output to console"
	},
	"Print to const": {
		"prefix": "con",
		"body": [
			"const "
		],
		"description": "const"
	}
}
```
### mac下配置 vscode配置ts cmd+shift+b 可以自动编译 webstrom 有watch file可自己执行
```
{
	"compilerOptions": {
		"module": "commonjs",
		"target": "es6",
		"noImplicitAny": false,
		"sourceMap": true,
		"allowJs": true
	},
	"exclude": [
		"node_modules"
	]
}
```

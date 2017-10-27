### 使用bolb下载 csv格式

 - 方案1

```
<body>
<a id="test" onclick="clickDownload(this)" download="downlaod.csv" href="#">download</a>
</body>
</html>
<script>

	function clickDownload(aLink) {
	var str = "栏位1,栏位2,栏位3\n值1,值2,值3";
	str =  encodeURIComponent(str);
  中文
	aLink.href = "data:text/csv;charset=utf-8,\ufeff"+str;
	aLink.click();
}
</script>
```

 - 方案2

 ```
 	var obj = {
		name:'栏位1,栏位2,栏位3',
		age:'值1,值2,值3',
	}
	var string = ''
	Object.entries(obj).map(([item,value])=>{
		string += `\n${value}`;
	})

	const blob = new Blob([string], {type: "text/plain"})
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "filename.csv" // 这里填保存成的文件名
	link.click()
	URL.revokeObjectURL(link.href)
 ```
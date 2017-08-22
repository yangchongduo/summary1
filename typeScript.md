### 索引类型
```
interface StringArray{
  [index:number]:string // 
}
let  myArray:  StringArray;
myArray = ['3232','3232']
```
### 函数类型
```
interface SearchFun {
  (source:string,sunString:string):boolean
}
let mySearch :SearchFun // 函数 mySearch   的入参和出参按照定义的函数类型来做

mySearch = (source:string,sunString:string) => {
  return false
}
```
### 接口的其他参数
```
interface yy{
  color?:string;
  [propName:string]:any  // 函数传入其他值 我们不需要做任何的
}
```
### 数组 
  - let list: Array<number> = [1, 2, 3];   <数组泛型 指定每个元素的类型>  
  - let list: number[] = [1, 2, 3];  
  
### any  

- let  data:any  = 'ddd';    
- data = 22;  
- let ary:any[] = [11,'333'] 


### void
```
function fn(params:string):void {
 
}
```

### 类型断言
- let value:any = 'my name is xx'
- let valueLetgth:number= (value as string).length
- let valueLetgth1:number = (<string>value).length

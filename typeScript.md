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

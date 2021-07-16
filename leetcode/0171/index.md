# 0171：Excel表列序号


## 题目

给定一个Excel表格中的列名称，返回其相应的列序号。

例如，

    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28 
    ...
	
 <!--more--> 

示例 1:

	输入: "A"
	输出: 1

示例 2:

	输入: "AB"
	输出: 28

示例 3:

	输入: "ZY"
	输出: 701

## 分析

类似 26 进制，将 A-Z 替换为 1-26 后得到 $\overline{a_n...a_1a_0}$，那么对应的数即为：

$$26^n * a_n+...+26 * a_1+a_0$$
 
## 解答

```python
def titleToNumber(self, columnTitle: str) -> int:
	return reduce(lambda x,y: x*26+ord(y)-ord('A')+1, columnTitle, 0)
```

36 ms


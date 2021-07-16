# 0168：Excel表列名称（★）


## 题目

给定一个正整数，返回它在 Excel 表中相对应的列名称。

例如，

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 
    ...


 <!--more--> 

示例 1:

	输入: 1
	输出: "A"

示例 2:

	输入: 28
	输出: "AB"

示例 3:

	输入: 701
	输出: "ZY"

## 分析

由 0171 可知，该数能写成类似 26 进制的表达式：

$$n = 26^n * a_n+...+26 * a_1+a_0$$

其中 $a_n,..a_1,a_0$ 的范围是 1-26，替换为对应的 A-Z 即可。

注意范围是 1-26 ，而不是普通二进制的范围 0-25，因此具体实现有差别：

$$a_0=(n-1)％26+1$$
$$a_1=((n-1)//26-1)％26+1$$
$$...$$

 
## 解答

```python
def convertToTitle(self, columnNumber: int) -> str:
	res, n = '', columnNumber
	while n:
		n, q = divmod(n-1, 26)
		res = chr(ord('A')+q) + res
	return res
```

36 ms


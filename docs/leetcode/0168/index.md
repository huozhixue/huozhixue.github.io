# 0168：Excel表列名称（★）


## 题目

给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。

例如：

	A -> 1
	B -> 2
	C -> 3
	...
	Z -> 26
	AA -> 27
	AB -> 28 
	...
	 

示例 1：

	输入：columnNumber = 1
	输出："A"

示例 2：

	输入：columnNumber = 28
	输出："AB"

示例 3：

	输入：columnNumber = 701
	输出："ZY"

示例 4：

	输入：columnNumber = 2147483647
	输出："FXSHRXW"
 

提示：
- 1 <= columnNumber <= 2^31 - 1



## 分析

类似 26 进制，只不过每一位的范围是 [1, 26] 而不是 [0, 25]，注意每次除 26 之前先减一。

## 解答

```python
def convertToTitle(self, columnNumber: int) -> str:
    res, n = '', columnNumber
    while n:
        n, r = divmod(n-1, 26)
        res = chr(ord('A')+r) + res
    return res
```
28 ms


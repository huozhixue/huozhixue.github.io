# 0166：分数到小数（★★）


## 题目

给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以 字符串形式返回小数 。

如果小数部分为循环小数，则将循环的部分括在括号内。

如果存在多个答案，只需返回 任意一个。

对于所有给定的输入，保证 答案字符串的长度小于 10^4。

提示：

- -2^31 <= numerator, denominator <= 2^31 - 1
- denominator != 0

 <!--more--> 

示例 1：

	输入：numerator = 1, denominator = 2
	输出："0.5"
	
示例 2：

	输入：numerator = 2, denominator = 1
	输出："2"
	
示例 3：

	输入：numerator = 2, denominator = 3
	输出："0.(6)"
	
示例 4：

	输入：numerator = 4, denominator = 333
	输出："0.(012)"
	
示例 5：

	输入：numerator = 1, denominator = 5
	输出："0.2"


## 分析

模拟除法的过程，可以用哈希表判断是否进入循环。

注意边界条件较多：
	
	若分子为 0 即返回 '0'
	
	转为两个正整数相除，根据正负性判断是否在结果前加负号
	
	若能整除，直接返回商，没有小数点
	
	小数点后若除得尽，将每一位加上即可
	
	若除不尽，必然存在循环，通过哈希表找到循环起点，中间即是循环部分。
 
## 解答

```python
def fractionToDecimal(self, numerator: int, denominator: int) -> str:
	if numerator == 0:
		return '0'
	res = '' if numerator ^ denominator >= 0 else '-'
	x, y = abs(numerator), abs(denominator)
	q, x = divmod(x, y)
	res += str(q)
	if not x:
		return res
	res += '.'
	d = {}
	while x and x not in d:
		d[x] = len(res)
		q, x = divmod(x * 10, y)
		res += str(q)
	return res if not x else res[:d[x]] + '(' + res[d[x]:] + ')'
```

36 ms




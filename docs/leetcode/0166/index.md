# 0166：分数到小数（★★）


## 题目

给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以 字符串形式返回小数 。

如果小数部分为循环小数，则将循环的部分括在括号内。

如果存在多个答案，只需返回 任意一个。

对于所有给定的输入，保证 答案字符串的长度小于 10^4。

示例 1：

	输入：numerator = 1, denominator = 2
	输出："0.5"

示例 2：

	输入：numerator = 2, denominator = 1
	输出："2"

示例 3：

	输入：numerator = 4, denominator = 333
	输出："0.(012)"

提示：
- -2^31 <= numerator, denominator <= 2^31 - 1
- denominator != 0



## 分析

模拟除法，用哈希表检测循环即可。注意边界条件较多：
- 转为两个非负数相除，并判断是否加上负号
- 若能整除，直接返回商，没有小数点
- 若不能整除，加上小数点，每轮相除，添加商
	- 若除得尽，直接返回
	- 若除不尽，用哈希表找到循环起点，添加括号即可
 
## 解答

```python
def fractionToDecimal(self, numerator: int, denominator: int) -> str:
    res = '' if numerator*denominator >= 0 else '-'
    m, n = abs(numerator), abs(denominator)
    q, r = divmod(m, n)
    res += str(q)
    if r == 0:
        return res
    res += '.'
    d = {}
    while True:
        d[r] = len(res)
        q, r = divmod(r*10, n)
        res += str(q)
        if r == 0:
            return res
        if r in d:
            i = d[r]
            return res[:i] + '(' + res[i:] + ')'
```
24 ms




# 0247：中心对称数 II（★★）


## 题目

给定一个整数 n ，返回所有长度为 n 的 中心对称数 。你可以以 任何顺序 返回答案。

中心对称数 是一个数字在旋转了 180 度之后看起来依旧相同的数字（或者上下颠倒地看）。

 

示例 1:

	输入：n = 2
	输出：["11","69","88","96"]

示例 2:

	输入：n = 1
	输出：["0","1","8"]
	 

提示：
- 1 <= n <= 14

## 分析

可以按最外层的数字递归。

注意当 n>=2 时，最外层不能为 0。

## 解答

```python
def findStrobogrammatic(self, n: int) -> List[str]:
    res = ['0', '1', '8'] if n%2 else ['']
    for _ in range(n%2+2, n-1, 2):
        res = [a+sub+b for sub in res for a,b in zip('01689', '01986')]
    if n>=2:
        res = [a+sub+b for sub in res for a,b in zip('1689', '1986')]
    return res
```
36 ms

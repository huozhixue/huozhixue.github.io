# 0172：阶乘后的零（★）


## 题目

给定一个整数 n ，返回 n! 结果中尾随零的数量。

提示 n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1

示例 1：

	输入：n = 3
	输出：0
	解释：3! = 6 ，不含尾随 0

示例 2：

	输入：n = 5
	输出：1
	解释：5! = 120 ，有一个尾随 0

示例 3：

	输入：n = 0
	输出：0
	 

提示：
- 0 <= n <= 10^4
 

进阶：你可以设计并实现对数时间复杂度的算法来解决此问题吗？


## 分析

数学分析：
- 结尾零的个数等于 n! 的质因数中 (2, 5) 对的个数
- 显然 5 更少，因此结果就等于因子 5 的个数
- 从 1 到 n ，含有 1 个因子 5 的个数是 n // 5，含有 2 个因子 5 的个数是 n // 25，依此类推

因此结果为：

	n // 5 + n // 25 + n // 125 + ...
 
## 解答

```python
def trailingZeroes(self, n: int) -> int:
    res = 0
    while n:
        n //= 5
        res += n
    return res
```
28 ms

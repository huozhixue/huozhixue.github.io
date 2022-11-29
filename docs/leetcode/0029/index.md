# 0029：两数相除（★★）


## 题目

给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2


示例 1:

	输入: dividend = 10, divisor = 3
	输出: 3
	解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
	
示例 2:

	输入: dividend = 7, divisor = -3
	输出: -2
	解释: 7/-3 = truncate(-2.33333..) = -2

提示：
- 被除数和除数均为 32 位有符号整数。
- 除数不为 0。
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。
本题中，如果除法结果溢出，则返回 2^31 − 1。 

## 分析

### #1 

最简单的想法就是把两个数都变成正的，然后被除数不断的减去除数直到小于除数为止，最后再加上正负号。

溢出的唯一可能是 −2^31 除以 -1 等于 2^31。

```python
def divide(self, dividend: int, divisor: int) -> int:
    res, flag = 0, int(dividend ^ divisor >= 0)
    m, n = abs(dividend), abs(divisor)
    while m >= n:
        m -= n
        res += 1
    res = res if flag else -res
    return min(res, 2147483647)
```
超时了

### #2

显然超时是因为两个数的逼近太慢。考虑将除数不断自加，相当于乘 2，就可以快速的逼近了。
- 以求 divide(100, 3) 为例，将 3 不断自加直到 96 （3 的 32 倍），即转化为求 32+divide(4, 3)
- 因此求 divide(m, n) 的过程就是每一轮求最接近 m 的 n*(2^k)，
并更新 m -= n*(2^k), res+=2^k 
- 进一步地，0<=k<=31。因此直接遍历 k 从 31 到 0，判断是否减去 n*(2^k) 即可。

## 解答

```python
def divide(self, dividend: int, divisor: int) -> int:
    res, flag = 0, int(dividend ^ divisor >= 0)
    m, n = abs(dividend), abs(divisor)
    A = [(n, 1)]
    for _ in range(31):
        A.append((A[-1][0]+A[-1][0], A[-1][1]+A[-1][1]))
    res = 0
    for i in range(31, -1, -1):
        if m >= A[i][0]:
            m -= A[i][0]
            res += A[i][1]
    res = res if flag else -res
    return min(res, 2147483647)
```
36 ms

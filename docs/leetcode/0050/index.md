# 0050：Pow(x, n)（★）


## 题目

实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。


示例 1：

    输入：x = 2.00000, n = 10
    输出：1024.00000

示例 2：

    输入：x = 2.10000, n = 3
    输出：9.26100

示例 3：

    输入：x = 2.00000, n = -2
    输出：0.25000
    解释：2-2 = 1/22 = 1/4 = 0.25
	
提示：
- -100.0 < x < 100.0
- -2^31 <= n <= 2^31-1
- -10^4 <= xn <= 10^4
 
## 分析 

### #1

递归的典型应用，特别注意下 n 为负数、x 为 0 的边界情况。

```python
def myPow(self, x: float, n: int) -> float:
    if n == 0:
        return 1
    if x == 0:
        return 0
    if n < 0:
        x, n = 1 / x, -n
    return self.myPow(x, n // 2) ** 2 * (x if n % 2 else 1)
```
28 ms

### #2

还可以写成非递归形式。假设 n 的二进制字符串为 s，可以递推求得 pow(x, s[:i]对应的数)。
（也可以迭代 s 的后缀，递推求得 pow(x, int(s[i:], 2))）

## 解答

```python
def myPow(self, x: float, n: int) -> float:
    if n == 0:
        return 1
    if x == 0:
        return 0
    if n < 0:
        x, n = 1 / x, -n
    res = 1
    for bit in bin(n)[2:]:
        res *= res
        res *= x if bit == '1' else 1
    return res
```
28 ms

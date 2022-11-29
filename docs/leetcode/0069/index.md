# 0069：x 的平方根（★）


## 题目

给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。


示例 1：

	输入：x = 4
	输出：2

示例 2：

	输入：x = 8
	输出：2
	解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
 

提示：
- 0 <= x <= 2^31 - 1



## 分析

### #1

就是求满足 y * y <= x 的最大整数 y 。y * y 单调递增，因此可以用二分查找。

python 中借助 bisect 和魔法方法可以节省代码。

```python
def mySqrt(self, x: int) -> int:
    self.__class__.__getitem__ = lambda self, i: i*i > x
    return bisect_left(self, True, 0, x+1) - 1
```

36 ms

### #2

本题还可以用牛顿迭代法，对于初始较大的 n，迭代 $n=(n+x/n)/2$ 可以不断逼近 $\sqrt x$。

注意若 n > $\sqrt x$，迭代后的 n 依然成立。所以对迭代后的 n 取整若得到 n'<=$\sqrt x$，n' 即是所求。

## 解答

```python
def mySqrt(self, x: int) -> int:
	n = x
	while n * n > x:
		n = (n + x // n) // 2
	return n
```

44 ms

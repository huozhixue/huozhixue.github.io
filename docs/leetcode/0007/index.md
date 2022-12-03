# 0007：整数反转


## 题目

给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。

假设环境不允许存储 64 位整数（有符号或无符号）。


示例 1：

    输入：x = 123
    输出：321

示例 2：

    输入：x = -123
    输出：-321

示例 3：

    输入：x = 120
    输出：21

示例 4：

    输入：x = 0
    输出：0


提示： -2^31 <= x <= 2^31 - 1

## 分析

### #1

最直接的就是转为字符串反转，再判断是否溢出。

注意负数的负号。

```python
def reverse(self, x: int) -> int:
    y = int('-'*(x < 0) + str(abs(x))[::-1])
    return y if -2**31 <= y <2**31 else 0
```

40 ms

### #2

也可以按位依次构建，python 中不需要担心溢出。

## 解答

```python
def reverse(self, x: int) -> int:
    flag = -1 if x < 0 else 1
    x, y = abs(x), 0
    while x:
        y = y * 10 + x % 10
        x //= 10
    return y*flag if -2**31 <= y*flag < 2**31 else 0
```

28 ms


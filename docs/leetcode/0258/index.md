# 0258：各位相加（★）


## 题目

给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。

示例 1:

	输入: num = 38
	输出: 2 
	解释: 各位相加的过程为：
	38 --> 3 + 8 --> 11
	11 --> 1 + 1 --> 2
	由于 2 是一位数，所以返回 2。

示例 2:

	输入: num = 0
	输出: 0
	 

提示：
- 0 <= num <= 2^31 - 1
 

进阶：你可以不使用循环或者递归，在 O(1) 时间复杂度内解决这个问题吗？


## 分析

### #1

模拟即可。

```python
def addDigits(self, num: int) -> int:
    while num >= 10:
        num = sum(map(int, str(num)))
    return num
```

### #2

由数学知识可知，一个数各位相加模 9 的余数等于该数模 9 的余数。

注意排除 num 为 0 的情况。

## 解答

```python
def addDigits(self, num: int) -> int:
    return num%9 or min(num, 9)
```
32 ms

# 0507：完美数（★）


## 题目

对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」。

给定一个 整数 n， 如果是完美数，返回 true，否则返回 false。

1 <= num <= 108。

 <!--more--> 
 
示例 1：

	输入：28
	输出：True
	解释：28 = 1 + 2 + 4 + 7 + 14
	1, 2, 4, 7, 和 14 是 28 的所有正因子。

示例 2：

	输入：num = 6
	输出：true
	
示例 3：

	输入：num = 496
	输出：true
	
示例 4：

	输入：num = 8128
	输出：true
	
示例 5：

	输入：num = 2
	输出：false

## 分析

### #1

遍历拿到因子即可。注意到除了完全平方数的根以外，因子都是成对出现的，因此只需遍历到 int(sqrt(num))。

```python
    def checkPerfectNumber(self, num: int) -> bool:
        x = int(sqrt(num))
        s = 1 + sum(i+num//i for i in range(2, x+1) if num%i==0)
        s -= x if x*x==num else 0
        return s == num
```

56 ms

### #2

完美数很少，根据计算在 32 位以内的完美数只有 5 个，因此可以直接判断。

## 解答

```python
def checkPerfectNumber(self, num: int) -> bool:
	return num in [6, 28, 496, 8128, 33550336]
```

36 ms

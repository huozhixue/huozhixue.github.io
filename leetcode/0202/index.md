# 0202：快乐数（★）


## 题目

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」定义为：

- 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
- 然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
- 如果 可以变为  1，那么这个数就是快乐数。

如果 n 是快乐数就返回 true ；不是，则返回 false 。


 <!--more--> 

示例 1：

	输入：19
	输出：true
	解释：
	12 + 92 = 82
	82 + 22 = 68
	62 + 82 = 100
	12 + 02 + 02 = 1
	
示例 2：

	输入：n = 2
	输出：false



## 分析

### #1

感觉上这个过程中数不会越来越大，先证明下。

设 n 是一个 k 位数，那么下一步显然不会大于 9ｘ9ｘk，故位数不会大于 $1+log_{10}9*9*k$。
这个数必然小于 max(3, k-1) 的，因此有限步之后位数会 <= 3 。

既然有上限，那么最终必然进入一个循环，只需要判断最终是否在 1 上循环即可。

```python
def isHappy(self, n: int) -> bool:
	d = set()
	while n not in d:
		d.add(n)
		n = sum(int(x)*int(x) for x in str(n))
	return n==1
```

40 ms

### #2

因为有上限，所以可以遍历找出所有的循环过程。最后发现只有两种循环：

	4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4

	1 → 1

故无需哈希表，可以直接判断是否进入了循环。

 
## 解答

```python
def isHappy(self, n: int) -> bool:
	while n not in [1, 4]:
		n = sum(int(x)*int(x) for x in str(n))
	return n==1
```

40 ms







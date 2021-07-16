# 0464：我能赢吗（★★★）


## 题目

给在 "100 game" 这个游戏中，两名玩家轮流选择从 1 到 10 的任意整数，累计整数和，先使得累计整数和达到或超过 100 的玩家，即为胜者。

如果我们将游戏规则改为 “玩家不能重复使用整数” 呢？

例如，两个玩家可以轮流从公共整数池中抽取从 1 到 15 的整数（不放回），直到累计整数和 >= 100。

给定一个整数 maxChoosableInteger （整数池中可选择的最大数）和另一个整数 desiredTotal（累计和），判断先出手的玩家是否能稳赢（假设两位玩家游戏时都表现最佳）？

你可以假设 maxChoosableInteger 不会大于 20， desiredTotal 不会大于 300。


 <!--more--> 
 
示例：

	输入：
	maxChoosableInteger = 10
	desiredTotal = 11

	输出：
	false

	解释：
	无论第一个玩家选择哪个整数，他都会失败。
	第一个玩家可以选择从 1 到 10 的整数。
	如果第一个玩家选择 1，那么第二个玩家只能选择从 2 到 10 的整数。
	第二个玩家可以通过选择整数 10（那么累积和为 11 >= desiredTotal），从而取得胜利.
	同样地，第一个玩家选择任意其他整数，第二个玩家都会赢。


## 分析

### #1

为了方便递推，先令 A = range(1, 1+maxChoosableInteger)，n = desiredTotal。问题就是轮流从 A 不放回抽取，
直到累计 >= n，可以表示为辅助函数 help(A, n)。

显然若 max(A) >= n，先手稳赢；若 sum(A) < n，则先手、后手都赢不了。剩下的就是 max(A) < n <= sum(A)，
感觉上说应该是先手必赢或必输，不存在输赢不确定的情况。但需要证明一下：

	假设对任意 A 的元素个数为 m 的子集 B，对于任意 n <= sum(B)，游戏 help(B, n) 的输赢都确定。
	
	那么对任意 A 的元素个数为 m+1 的子集 C，对于任意 n' <= max(C)，先手稳赢。
	而对于任意 max(C) < n' <= sum(C)，不管玩家 1 先取什么，问题都转化为 help(B，n)，所以 help(C, n') 的输赢也确定
	因此，对于任意 n' <= sum(C)，游戏 help(C, n') 输赢都确定，递推成立。
	
	初始条件 m=1 时，先手必赢，因此得证。
	
求解 help(A, n) 也可以按上述递推过程，从 1 个元素的子集一直递推到 A 本身，这样能得到任意 n' <= sum(A) 的答案。

不过这样的动态规划过程开销较大，很多信息是不需要的，因此直接用带记忆的递归反而更适合。递归过程为：

	if n <= max(A):		help(A, n) = True
	elif n > sum(A): 	help(A, n) = False
	else:				help(A, n) = any(not help(A[:i]+A[i+1:], n-a) for i,a in enumerate(A))
						即若玩家 1 取某个数 a，剩下的游戏玩家 2 必输，那么玩家 1 必胜。否则，玩家 1 必输。
						
注意不能直接把数组作为状态来记忆，所以转为 tuple。

```python
def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
	@lru_cache(None)
	def help(A, n):
		if sum(A) < n:
			return False
		return any(a >= n or not help(A[:i]+A[i+1:], n-a) for i,a in enumerate(A))

	return help(tuple(range(1, 1+maxChoosableInteger)), desiredTotal)
```

704 ms

### #2

当 n <= sum(A) 时，递归子问题 help(B, n') 必然满足 n' <= sum(B)，因此只需在最外层判断。

```python
def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
	@lru_cache(None)
	def help(A, n):
		return any(a >= n or not help(A[:i]+A[i+1:], n-a) for i,a in enumerate(A))

	if maxChoosableInteger*(maxChoosableInteger+1) // 2 < desiredTotal:
		return False
	return help(tuple(range(1, maxChoosableInteger+1)), desiredTotal)
```

664 ms

### #3

还有一种巧妙的转换方法，将 A 的所有子集转化为唯一对应的数。本题可以令数的二进制形式中 0 代表包含某数，1 代表不包含。
比如对于 A=[1, 2]，所有子集对应的数为：

	[]			11		3
	[1]			10		2
	[2]			01		1
	[1,2]		00		0
	
这种方法被称为状态压缩。

## 解答

```python
def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
	@lru_cache(None)
	def help(state, n):
		for a in range(1, 1+maxChoosableInteger):
			flag = 1<<(a-1)
			if not state&flag:
				if a >= n or not help(state|flag, n-a):
					return True
		return False

	if maxChoosableInteger*(maxChoosableInteger+1) // 2 < desiredTotal:
		return False
	return help(0, desiredTotal)
```

476 ms



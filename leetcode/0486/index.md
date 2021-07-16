# 0486：预测赢家（★★）


## 题目

给定一个表示分数的非负整数数组。 玩家 1 从数组任意一端拿取一个分数，随后玩家 2 继续从剩余数组任意一端拿取分数，然后玩家 1 拿，…… 。每次一个玩家只能拿取一个分数，分数被拿取之后不再可取。直到没有剩余分数可取时游戏结束。最终获得分数总和最多的玩家获胜。

给定一个表示分数的数组，预测玩家1是否会成为赢家。你可以假设每个玩家的玩法都会使他的分数最大化。

如果最终两个玩家的分数相等，那么玩家 1 仍为赢家。


 <!--more--> 
 
示例 1：

	输入：[1, 5, 2]
	输出：False
	解释：一开始，玩家1可以从1和2中进行选择。
	如果他选择 2（或者 1 ），那么玩家 2 可以从 1（或者 2 ）和 5 中进行选择。如果玩家 2 选择了 5 ，那么玩家 1 则只剩下 1（或者 2 ）可选。
	所以，玩家 1 的最终分数为 1 + 2 = 3，而玩家 2 为 5 。
	因此，玩家 1 永远不会成为赢家，返回 False 。
	
示例 2：

	输入：[1, 5, 233, 7]
	输出：True
	解释：玩家 1 一开始选择 1 。然后玩家 2 必须从 5 和 7 中进行选择。无论玩家 2 选择了哪个，玩家 1 都可以选择 233 。
		 最终，玩家 1（234 分）比玩家 2（12 分）获得更多的分数，所以返回 True，表示玩家 1 可以成为赢家。



## 分析

### #1

玩家 1 一开始有两种选择，拿首位或末位后，剩下的很像子问题，但无法递推。
要能递推出玩家 1 能否获胜，需要知道剩下数组玩家 1 和 玩家 2 分别能拿到的最多分数。

所以用辅助函数 help(i, j) 表示用 nums[i:j] 玩游戏玩家 1 和玩家 2 分别能拿到的最多分数。

若已知递归子问题的解，即：

	用 nums[i+1:j] 玩游戏玩家 1 和玩家 2 能拿到的最多分数是 x1, y1
	用 nums[i:j-1] 玩游戏玩家 1 和玩家 2 能拿到的最多分数是 x2, y2

那么：

	玩家 1 先拿 i 位，那么剩下的玩家 1 和玩家 2 能拿到的最多分数应该是 y1, x1（注意这里要交换）
	玩家 1 先拿 j-1 位，那么剩下的玩家 1 和玩家 2 能拿到的最多分数应该是 y2, x2（注意这里要交换）
	比较两种情况即可

再考虑边界即可。

```python
def PredictTheWinner(self, nums: List[int]) -> bool:
	@lru_cache(None)
	def help(i, j):
		if i==j:
			return 0, 0
		x1, y1 = help(i+1, j)
		x2, y2 = help(i, j-1)
		if nums[i]+y1 > nums[j-1]+y2:
			return nums[i]+y1, x1
		return nums[j-1]+y2, x2

	x, y = help(0, len(nums))
	return x>=y
```

44 ms

### #2

每次递归都返回两个值有点麻烦，考虑能否用一个值替代，符合直觉的就是两个值之差。
于是用辅助函数 help(i, j) 直接表示用 nums[i:j] 玩游戏玩家 1 和玩家 2 能拿到的最大分数差。

相应的有：

	玩家 1 先拿 i 位，玩家 1 和玩家 2 能拿到的最大分数差是 nums[i]-help(i+1, j)（注意这里是减）
	玩家 1 先拿 j-1 位，玩家 1 和玩家 2 能拿到的最大分数差是 nums[j-1]-help(i,j-1)（注意这里是减）
	比较两种情况即可

```python
def PredictTheWinner(self, nums: List[int]) -> bool:
	@lru_cache(None)
	def help(i, j):
		return 0 if i==j else max(nums[i]-help(i+1, j), nums[j-1]-help(i, j-1))
	return help(0, len(nums)) >= 0
```

44 ms，空间占得较多

### #3

可以改写成动态规划。令 dp[i][j] 代表用 nums[i:j] 玩游戏玩家 1 和玩家 2 能拿到的最大分数差。
状态转移方程为：

	if i==j:		dp[i][j] = 0
	else:			dp[i][j] = max(nums[i]-dp[i+1][j], nums[j-1]-dp[i][j-1])
	
```python
def PredictTheWinner(self, nums: List[int]) -> bool:
	n = len(nums)
	dp = [[0]*(n+1) for _ in range(n+1)]
	for i in range(n-1, -1, -1):
		for j in range(i+1, n+1):
			dp[i][j] = max(nums[i]-dp[i+1][j], nums[j-1]-dp[i][j-1])
	return dp[0][-1] >= 0
```

时间复杂度 $O(N^2)$，40 ms

### #4

还可以将 dp 优化为一维数组。

## 解答

```python
def PredictTheWinner(self, nums: List[int]) -> bool:
	n = len(nums)
	dp = [0]*(n+1)
	for i in range(n-1, -1, -1):
		for j in range(i+1, n+1):
			dp[j] = max(nums[i]-dp[j], nums[j-1]-dp[j-1])
	return dp[-1] >= 0
```

时间复杂度 $O(N^2)$，40 ms

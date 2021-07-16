# 0354：俄罗斯套娃信封问题（★★★）


## 题目

给定一些标记了宽度和高度的信封，宽度和高度以整数对形式 (w, h) 出现。当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

请计算最多能有多少个信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

不允许旋转信封。


<!--more--> 

示例:

	输入: envelopes = [[5,4],[6,4],[6,7],[2,3]]
	输出: 3 
	解释: 最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。

## 分析

### #1

可以先将信封按宽度排序，问题即转化为求能组成 "套娃" 的最长子序列，类似 0300 了。

0300 有两种解法，先试试第一种。为了方便，令 A 代表 envelopes，令 dp[i] 代表以 A[i] 结尾的最长套娃长度，状态转移方程为：

	if i==0:	dp[i] = 1
	else:		dp[i] = 1+max(dp[j] if A[j][1]<A[i][1] and A[j][0]<A[i][0] else 0 for j in range(i))
	
```python
def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
	A, n = envelopes, len(envelopes)
	A.sort(key=lambda x: x[0])
	dp = [1] * n
	for i in range(1, n):
		dp[i] += max(dp[j] if A[j][1]<A[i][1] and A[j][0]<A[i][0] else 0 for j in range(i))
	return max(dp)
```

8060 ms

### #2

考虑 0300 的第二种解法。令 tmp[i] 代表当前长度为 i+1 的套娃的最小高度。如果宽度各不相等，显然就等价于 0300 了。

但相等宽度的情况就会有错误，比如:

	envelopes = [[1,2],[2,6],[3,4],[3,5]]
	遍历到 [3, 4] 时，tmp=[2,6]，按 0300 的方法则应该更新 tmp 为 [2,4]，影响到了后面的 [3,5] 的判断。

解决方法很简单，将相同宽度的信封按高度反序排列即可。


## 解答

```python
def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
	envelopes.sort(key=lambda li: (li[0], -li[1]))
	tmp = []
	for _, h in envelopes:
		j = bisect_left(tmp, h)
		tmp[j:j+1] = [h]
	return len(tmp)
```

60 ms


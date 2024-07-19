# 1563：石子游戏 V（2087 分）


> <u>**[力扣第 203 场周赛第 4 题](https://leetcode.cn/problems/stone-game-v/)**</u>

## 题目

<p>几块石子 <strong>排成一行</strong> ，每块石子都有一个关联值，关联值为整数，由数组 <code>stoneValue</code> 给出。</p>

<p>游戏中的每一轮：Alice 会将这行石子分成两个 <strong>非空行</strong>（即，左侧行和右侧行）；Bob 负责计算每一行的值，即此行中所有石子的值的总和。Bob 会丢弃值最大的行，Alice 的得分为剩下那行的值（每轮累加）。如果两行的值相等，Bob 让 Alice 决定丢弃哪一行。下一轮从剩下的那一行开始。</p>

<p>只 <strong>剩下一块石子</strong> 时，游戏结束。Alice 的分数最初为 <strong><code>0</code></strong> 。</p>

<p>返回 <strong>Alice 能够获得的最大分数</strong><em> 。</em></p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>stoneValue = [6,2,3,4,5,5]
<strong>输出：</strong>18
<strong>解释：</strong>在第一轮中，Alice 将行划分为 [6，2，3]，[4，5，5] 。左行的值是 11 ，右行的值是 14 。Bob 丢弃了右行，Alice 的分数现在是 11 。
在第二轮中，Alice 将行分成 [6]，[2，3] 。这一次 Bob 扔掉了左行，Alice 的分数变成了 16（11 + 5）。
最后一轮 Alice 只能将行分成 [2]，[3] 。Bob 扔掉右行，Alice 的分数现在是 18（16 + 2）。游戏结束，因为这行只剩下一块石头了。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>stoneValue = [7,7,7,7,7,7,7]
<strong>输出：</strong>28
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>stoneValue = [4]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= stoneValue.length &lt;= 500</code></li>
<li><code>1 &lt;= stoneValue[i] &lt;= 10^6</code></li>
</ul>


**相似问题：**
- [0877：石子游戏（1590 分）](/leetcode/0877)
- [1140：石子游戏 II（2034 分）](/leetcode/1140)
- [1406：石子游戏 III（2026 分）](/leetcode/1406)
- [1510：石子游戏 IV（1786 分）](/leetcode/1510)
- [1686：石子游戏 VI（2000 分）](/leetcode/1686)
- [1690：石子游戏 VII（1951 分）](/leetcode/1690)
- [1872：石子游戏 VIII（2439 分）](/leetcode/1872)
- [2029：石子游戏 IX（2277 分）](/leetcode/2029)


## 分析

### #1

依然考虑递归。令辅助函数 help(A) 代表在数组 A 玩游戏 Alice 能得到的最大分数。

	假设 Alice 在 i 处分割，即分为 A[:i] 和 A[i:]，根据两个子数组的和的大小，可转为不同的递归子问题。
	
	若 sum(A[:i]) < sum(A[i:])，此时 Alice 能获得的最大分数为 sum(A[:i])+help(A[:i])
	
	若 sum(A[:i]) > sum(A[i:])，此时 Alice 能获得的最大分数为 sum(A[i:])+help(A[i:])
	
	若 sum(A[:i]) == sum(A[i:])，此时 Alice 能获得的最大分数为 sum(A[:i])+max(help(A[:i]),help(A[i:]))
	
	遍历 i 取最大值即可

其中 A 的前缀和、后缀和可以递推得到
	
```python
def stoneGameV(self, stoneValue: List[int]) -> int:
	@lru_cache(None)
	def help(A):
		if len(A) == 1:
			return 0
		res, pre, suf = 0, 0, sum(A)
		for i in range(1, len(A)):
			pre += A[i-1]
			suf -= A[i-1]
			if pre < suf:
				res = max(res, pre + help(A[:i]))
			elif pre > suf:
				res = max(res, suf + help(A[i:]))
			else:
				res = max(res, pre + help(A[:i]), suf + help(A[i:]))
		return res

	return help(tuple(stoneValue))
```

3444 ms

	
### #2





## 解答

```python

```




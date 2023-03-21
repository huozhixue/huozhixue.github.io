# 0992：K 个不同整数的子数组（★★）


> <u>**[力扣第 123 场周赛第 4 题](https://leetcode.cn/problems/subarrays-with-k-different-integers/)**</u>

## 题目

<p>给定一个正整数数组 <code>nums</code>和一个整数 <font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">k</span></span></font></font> ，返回 <font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">num</span></span></font></font> 中 「<strong>好子数组」</strong><em> </em>的数目。</p>

<p>如果 <code>nums</code> 的某个子数组中不同整数的个数恰好为 <code>k</code>，则称 <code>nums</code> 的这个连续、不一定不同的子数组为 <strong>「</strong><strong>好子数组 」</strong>。</p>

<ul>
<li>例如，<code>[1,2,3,1,2]</code> 中有 <code>3</code> 个不同的整数：<code>1</code>，<code>2</code>，以及 <code>3</code>。</li>
</ul>

<p><strong>子数组</strong> 是数组的 <strong>连续</strong> 部分。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,2,3], k = 2
<strong>输出：</strong>7
<strong>解释：</strong>恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,3,4], k = 3
<strong>输出：</strong>3
<strong>解释：</strong>恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i], k &lt;= nums.length</code></li>
</ul>


## 分析

### #1

有个巧妙的想法是找到含最多 K 个不同整数的子数组个数，再找到含最多 K-1 个不同正数的子数组个数，相减即为所求。

对于转化后的问题，可以遍历结尾位置 j，找到满足条件的最小开头位置 i，得到以 j 结尾的子数组个数。

```python
def subarraysWithKDistinct(self, A: List[int], K: int) -> int:
	def help(A, K):
		res, ct, i = 0, Counter(), 0
		for j, num in enumerate(A):
			ct[num] += 1
			while len(ct) > K:
				ct[A[i]] -= 1
				if ct[A[i]] == 0:
					ct.pop(A[i])
				i += 1
			res += j-i+1
		return res
	return help(A, K) - help(A, K-1)
```

592 ms


### #2

也可以一次遍历解决。遍历结尾位置 j，找到满足条件的开头位置范围 [l,r)，则以 j 结尾的子数组个数是 r-l 。

假设已知位置 j 对应的开头位置范围是 [l,r)，那么：

	if l<=i<r:		len(set(A[i:j]))==K
	elif i==r:		len(set(A[i:j]))==K-1

显然 set(A[r:j]) 比 set(A[l:j]) 少的就是 A[r-1]。

对于结尾位置 j+1，有三种情况：

	if len(set(A[r:j+1]))==K-1：新加的元素在 set(A[l:j]) 和 set(A[r:j]) 中，不影响 l 和 r
	elif A[j]==A[r-1]：			新加的元素在 set(A[l:j] 中但不在set(A[r:j]) 中，右移 r 直到 len(set(A[r:j+1]))==K-1
	else：						新加的元素不在两个集合中，l 变为 r，右移 r 直到 len(set(A[r:j+1]))==K-1

因此，可以用双指针一趟解决。

## 解答

```python
def subarraysWithKDistinct(self, A: List[int], K: int) -> int:
	ct, res, l, r = Counter(), 0, 0, 0
	for num in A:
		ct[num] += 1
		if len(ct)==K:
			if r and num != A[r-1]:
				l = r
			while len(ct)==K:
				ct[A[r]] -= 1
				if ct[A[r]]==0:
					ct.pop(A[r])
				r += 1
		res += r-l
	return res
```

456 ms

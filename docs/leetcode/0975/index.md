# 0975：奇偶跳（2079 分）


> <u>**[力扣第 119 场周赛第 4 题](https://leetcode.cn/problems/odd-even-jump/)**</u>

## 题目

<p>给定一个整数数组 <code>A</code>，你可以从某一起始索引出发，跳跃一定次数。在你跳跃的过程中，第 1、3、5... 次跳跃称为奇数跳跃，而第 2、4、6... 次跳跃称为偶数跳跃。</p>

<p>你可以按以下方式从索引 <code>i</code> 向后跳转到索引 <code>j</code>（其中 <code>i &lt; j</code>）：</p>

<ul>
<li>在进行奇数跳跃时（如，第 1，3，5... 次跳跃），你将会跳到索引 <code>j</code>，使得 <code>A[i] &lt;= A[j]</code>，<code>A[j]</code> 是可能的最小值。如果存在多个这样的索引 <code>j</code>，你只能跳到满足要求的<strong>最小</strong>索引 <code>j</code> 上。</li>
<li>在进行偶数跳跃时（如，第 2，4，6... 次跳跃），你将会跳到索引 <code>j</code>，使得 <code>A[i] &gt;= A[j]</code>，<code>A[j]</code> 是可能的最大值。如果存在多个这样的索引 <code>j</code>，你只能跳到满足要求的<strong>最小</strong>索引 <code>j</code> 上。</li>
<li>（对于某些索引 <code>i</code>，可能无法进行合乎要求的跳跃。）</li>
</ul>

<p>如果从某一索引开始跳跃一定次数（可能是 0 次或多次），就可以到达数组的末尾（索引 <code>A.length - 1</code>），那么该索引就会被认为是好的起始索引。</p>

<p>返回好的起始索引的数量。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>[10,13,12,14,15]
<strong>输出：</strong>2
<strong>解释： </strong>
从起始索引 i = 0 出发，我们可以跳到 i = 2，（因为 A[2] 是 A[1]，A[2]，A[3]，A[4] 中大于或等于 A[0] 的最小值），然后我们就无法继续跳下去了。
从起始索引 i = 1 和 i = 2 出发，我们可以跳到 i = 3，然后我们就无法继续跳下去了。
从起始索引 i = 3 出发，我们可以跳到 i = 4，到达数组末尾。
从起始索引 i = 4 出发，我们已经到达数组末尾。
总之，我们可以从 2 个不同的起始索引（i = 3, i = 4）出发，通过一定数量的跳跃到达数组末尾。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>[2,3,1,1,4]
<strong>输出：</strong>3
<strong>解释：</strong>
从起始索引 i=0 出发，我们依次可以跳到 i = 1，i = 2，i = 3：

在我们的第一次跳跃（奇数）中，我们先跳到 i = 1，因为 A[1] 是（A[1]，A[2]，A[3]，A[4]）中大于或等于 A[0] 的最小值。

在我们的第二次跳跃（偶数）中，我们从 i = 1 跳到 i = 2，因为 A[2] 是（A[2]，A[3]，A[4]）中小于或等于 A[1] 的最大值。A[3] 也是最大的值，但 2 是一个较小的索引，所以我们只能跳到 i = 2，而不能跳到 i = 3。

在我们的第三次跳跃（奇数）中，我们从 i = 2 跳到 i = 3，因为 A[3] 是（A[3]，A[4]）中大于或等于 A[2] 的最小值。

我们不能从 i = 3 跳到 i = 4，所以起始索引 i = 0 不是好的起始索引。

类似地，我们可以推断：
从起始索引 i = 1 出发， 我们跳到 i = 4，这样我们就到达数组末尾。
从起始索引 i = 2 出发， 我们跳到 i = 3，然后我们就不能再跳了。
从起始索引 i = 3 出发， 我们跳到 i = 4，这样我们就到达数组末尾。
从起始索引 i = 4 出发，我们已经到达数组末尾。
总之，我们可以从 3 个不同的起始索引（i = 1, i = 3, i = 4）出发，通过一定数量的跳跃到达数组末尾。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>[5,1,3,4,2]
<strong>输出：</strong>3
<strong>解释： </strong>
我们可以从起始索引 1，2，4 出发到达数组末尾。
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= A.length &lt;= 20000</code></li>
<li><code>0 &lt;= A[i] &lt; 100000</code></li>
</ol>




## 分析

### #1

显然每个位置的奇数跳和偶数跳都是确定的，考虑先求出来。

奇数跳是先在 i 右边找到最接近的较大值，再从中选最接近的位置。
容易想到，可以维护一个有序列表 tmp，将位置 [i+1, n-1] 按 (值 A[x] 升序、位置 x 升序）排序，然后二分查找第一个大于等于 A[i] 的位置 tmp[pos] 即可。
找到后，将 i 插入到 tmp 的 pos 处即可维护 tmp。

同理，对于偶数跳，维护 tmp 将位置 [i+1, n-1] 按 (值 A[x] 升序、位置 x 降序）排序，然后二分查找最后一个小于等于 A[i] 的位置 tmp[pos]。
将 i 插入到 tmp 的 pos+1 处即可维护 tmp。

得到两个数组 odd 和 even 后（找不到的置为 n），就可以递推得到每个位置能否跳到末尾了。令 dp[i][0] 代表从 i 位置先奇数跳能否到达末尾，
dp[i][1] 代表从 i 位置先偶数跳能否到达末尾，状态转移方程为：

	if i == n:		dp[i] = [False, False]
	elif i == n-1:	dp[i] = [True, True]
	else:			dp[i][0] = dp[odd[i]][1], dp[i][1] = dp[even[i]][0]


```python
def oddEvenJumps(self, arr: List[int]) -> int:
	n = len(arr)
	odd, tmp = [n] * n, []
	self.__class__.__getitem__ = lambda self, x: arr[tmp[x]] >= arr[i]
	for i in range(n-1, -1, -1):
		pos = bisect_left(self, True, 0, len(tmp))
		odd[i] = tmp[pos] if pos != len(tmp) else n
		tmp.insert(pos, i)
	even, tmp = [n] * n, []
	self.__class__.__getitem__ = lambda self, x: arr[tmp[x]] > arr[i]
	for i in range(n-1, -1, -1):
		pos = bisect_left(self, True, 0, len(tmp))
		even[i] = tmp[pos-1] if pos else n
		tmp.insert(pos, i)
	dp = [[i == n-1]*2 for i in range(n+1)]
	for i in range(n-2, -1, - 1):
		dp[i][0] = dp[odd[i]][1]
		dp[i][1] = dp[even[i]][0]
	return sum(dp[i][0] for i in range(n))
```

960 ms

### #2

求奇数跳和偶数跳有个巧妙的单调栈解法。

先将位置 [0, n-1] 按 (值 A[x] 升序、位置 x 升序）排序得到 tmp，那么奇数跳就是求每个元素 在 tmp 中的下一个更大元素。
同理，将位置 [0, n-1] 按 (值 A[x] 降序、位置 x 升序）排序得到 tmp，那么偶数跳就是求每个元素 在 tmp 中的下一个更大元素。

找下一个更大元素，即是单调栈的典型应用，类似 {{< lc "0739" >}}。


## 解答

```python
def oddEvenJumps(self, arr: List[int]) -> int:
	def nxt(A):
		res, stack = [n] * n, []
		for i in A:
			while stack and stack[-1] < i:
				res[stack.pop()] = i
			stack.append(i)
		return res

	n = len(arr)
	odd = nxt(sorted(range(n), key=lambda i: arr[i]))
	even = nxt(sorted(range(n), key=lambda i: -arr[i]))
	dp = [[i == n-1]*2 for i in range(n+1)]
	for i in range(n-2, -1, - 1):
		dp[i][0] = dp[odd[i]][1]
		dp[i][1] = dp[even[i]][0]
	return sum(dp[i][0] for i in range(n))
```

200 ms

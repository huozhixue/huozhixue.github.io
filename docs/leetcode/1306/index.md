# 1306：跳跃游戏 III（1396 分）


> <u>**[力扣第 169 场周赛第 3 题](https://leetcode.cn/problems/jump-game-iii/)**</u>

## 题目

<p>这里有一个非负整数数组 <code>arr</code>，你最开始位于该数组的起始下标 <code>start</code> 处。当你位于下标 <code>i</code> 处时，你可以跳到 <code>i + arr[i]</code> 或者 <code>i - arr[i]</code>。</p>

<p>请你判断自己是否能够跳到对应元素值为 0 的 <strong>任一</strong> 下标处。</p>

<p>注意，不管是什么情况下，你都无法跳到数组之外。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>arr = [4,2,3,0,3,1,2], start = 5
<strong>输出：</strong>true
<strong>解释：</strong>
到达值为 0 的下标 3 有以下可能方案：
下标 5 -&gt; 下标 4 -&gt; 下标 1 -&gt; 下标 3
下标 5 -&gt; 下标 6 -&gt; 下标 4 -&gt; 下标 1 -&gt; 下标 3
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>arr = [4,2,3,0,3,1,2], start = 0
<strong>输出：</strong>true
<strong>解释：
</strong>到达值为 0 的下标 3 有以下可能方案：
下标 0 -&gt; 下标 4 -&gt; 下标 1 -&gt; 下标 3
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>arr = [3,0,2,1,2], start = 2
<strong>输出：</strong>false
<strong>解释：</strong>无法到达值为 0 的下标 1 处。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr.length &lt;= 5 * 10^4</code></li>
<li><code>0 &lt;= arr[i] &lt; arr.length</code></li>
<li><code>0 &lt;= start &lt; arr.length</code></li>
</ul>


**相似问题：**
- [0045：跳跃游戏 II](/leetcode/0045)
- [0055：跳跃游戏](/leetcode/0055)
- [1871：跳跃游戏 VII（1896 分）](/leetcode/1871)
- [2297：跳跃游戏 VIII](/leetcode/2297)
- [2770：达到末尾下标所需的最大跳跃次数（1533 分）](/leetcode/2770)


## 分析

从 start 开始 bfs 或 dfs 遍历即可。

## 解答


```python
def canReach(self, arr: List[int], start: int) -> bool:
	n = len(arr)
	Q, vis = deque([start]), set()
	while Q:
		i = Q.popleft()
		if arr[i] == 0:
			return True
		for j in [i+arr[i], i-arr[i]]:
			if 0<=j<n and j not in vis:
				Q.append(j)
				vis.add(j)
	return False
```
64 ms

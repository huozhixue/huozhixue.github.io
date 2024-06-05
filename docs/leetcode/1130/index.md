# 1130：叶值的最小代价生成树（1919 分）


> <u>**[力扣第 146 场周赛第 3 题](https://leetcode.cn/problems/minimum-cost-tree-from-leaf-values/)**</u>

## 题目

<p>给你一个正整数数组 <code>arr</code>，考虑所有满足以下条件的二叉树：</p>

<ul>
<li>每个节点都有 <code>0</code> 个或是 <code>2</code> 个子节点。</li>
<li>数组 <code>arr</code> 中的值与树的中序遍历中每个叶节点的值一一对应。</li>
<li>每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积。</li>
</ul>

<p>在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。这个和的值是一个 32 位整数。</p>

<p>如果一个节点有 0 个子节点，那么该节点为叶节点。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/tree1.jpg" style="width: 500px; height: 169px;" />
<pre>
<strong>输入：</strong>arr = [6,2,4]
<strong>输出：</strong>32
<strong>解释：</strong>有两种可能的树，第一种的非叶节点的总和为 36 ，第二种非叶节点的总和为 32 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/08/10/tree2.jpg" style="width: 224px; height: 145px;" />
<pre>
<strong>输入：</strong>arr = [4,11]
<strong>输出：</strong>44
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= arr.length &lt;= 40</code></li>
<li><code>1 &lt;= arr[i] &lt;= 15</code></li>
<li>答案保证是一个 32 位带符号整数，即小于 <code>2<sup>31</sup></code> 。</li>
</ul>


## 分析

### #1

数据规模很小，考虑直接递归。满足条件的二叉树必然是以 arr[:i] 为左子树，arr[i:] 为右子树。
并且如果 len(arr) > 1，左子树和右子树都至少有一个节点。

因此遍历位置 0<i<len(arr)，根节点的值为 max(arr[:i]) * max(arr[i:])，剩下的即为递归子问题。

```python
def mctFromLeafValues(self, arr: List[int]) -> int:
	@lru_cache(None)
	def help(i, j):
		if i == j-1:
			return 0
		return min(help(i, k)+help(k, j)+max(arr[i:k])*max(arr[k:j]) for k in range(i+1, j))
	return help(0, len(arr))
```

296 ms

### #2

本题有个很巧妙的单调栈解法。

本题可以等价于一个数组问题：每一轮从 arr 中选择两个相邻的数，得到一个乘积，并删除较小的那个数，直到数组长度小于 2，求最小的乘积之和。

如果存在 arr[i-1] >= arr[i] <= arr[i+1]，最终 arr[i] 必然是要被删除的（或者等价于 arr[i] 被删除）。
假设最优方略是在删除了 arr[i-1] 或 arr[i+1] 之后才删除的 arr[i]，arr[i] 相邻的两个数会相等或更大。那么改成先删除 arr[i]，不会比最优方案差。

因此遇到 arr[i-1] >= arr[i] <= arr[i+1] 时，即可先将 arr[i] 删除，这正符合单调栈的过程。

注意最后栈中可能还剩余元素，显然应该反向删除。


## 解答

```python
def mctFromLeafValues(self, arr: List[int]) -> int:
	res, stack = 0, []
	for num in arr:
		while stack and stack[-1] <= num:
			x = stack.pop()
			y = min(stack[-1], num) if stack else num
			res += x * y
		stack.append(num)
	while len(stack) > 1:
		res += stack.pop() * stack[-1]
	return res
```

48 ms


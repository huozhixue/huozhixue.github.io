# 1187：使数组严格递增（★★★）


> <u>**[力扣第 153 场周赛第 4 题](https://leetcode.cn/problems/make-array-strictly-increasing/)**</u>

## 题目

<p>给你两个整数数组 <code>arr1</code> 和 <code>arr2</code>，返回使 <code>arr1</code> 严格递增所需要的最小「操作」数（可能为 0）。</p>

<p>每一步「操作」中，你可以分别从 <code>arr1</code> 和 <code>arr2</code> 中各选出一个索引，分别为 <code>i</code> 和 <code>j</code>，<code>0 &lt;= i &lt; arr1.length</code> 和 <code>0 &lt;= j &lt; arr2.length</code>，然后进行赋值运算 <code>arr1[i] = arr2[j]</code>。</p>

<p>如果无法让 <code>arr1</code> 严格递增，请返回 <code>-1</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
<strong>输出：</strong>1
<strong>解释：</strong>用 2 来替换 <code>5，之后</code> <code>arr1 = [1, 2, 3, 6, 7]</code>。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>arr1 = [1,5,3,6,7], arr2 = [4,3,1]
<strong>输出：</strong>2
<strong>解释：</strong>用 3 来替换 <code>5，然后</code>用 4 来替换 3<code>，得到</code> <code>arr1 = [1, 3, 4, 6, 7]</code>。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
<strong>输出：</strong>-1
<strong>解释：</strong>无法使 <code>arr1 严格递增</code>。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= arr1.length, arr2.length &lt;= 2000</code></li>
<li><code>0 &lt;= arr1[i], arr2[i] &lt;= 10^9</code></li>
</ul>




## 分析

arr1 首位有两种情况：
- 维持不变
- 从 arr2 中选一个来替代，显然越小越好，故选择 min(arr2)

假设首位选择了 x，第二位也有两种情况：
- 维持不变，注意必须满足 arr1[1] 大于 x
- 从 arr2 中选一个来替代，显然越小越好，故选择比 x 大且最小的那个数

因此，只要保存上一位选择的数，即可递归求解：
- 令 dfs(i,x) 代表 arr1[i-1] 选择了数 x 时，arr1[i:] 的最小操作数
- 能维持不变时，转为子问题 dfs(i+1,arr1[i])
- 能找到比 x 大且最小的数 arr2[j] 时，转为子问题 1+dfs(i+1,arr2[j])

为了快速找到 arr2[j]，可以先将 arr2 排序，然后每次二分查找即可。

## 解答


```python
def makeArrayIncreasing(self, arr1: List[int], arr2: List[int]) -> int:
	@cache
	def dfs(i, x):
		if i==len(arr1):
			return 0
		res = inf
		if arr1[i]>x:
			res = min(res, dfs(i+1, arr1[i]))
		j = bisect_right(arr2, x)
		if j<len(arr2):
			res = min(res, 1+dfs(i+1, arr2[j]))
		return res

	arr2.sort()
	res = dfs(0, -1)
	return res if res<inf else -1
```
724 ma

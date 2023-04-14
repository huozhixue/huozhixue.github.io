# 0440：字典序的第K小数字（★★）


> <u>**[力扣第 440 题](https://leetcode.cn/problems/k-th-smallest-in-lexicographical-order/)**</u>

## 题目

<p>给定整数 <code>n</code> 和 <code>k</code>，返回  <code>[1, n]</code> 中字典序第 <code>k</code> 小的数字。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>n = 13, k = 2
<strong>输出: </strong>10
<strong>解释: </strong>字典序的排列是 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]，所以第二小的数字是 10。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 1, k = 1
<strong>输出:</strong> 1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

字典序是先按首位排序，因此考虑先确定首位：
- 遍历 a 从 1 到 9，统计首位 x 且 <=n 的个数 w
- 如果 w<k，就更新 k-=w，继续遍历
- 如果 w>=k，即说明首位是当前的 a

接着考虑第二位：
- 如果 k 已经变为 1，说明 a 即为所求，无需再遍历
- 否则，先排除 a，更新 k-=1
- 继续遍历 b 从 0 到 9，统计前两位是 ab 且 <= n 的个数。后面依此类推

## 解答


```python
def findKthNumber(self, n: int, k: int) -> int:
	def cal(pre):
		w, ma = 0, 1
		while pre <= n:
			w += min(ma, n-pre+1)
			ma *= 10
			pre *= 10
		return w

	res = 1
	while k>1:
		w = cal(res)
		if w < k:
			k -= w
			res += 1
		else:
			k -= 1
			res *= 10
	return res
```
32 ms

# 1072：按列翻转得到最大值等行数（★）


> <u>**[力扣第 139 场周赛第 2 题](https://leetcode.cn/problems/flip-columns-for-maximum-number-of-equal-rows/)**</u>

## 题目

<p>给定 <code>m x n</code> 矩阵 <code>matrix</code> 。</p>

<p>你可以从中选出任意数量的列并翻转其上的 <strong>每个 </strong>单元格。（即翻转后，单元格的值从 <code>0</code> 变成 <code>1</code>，或者从 <code>1</code> 变为 <code>0</code> 。）</p>

<p>返回 <em>经过一些翻转后，行与行之间所有值都相等的最大行数</em> 。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[0,1],[1,1]]
<strong>输出：</strong>1
<strong>解释：</strong>不进行翻转，有 1 行所有值都相等。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[0,1],[1,0]]
<strong>输出：</strong>2
<strong>解释：</strong>翻转第一列的值之后，这两行都由相等的值组成。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>matrix = [[0,0,0],[0,0,1],[1,1,0]]
<strong>输出：</strong>2
<strong>解释：</strong>翻转前两列的值之后，后两行由相等的值组成。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == matrix.length</code></li>
<li><code>n == matrix[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 300</code></li>
<li><code>matrix[i][j] == 0</code> 或 <code>1</code></li>
</ul>


## 分析

假设翻转一些列后，行 r 变为全等，那么只有和 r 完全相同或刚好每位都与 r 相反的 r‘，才能也变为全等。

因此，将 r 和 r’ 中较大的作为 key，统计出现最多的次数即可。

## 解答


```python
def maxEqualRowsAfterFlips(self, matrix: List[List[int]]) -> int:
	ct = Counter()
	for row in matrix:
		key = tuple(row) if row[0] else tuple(x^1 for x in row)
		ct[key] += 1
	return max(ct.values())
```
128 ms

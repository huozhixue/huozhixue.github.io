# 1424：对角线遍历 II（★★）


> <u>**[力扣第 186 场周赛第 3 题](https://leetcode.cn/problems/diagonal-traverse-ii/)**</u>

## 题目

<p>给你一个列表 <code>nums</code> ，里面每一个元素都是一个整数列表。请你依照下面各图的规则，按顺序返回 <code>nums</code> 中对角线上的整数。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/23/sample_1_1784.png" style="height: 143px; width: 158px;"></strong></p>

<pre><strong>输入：</strong>nums = [[1,2,3],[4,5,6],[7,8,9]]
<strong>输出：</strong>[1,4,2,7,5,3,8,6,9]
</pre>

<p><strong>示例 2：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/23/sample_2_1784.png" style="height: 177px; width: 230px;"></strong></p>

<pre><strong>输入：</strong>nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
<strong>输出：</strong>[1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [[1,2,3],[4],[5,6,7],[8],[9,10,11]]
<strong>输出：</strong>[1,4,2,5,3,8,6,9,7,10,11]
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>nums = [[1,2,3,4,5,6]]
<strong>输出：</strong>[1,2,3,4,5,6]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10^5</code></li>
<li><code>1 &lt;= nums[i].length &lt;= 10^5</code></li>
<li><code>1 &lt;= nums[i][j] &lt;= 10^9</code></li>
<li><code>nums</code> 中最多有 <code>10^5</code> 个数字。</li>
</ul>


## 分析

### #1

类似 0498 ，可以先保存每一条对角线的列表，然后再拼接。

一开始遍历 nums 可以反向遍历行，最终拼接时就无需再反转了。

```python
def findDiagonalOrder(self, nums: List[List[int]]) -> List[int]:
	m, n = len(nums), len(nums) and max(map(len, nums))
	tmp = [[] for _ in range(m+n-1)]
	for i in range(m-1, -1, -1):
		for j in range(len(nums[i])):
			tmp[i+j].append(nums[i][j])
	res = []
	for i, diag in enumerate(tmp):
		res.extend(diag)
	return res
```

180 ms

### #2

还有种巧妙的方法，将所有元素按 (i+j, j) 排序即可。


## 解答

```python
def findDiagonalOrder(self, nums: List[List[int]]) -> List[int]:
	return [t[-1] for t in sorted((i+j, j, num) for i, row in enumerate(nums) for j, num in enumerate(row))]
```

184 ms



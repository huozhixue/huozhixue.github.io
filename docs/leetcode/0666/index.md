# 0666：路径总和 IV（★）


> <u>**[力扣第 666 题](https://leetcode.cn/problems/path-sum-iv/)**</u>

## 题目

<p>对于一棵深度小于 <code>5</code> 的树，可以用一组三位十进制整数来表示。对于每个整数：</p>

<ul>
<li>百位上的数字表示这个节点的深度 <code>d</code>，<code>1 &lt;= d &lt;= 4</code>。</li>
<li>十位上的数字表示这个节点在当前层所在的位置 <code>P</code>， <code>1 &lt;= p &lt;= 8</code>。位置编号与一棵满二叉树的位置编号相同。</li>
<li>个位上的数字表示这个节点的权值 <code>v</code>，<code>0 &lt;= v &lt;= 9</code>。</li>
</ul>

<p>给定一个包含三位整数的 <strong>升序 </strong>数组 <code>nums</code> ，表示一棵深度小于 <code>5</code> 的二叉树，请你返回 <em>从根到所有叶子结点的路径之和 </em>。</p>

<p><strong>保证 </strong>给定的数组表示一个有效的连接二叉树。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/30/pathsum4-1-tree.jpg" /></p>

<pre>
<strong>输入:</strong> nums = [113, 215, 221]
<strong>输出:</strong> 12
<strong>解释:</strong> 列表所表示的树如上所示。
路径和 = (3 + 5) + (3 + 1) = 12.
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/30/pathsum4-2-tree.jpg" /></p>

<pre>
<strong>输入:</strong> nums = [113, 221]
<strong>输出:</strong> 4
<strong>解释:</strong> 列表所表示的树如上所示。
路径和 = (3 + 1) = 4.
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 15</code></li>
<li><code>110 &lt;= nums[i] &lt;= 489</code></li>
<li><code>nums</code> 表示深度小于 <code>5</code> 的有效二叉树</li>
</ul>


## 分析

遍历并递推每个节点到根的路径和，并标记非叶子节点。最后求和即可。

## 解答

```python
def pathSum(self, nums: List[int]) -> int:
	res, deg = defaultdict(int), defaultdict(int)
	for x in nums:
		d,p,v = map(int,str(x))
		p -= 1
		res[(d,p)] = res[(d-1,p//2)]+v
		deg[(d-1,p//2)] += 1
	return sum(w for x,w in res.items() if not deg[x])
```
32 ms

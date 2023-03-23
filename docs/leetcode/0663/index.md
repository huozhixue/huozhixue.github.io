# 0663：均匀树划分（★）


> <u>**[力扣第 663 题](https://leetcode.cn/problems/equal-tree-partition/)**</u>

## 题目

<p>给定一棵有 <code>n</code> 个结点的二叉树，你的任务是检查是否可以通过去掉树上的一条边将树分成两棵，且这两棵树结点之和相等。</p>

<p><strong>样例 1:</strong></p>

<pre><strong>输入:</strong>
5
/ \
10 10
/  \
2   3

<strong>输出:</strong> True
<strong>解释:</strong>
5
/
10

和: 15

10
/  \
2    3

和: 15
</pre>



<p><strong>样例 2:</strong></p>

<pre><strong>输入:</strong>
1
/ \
2  10
/  \
2   20

<strong>输出:</strong> False
<strong>解释:</strong> 无法通过移除一条树边将这棵树划分成结点之和相等的两棵子树。
</pre>



<p><strong>注释 :</strong></p>

<ol>
<li>树上结点的权值范围 [-100000, 100000]。</li>
<li>1 &lt;= n &lt;= 10000</li>
</ol>




## 分析

等价于找一个非根节点，其子树和是整个树之和的一半。

因此深搜返回子树和并记录即可。注意根节点不能算。

## 解答


```python
def checkEqualTree(self, root) -> bool:
	def dfs(node):
		if not node:
			return 0
		s = node.val+dfs(node.left)+dfs(node.right)
		if node is not root:
			vis.add(s)
		return s
	
	vis = set()
	total = dfs(root)
	return total/2 in vis
```

时间 O(N)，68 ms

# 0776：拆分二叉搜索树（★★）


> <u>**[力扣第 776 题](https://leetcode.cn/problems/split-bst/)**</u>

## 题目

<p>给你一棵二叉搜索树（BST）的根结点 <code>root</code> 和一个整数 <code>target</code> 。请将该树按要求拆分为两个子树：其中一个子树结点的值都必须小于等于给定的目标值；另一个子树结点的值都必须大于目标值；树中并非一定要存在值为 <code>target</code> 的结点。</p>

<p>除此之外，树中大部分结构都需要保留，也就是说原始树中父节点 <code>p</code> 的任意子节点 <code>c</code> ，假如拆分后它们仍在同一个子树中，那么结点 <code>p</code> 应仍为 <code>c</code> 的父结点。</p>

<p>返回 <em>两个子树的根结点的数组</em> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/13/split-tree.jpg" style="height: 193px; width: 600px;" /></p>

<pre>
<strong>输入：</strong>root = [4,2,6,1,3,5,7], target = 2
<strong>输出：</strong>[[2,1],[4,3,6,null,null,5,7]]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> root = [1], target = 1
<strong>输出:</strong> [[1],[]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>二叉搜索树节点个数在 <code>[1, 50]</code> 范围内</li>
<li><code>0 &lt;= Node.val, target &lt;= 1000</code></li>
</ul>


## 分析

按根节点是否大于 target 递归即可。

## 解答

```python
def splitBST(self, root: Optional[TreeNode], target: int) -> List[Optional[TreeNode]]:
	def dfs(node):
		if not node:
			return [None,None]
		if node.val<=target:
			l,r = dfs(node.right)
			node.right=l
			return [node,r]
		l,r = dfs(node.left)
		node.left = r
		return [l, node]

	return dfs(root)
```
48 ms

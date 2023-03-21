# 0543：二叉树的直径


> <u>**[力扣第 543 题](https://leetcode.cn/problems/diameter-of-binary-tree/)**</u>

## 题目

<p>给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。</p>



<p><strong>示例 :</strong><br>
给定二叉树</p>

<pre>          1
/ \
2   3
/ \
4   5
</pre>

<p>返回 <strong>3</strong>, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。</p>



<p><strong>注意：</strong>两结点之间的路径长度是以它们之间边的数目表示。</p>


## 分析

假设路径经过根节点 root，那么最大长度是 （终点为 root.left 的最大路径长度 + 终点为 root.right 的最大路径长度 + 2）。

为了递归，令辅助函数 help(node) 同时返回 node 的直径长度、向上的终点为 node 的最大路径长度。

再注意下边界条件即可。

## 解答

```python
def diameterOfBinaryTree(self, root: TreeNode) -> int:
	def help(node):
		if not node:
			return -1, -1
		l0, l1 = help(node.left)
		r0, r1 = help(node.right)
		return max(l0, r0, l1+r1+2), 1+max(l1, r1)
	return help(root)[0]
```

52 ms

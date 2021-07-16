# 0404：左叶子之和（★）


第  场周赛第  题

## 题目

计算给定二叉树的所有左叶子之和。

 <!--more--> 

示例：

		3
	   / \
	  9  20
		/  \
	   15   7

	在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 



## 分析

遍历时标记节点是左孩子还是右孩子即可。也可以用递归。

## 解答

```python
def sumOfLeftLeaves(self, root: TreeNode) -> int:
	res, stack = 0, [(root, 1)]
	while stack:
		node, flag = stack.pop()
		if node:
			if not node.left and not node.right and flag == 0:
				res += node.val
			stack.extend([(node.left, 0), (node.right, 1)])
	return res
```

52 ms

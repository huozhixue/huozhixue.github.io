# 0107：二叉树的层序遍历 II（★）


## 题目

给定一个二叉树，返回其节点值自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

<!--more--> 

例如：

给定二叉树 [3,9,20,null,null,15,7],

		3
	   / \
	  9  20
		/  \
	   15   7
	   
返回其自底向上的层序遍历为：

	[
	  [15,7],
	  [9,20],
	  [3]
	]

## 分析

将 {{< lc "0102" >}} 的结果反序即可。

## 解答

```python
def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
	if not root:
		return []
	res, level = [], [root]
	while level:
		res.append([node.val for node in level])
		level = [child for node in level for child in [node.left, node.right] if child]
	return res[::-1]
```

36 ms


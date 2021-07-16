# 0257：二叉树的所有路径（★）


## 题目

给定一个二叉树，返回所有从根节点到叶子节点的路径。

说明: 叶子节点是指没有子节点的节点。

<!--more--> 

示例:

	输入:

	   1
	 /   \
	2     3
	 \
	  5

	输出: ["1->2->5", "1->3"]

	解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3

## 分析

遍历并保存当前路径，遍历到叶子时添加到结果即可。

## 解答

```python
def binaryTreePaths(self, root: TreeNode) -> List[str]:
	res, stack = [], [(root, '')]
	while stack:
		node, tmp = stack.pop()
		if node:
			tmp += ('->' if tmp else '') + str(node.val)
			if not node.left and not node.right:
				res.append(tmp)
			stack.extend([(node.right, tmp), (node.left, tmp)])
	return res
```

36 ms

# 0098：验证二叉搜索树（★）


## 题目

给定一个二叉树，判断其是否是一个有效的二叉搜索树。

假设一个二叉搜索树具有如下特征：

- 节点的左子树只包含小于当前节点的数。
- 节点的右子树只包含大于当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

<!--more--> 

示例 1:

	输入:
		2
	   / \
	  1   3
	输出: true
	
示例 2:

	输入:
		5
	   / \
	  1   4
	     / \
	    3   6
	输出: false
	解释: 输入为: [5,1,4,null,null,3,6]。
	     根节点的值为 5 ，但是其右子节点值为 4 。


## 分析

有效的二叉搜索树等价于其中序遍历的节点值是递增的，所以中序遍历加个判断即可。

## 解答

```python
def isValidBST(self, root: TreeNode) -> bool:
	pre, stack = float('-inf'), [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			if node <= pre:
				return False
			pre = node
		elif node:
			stack.extend([node.right, node.val, node.left])
	return True
```

52 ms


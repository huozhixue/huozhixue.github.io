# 0226：翻转二叉树（★）


## 题目

翻转一棵二叉树。

<!--more--> 

示例：

	输入：

		 4
	   /   \
	  2     7
	 / \   / \
	1   3 6   9
	输出：

		 4
	   /   \
	  7     2
	 / \   / \
	9   6 3   1


## 分析

递归翻转即可。

## 解答

```python
def invertTree(self, root: TreeNode) -> TreeNode:
	if not root:
		return None
	root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
	return root

```

36 ms

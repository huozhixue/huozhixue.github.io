# 0226：翻转二叉树（★）


## 题目

给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

	输入：root = [4,2,7,1,3,6,9]
	输出：[4,7,2,9,6,3,1]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

	输入：root = [2,1,3]
	输出：[2,3,1]

示例 3：

	输入：root = []
	输出：[]
	 

提示：
- 树中节点数目范围在 [0, 100] 内
- -100 <= Node.val <= 100


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
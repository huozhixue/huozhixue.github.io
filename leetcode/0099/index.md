# 0099：恢复二叉搜索树（★★★）


## 题目

给你二叉搜索树的根节点 root ，该树中的两个节点被错误地交换。请在不改变其结构的情况下，恢复这棵树。

使用 O(n) 空间复杂度的解法很容易实现。你能想出一个只使用常数空间的解决方案吗？

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/28/recover1.jpg)

	输入：root = [1,3,null,null,2]
	输出：[3,1,null,null,2]
	解释：3 不能是 1 左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/28/recover2.jpg)

	输入：root = [3,1,4,null,null,2]
	输出：[2,1,4,null,null,3]
	解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。

## 分析

二叉搜索树等价于其中序遍历的节点值是递增的，所以可以遍历找到两个错误的节点，然后交换。

假设中序遍历对应的数组为 A，那么必然是两种情况之一：

- 有两个位置 x、y，使得 $A_i > A_{i+1}$，错误的节点是 $A_x 和 A_{y+1}$
- 只有一个位置 x，使得 $A_i > A_{i+1}$，错误的节点是 $A_x 和 A_{x+1}$

因此中序遍历找到一个或两个位置即可。


## 解答

```python
def recoverTree(self, root: TreeNode) -> None:
	"""
	Do not return anything, modify root in-place instead.
	"""
	pre, stack = TreeNode(float('-inf')), [(root, 0)]
	x, y = None, None
	while stack:
		node, flag = stack.pop()
		if flag:
			if node.val < pre.val:
				x, y = x if x else pre, node
			pre = node
		elif node:
			stack.extend([(node.right, 0), (node, 1), (node.left, 0)])
	x.val, y.val = y.val, x.val
```

68 ms

## *附加

上述解法还是用了栈的空间，要真正实现常数空间需要用 {{< link "Morris 中序遍历" 
"https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/">}}

Morris 遍历减少了空间但也增加了时间，一般不用。

```python
def recoverTree(self, root: TreeNode) -> None:
	"""
	Do not return anything, modify root in-place instead.
	"""
	pre, node = TreeNode(float('-inf')), root
	x, y = None, None
	while node:
		if node.left:
			predecessor = node.left
			while predecessor.right and predecessor.right != node:
				predecessor = predecessor.right
			if not predecessor.right:			
				predecessor.right = node
				node = node.left
			else:
				predecessor.right = None
				if node.val < pre.val:
					x, y = x if x else pre, node
				pre = node
				node = node.right
		else: 
			if node.val < pre.val:
				x, y = x if x else pre, node
			pre = node
			node = node.right
	x.val, y.val = y.val, x.val
```

76 ms

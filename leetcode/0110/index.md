# 0110：平衡二叉树（★）


## 题目

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg)

	输入：root = [3,9,20,null,null,15,7]
	输出：true
示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg)

	输入：root = [1,2,2,3,3,null,null,4,4]
	输出：false

示例 3：

	输入：root = []
	输出：true


## 分析

### #1

可以用辅助函数 help(node) 代表 node 的深度。那么 root 是高度平衡的二叉树等价于 
abs(help(root.left)-help(root.right)) <= 1 且左右子树都是高度平衡二叉树。

help(node) 也可以递归得到。


```python
def isBalanced(self, root: TreeNode) -> bool:
	def help(root):
		return 0 if not root else max(help(root.left), help(root.right))+1
		
	if not root:
		return True      
	return abs(help(root.left)-help(root.right))<=1 and self.isBalanced(root.left) and self.isBalanced(root.right) 
```

76 ms

### #2

还有个巧妙的想法。求 node 的深度时，如果已经知道 node 不是高度平衡二叉树，可以直接返回异常值，
一层层跳出，无需再考虑其它节点。

所以调用 help(root) 求 root 的深度，判断是否返回异常值即可。异常值可以取 -1。

## 解答

```python
def isBalanced(self, root: TreeNode) -> bool:
	def help(root):
		if not root:
			return 0
		a, b = help(root.left), help(root.right)
		return -1 if a == -1 or b == -1 or abs(a-b)>1 else max(a, b) + 1
	return help(root) != -1
```

56 ms


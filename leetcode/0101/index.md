# 0101：对称二叉树（★）


## 题目

给定一个二叉树，检查它是否是镜像对称的。

你可以运用递归和迭代两种方法解决这个问题吗？

<!--more--> 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

		1
	   / \
	  2   2
	 / \ / \
	3  4 4  3
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

		1
	   / \
	  2   2
	   \   \
	   3    3



## 分析

### #1

先考虑递归。问题相当于判断左子树和右子树是否镜像对称。用辅助函数 help(p, 1) 代表 p 和 q 两棵树是否镜像对称。
则 p 和 q 镜像对称等价于 p.val == q.val and help(p.left, q.right) and help(p.right, q.left)。

再考虑下边界情况即可。

```python
def isSymmetric(self, root: TreeNode) -> bool:
	def help(p, q):
		if not p and not q:
			return True
		if not p or not q or p.val != q.val:
			return False
		return help(p.left, q.right) and help(p.right, q.left)
	return help(root.left, root.right) if root else True
```

36 ms

### #2

再考虑迭代解法，与 {{< lc "0100" >}} 类似，只是换成了交叉比较，入栈顺序处理下即可。

## 解答

```python
def isSymmetric(self, root: TreeNode) -> bool:
	stack1, stack2 = [root], [root]
	while stack1:
		p, q = stack1.pop(), stack2.pop()
		if not p and not q:
			continue
		if not p or not q or p.val != q.val:
			return False
		stack1.extend([p.right, p.left])
		stack2.extend([q.left, q.right])
	return True
```

40 ms


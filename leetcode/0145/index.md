# 0145：二叉树的后序遍历（★）


## 题目

给定一个二叉树，返回它的 后序 遍历。

递归算法很简单，你可以通过迭代算法完成吗？

<!--more--> 

示例:

	输入: [1,null,2,3]  
	   1
		\
		 2
		/
	   3 

	输出: [3,2,1]


## 分析

### #1

先写出递归算法，显然，将左子树的后序遍历、右子树的后序遍历、根节点拼接起来即可。

```python
def postorderTraversal(self, root: TreeNode) -> List[int]:
	return self.postorderTraversal(root.left)+self.postorderTraversal(root.right)+[root.val] if root else []
```

36 ms

### #2

迭代算法和 0094 类似，入栈顺序换成 [节点值、右子树、左子树] 即可。

## 解答

```python
def postorderTraversal(self, root: TreeNode) -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res.append(node)
		elif node:
			stack.extend([node.val, node.right, node.left])
	return res
```

40 ms


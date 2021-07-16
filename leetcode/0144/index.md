# 0144：二叉树的前序遍历（★）


## 题目

给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

递归算法很简单，你可以通过迭代算法完成吗？

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

	输入：root = [1,null,2,3]
	输出：[1,2,3]
	
示例 2：

	输入：root = []
	输出：[]
	
示例 3：

	输入：root = [1]
	输出：[1]
	
示例 4：

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

	输入：root = [1,2]
	输出：[1,2]
	
示例 5：

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)

	输入：root = [1,null,2]
	输出：[1,2]


## 分析

### #1

先写出递归算法，显然，将根节点、左子树的前序遍历、右子树的前序遍历拼接起来即可。

```python
def preorderTraversal(self, root: TreeNode) -> List[int]:
	return [root.val]+self.preorderTraversal(root.left)+self.preorderTraversal(root.right) if root else []
```

40 ms

### #2

迭代算法和 0094 类似，入栈顺序换成 [右子树、左子树] ，节点值不需入栈直接输出即可。

## 解答

```python
def preorderTraversal(self, root: TreeNode) -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if node:
			res.append(node.val)
			stack.extend([node.right, node.left])
	return res
```

32 ms


# 0145：二叉树的后序遍历（★）


## 题目

给你一棵二叉树的根节点 root ，返回其节点值的 后序遍历 。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg)

	输入：root = [1,null,2,3]
	输出：[3,2,1]

示例 2：

	输入：root = []
	输出：[]

示例 3：

	输入：root = [1]
	输出：[1]
 

提示：
- 树中节点的数目在范围 [0, 100] 内
- -100 <= Node.val <= 100



## 分析

### #1

先写出递归算法，显然，将左子树的后序遍历、右子树的后序遍历、根节点拼接起来即可。

```python
def postorderTraversal(self, root: TreeNode) -> List[int]:
	return self.postorderTraversal(root.left)+self.postorderTraversal(root.right)+[root.val] if root else []
```

36 ms

### #2

迭代算法类似 {{< lc "0094" >}}，入栈顺序换成 [节点值、右子树、左子树] 即可。

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


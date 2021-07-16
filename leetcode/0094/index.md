# 0094：二叉树的中序遍历（★）


## 题目

给定一个二叉树的根节点 root ，返回它的 中序 遍历。

递归算法很简单，你可以通过迭代算法完成吗？

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

	输入：root = [1,null,2,3]
	输出：[1,3,2]
	
示例 2：

	输入：root = []
	输出：[]
	
示例 3：

	输入：root = [1]
	输出：[1]
	
示例 4：

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

	输入：root = [1,2]
	输出：[2,1]
	
示例 5：

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)

	输入：root = [1,null,2]
	输出：[1,2]


## 分析


### #1

先写出递归算法，显然，将左子树的中序遍历、根节点、右子树的中序遍历拼接起来即可。

```python
def inorderTraversal(self, root: TreeNode) -> List[int]:
	return self.inorderTraversal(root.left) + [root.val] + self.inorderTraversal(root.right) if root else []
```

40 ms

### #2

可以借助栈改写成迭代算法。初始栈保存根节点，每一轮出栈栈顶的节点，再按 [右子树、节点、左子树] 顺序入栈，
如果栈顶节点是第二次出栈，即说明其左子树已经遍历完，应该将节点值添加到结果中。依此循环直到栈空即遍历完毕。

判断节点是否二次出栈，可以用入栈时带一个标志位的方法。还有个更简单的方法，节点第一次出栈时按 
[右子树、节点值、左子树] 顺序入栈，直接保存节点值。这样只要判断出栈的数据类型即可。

## 解答

```python
def inorderTraversal(self, root: TreeNode) -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res.append(node)
		elif node:
			stack.extend([node.right, node.val, node.left])
	return res
```

32 ms


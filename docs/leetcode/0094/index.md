# 0094：二叉树的中序遍历（★）


## 题目

给定一个二叉树的根节点 root ，返回它的 中序 遍历。

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
	
提示：
- 树中节点数目在范围 [0, 100] 内
- -100 <= Node.val <= 100


## 分析

### #1

先写出递归算法，显然，将左子树的中序遍历、根节点、右子树的中序遍历拼接起来即可。

```python
def inorderTraversal(self, root: TreeNode) -> List[int]:
	return self.inorderTraversal(root.left) + [root.val] + self.inorderTraversal(root.right) if root else []
```
40 ms

### #2

可以借助栈改写成迭代算法。
- 初始栈保存根节点
- 每轮出栈，如果是节点，按 [右子树、节点值、左子树] 顺序入栈
- 如果出栈的是节点值，说明其左子树已经遍历完，将节点值添加到结果中
- 依此循环直到栈空即遍历完毕

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


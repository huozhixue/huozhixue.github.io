# 0590：N叉树的后序遍历（★）


## 题目

给定一个 N 叉树，返回其节点值的后序遍历。

例如，给定一个 3叉树 :

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/narytreeexample.png)

返回其后序遍历: [5,6,3,2,4,1]

递归算法很简单，你可以通过迭代算法完成吗？

<!--more--> 


## 分析

### #1

先写出递归算法，显然，将每个子树的后序遍历、根节点拼接起来即可。

```python
def postorder(self, root: 'Node') -> List[int]:
	if not root:
		return []
	res = []
	if root.children:
		for child in root.children:
			res.extend(self.postorder(child))
	return res + [root.val]
```

52 ms

### #2

迭代算法和 0144 类似，注意入栈顺序是 [节点值，子树的反序]。

## 解答

```python
def postorder(self, root: 'Node') -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res.append(node)
		elif node:
			stack.append(node.val)
			if node.children:
				stack.extend(node.children[::-1])
	return res
```

56 ms


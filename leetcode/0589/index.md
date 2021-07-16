# 0589：N叉树的前序遍历


## 题目

给定一个 N 叉树，返回其节点值的前序遍历。

例如，给定一个 3叉树 :

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/narytreeexample.png)

返回其前序遍历: [1,3,5,6,2,4]。

递归算法很简单，你可以通过迭代算法完成吗？

<!--more--> 


## 分析

### #1

先写出递归算法，显然，将根节点、每个子树的前序遍历拼接起来即可。

```python
def preorder(self, root: 'Node') -> List[int]:
	if not root:
		return []
	res = [root.val]
	if root.children:
		for child in root.children:
			res.extend(self.preorder(child))
	return res
```

56 ms

### #2

迭代算法和 0144 类似，注意入栈顺序是子树的反序。

## 解答

```python
def preorder(self, root: 'Node') -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if node:
			res.append(node.val)
			if node.children:
				stack.extend(node.children[::-1])
	return res
```

52 ms


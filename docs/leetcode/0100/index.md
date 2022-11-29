# 0100：相同的树（★）


## 题目

给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg)

	输入：p = [1,2,3], q = [1,2,3]
	输出：true
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg)

	输入：p = [1,2], q = [1,null,2]
	输出：false
	
示例 3：

![img](https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg)

	输入：p = [1,2,1], q = [1,1,2]
	输出：false

提示：
- 两棵树上的节点数目都在范围 [0, 100] 内
- -10^4 <= Node.val <= 10^4

## 分析

### #1

显然两个二叉树相同等价于根节点、左子树、右子树都相同，容易写出递归解法。

```python
def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
    if not p or not q:
        return not p and not q
    return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```
28 ms

### #2

也可以用迭代。

遍历一遍二叉树，如果每一步经过的节点都相同，那么两个二叉树相同。

为了方便，这里用前序遍历。

## 解答

```python
def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
	stack1, stack2 = [p], [q]
	while stack1:
		p, q = stack1.pop(), stack2.pop()
		if not p and not q:
			continue
		if not p or not q or p.val != q.val:
			return False
		stack1.extend([p.right, p.left])
		stack2.extend([q.right, q.left])
	return True
```
28 ms


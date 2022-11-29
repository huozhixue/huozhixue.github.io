# 0235：二叉搜索树的最近公共祖先（★）


## 题目

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，
满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/binarysearchtree_improved.png)
 
示例 1:

	输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
	输出: 6 
	解释: 节点 2 和节点 8 的最近公共祖先是 6。

示例 2:

	输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
	输出: 2
	解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
	
说明:
- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉搜索树中。

## 分析

### #1

由 root 和 p、q 的大小关系可以分类讨论：
- 如果 root 比 p、q 的值都大，结果必然在 root 的左子树中。
- 如果 root 比 p、q 的值都小，结果必然在 root 的右子树中。
- 如果 root 在 p、q 的值之间，结果就是 root

于是可以递归解决。

```python
def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
	if root.val > max(p.val, q.val):
		return self.lowestCommonAncestor(root.left, p, q)
	if root.val < min(p.val, q.val):
		return self.lowestCommonAncestor(root.right, p, q)
	return root
```
92 ms

### #2

也可以写成迭代的形式。

## 解答

```python
def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
	while root:
		if root.val > max(p.val, q.val):
			root = root.left
		elif root.val < min(p.val, q.val):
			root = root.right
		else:
			return root
```
92 ms

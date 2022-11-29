# 0098：验证二叉搜索树（★）


## 题目

给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：
- 节点的左子树只包含 小于 当前节点的数。
- 节点的右子树只包含 大于 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)

	输入：root = [2,1,3]
	输出：true
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)

	输入：root = [5,1,4,null,null,3,6]
	输出：false
	解释：根节点的值是 5 ，但是右子节点的值是 4 。

提示：
- 树中节点数目范围在[1, 10^4] 内
- -2^31 <= Node.val <= 2^31 - 1


## 分析

有效的二叉搜索树等价于其中序遍历的节点值是递增的，所以中序遍历加个判断即可。

## 解答

```python
def isValidBST(self, root: TreeNode) -> bool:
	pre, stack = float('-inf'), [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			if node <= pre:
				return False
			pre = node
		elif node:
			stack.extend([node.right, node.val, node.left])
	return True
```
52 ms

## *附加

也可以用递归。
- 如果 node 的左子树和右子树都是二叉搜索树，且左子树的数都小于 node.val，右子树的数都大于 node.val，
node 即为二叉搜索树
- 令 dfs(node, low, high) 代表 node 子树是否为 [low, high] 范围内的二叉搜索树，即可递归
- 初始无限制，所以 low/high 设为极小/大值

```python
def isValidBST(self, root: TreeNode) -> bool:
    def dfs(node, low, high):
        if not node:
            return True
        if not low<node.val<high:
            return False
        return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)

    return dfs(root, float('-inf'), float('inf'))
```
36 ms

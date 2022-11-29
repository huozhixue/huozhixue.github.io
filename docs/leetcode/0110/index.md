# 0110：平衡二叉树（★）


## 题目

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：
> 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg)

	输入：root = [3,9,20,null,null,15,7]
	输出：true
示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg)

	输入：root = [1,2,2,3,3,null,null,4,4]
	输出：false

示例 3：

	输入：root = []
	输出：true

提示：
- 树中的节点数在范围 [0, 5000] 内
- -10^4 <= Node.val <= 10^4

## 分析

用 dfs(node) 同时返回 node 是否平衡、node 的深度，即可递归。

为了方便，可以用深度为 -1 来代表不平衡，dfs(node) 返回 node 的深度即可。

## 解答

```python
def isBalanced(self, root: TreeNode) -> bool:
    def dfs(root):
        if not root:
            return 0
        l, r = dfs(root.left), dfs(root.right)
        return -1 if l==-1 or r==-1 or abs(l-r)>1 else 1+max(l, r)

    return dfs(root) != -1
```
52 ms


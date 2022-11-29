# 0104：二叉树的最大深度（★）


## 题目

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

        3
       / \
      9  20
        /  \
       15   7

返回它的最大深度 3 。


## 分析

### #1

层序遍历，记录有多少层即可。

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    res, Q = 0, [root] if root else []
    while Q:
        res += 1
        Q = [child for node in Q for child in [node.left, node.right] if child]
    return res
```
44 ms

### #2

也可以用递归。

## 解答

```python
def maxDepth(self, root: TreeNode) -> int:
	return 0 if not root else max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
```
48 ms


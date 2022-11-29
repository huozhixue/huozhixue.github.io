# 0112：路径总和（★）


## 题目

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，
这条路径上所有节点值相加等于目标和 targetSum 。

叶子节点 是指没有子节点的节点。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

	输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
	输出：true
	
示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

	输入：root = [1,2,3], targetSum = 5
	输出：false
	
示例 3：

	输入：root = [1,2], targetSum = 0
	输出：false

提示：
- 树中节点的数目在范围 [0, 5000] 内
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000


## 分析

### #1

令 dfs(p, x) 代表是否存在节点 p 到叶子节点的路径和为 x，即可递归。

```python
def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
    def dfs(p, x):
        if not p:
            return False
        if not p.left and not p.right:
            return p.val == x
        return dfs(p.left, x-p.val) or dfs(p.right, x-p.val)
    return dfs(root, targetSum)
```
40 ms

### #2

也可以遍历树，维护当前节点到根节点的路径和。遇到叶子节点时，判断是否满足即可。

## 解答

```python
def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
    stack = [(root, 0)]
    while stack:
        node, val = stack.pop()
        if node:
            val += node.val
            if not node.left and not node.right and val == targetSum:
                return True
            stack.extend([(node.right, val), (node.left,val)])
    return False
```
40 ms


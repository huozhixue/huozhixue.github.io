# 0124：二叉树中的最大路径和（★★）


## 题目

路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg)

	输入：root = [1,2,3]
	输出：6
	解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg)

	输入：root = [-10,9,20,null,null,15,7]
	输出：42
	解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42



## 分析

类似 {{< lc "0543" >}}，用辅助函数 help(node) 同时返回 node 的最大路径和，
向上的终点为 node 的最大路径和。即可递归。

## 解答

```python
def maxPathSum(self, root: TreeNode) -> int:
    def help(node):
        if not node:
            return float('-inf'), float('-inf')
        l0, l1 = help(node.left)
        r0, r1 = help(node.right)
        l1, r1 = max(0, l1), max(0, r1)
        return max(l0, r0, node.val + l1 + r1), node.val + max(l1, r1)
    return help(root)[0]
```

100 ms





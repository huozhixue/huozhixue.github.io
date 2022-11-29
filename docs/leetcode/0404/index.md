# 0404：左叶子之和（★）


> **第 6 场周赛第 1 题**

## 题目

给定二叉树的根节点 root ，返回所有左叶子之和。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg)
    
    输入: root = [3,9,20,null,null,15,7] 
    输出: 24 
    解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24

示例 2:

    输入: root = [1]
    输出: 0
     
提示:
- 节点数在 [1, 1000] 范围内
- -1000 <= Node.val <= 1000


## 分析

遍历时标记节点是左孩子还是右孩子即可。也可以用递归。

## 解答

```python
def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:
    res, stack = 0, [(root, 1)]
    while stack:
        node, flag = stack.pop()
        if node:
            if not node.left and not node.right and flag == 0:
                res += node.val
            stack.extend([(node.left, 0), (node.right, 1)])
    return res
```
36 ms

# 0107：二叉树的层序遍历 II（★）


## 题目
给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 
（即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

	输入：root = [3,9,20,null,null,15,7]
	输出：[[15,7],[9,20],[3]]

示例 2：

	输入：root = [1]
	输出：[[1]]

示例 3：

	输入：root = []
	输出：[]
 

提示：
- 树中节点数目在范围 [0, 2000] 内
- -1000 <= Node.val <= 1000


## 分析

将 {{< lc "0102" >}} 的结果反序即可。

## 解答

```python
def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
    res, Q = [], [root] if root else []
    while Q:
        res.append([node.val for node in Q])
        Q = [child for node in Q for child in [node.left, node.right] if child]
    return res[::-1]
```
32 ms


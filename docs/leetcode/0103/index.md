# 0103：二叉树的锯齿形层序遍历（★）


## 题目

给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，
再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

	输入：root = [3,9,20,null,null,15,7]
	输出：[[3],[20,9],[15,7]]

示例 2：

	输入：root = [1]
	输出：[[1]]

示例 3：

	输入：root = []
	输出：[]
 

提示：
- 树中节点数目在范围 [0, 2000] 内
- -100 <= Node.val <= 100


## 分析

{{< lc "0102" >}} 升级版，将奇数层的节点反序即可。

## 解答

```python
def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
    res, Q = [], [root] if root else []
    while Q:
        A = [node.val for node in Q]
        res.append(A[::-1] if len(res)%2 else A)
        Q = [child for node in Q for child in [node.left, node.right] if child]
    return res
```
32 ms


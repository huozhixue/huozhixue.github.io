# 0106：从中序与后序遍历序列构造二叉树（★★）


## 题目

给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历，
 postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。


示例 1:

![img](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

	输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
	输出：[3,9,20,null,null,15,7]

示例 2:

	输入：inorder = [-1], postorder = [-1]
	输出：[-1]
	
提示:
- 1 <= inorder.length <= 3000
- postorder.length == inorder.length
- -3000 <= inorder[i], postorder[i] <= 3000
- inorder 和 postorder 都由 不同 的值组成
- postorder 中每一个值都在 inorder 中
- inorder 保证是树的中序遍历
- postorder 保证是树的后序遍历

## 分析

类似 {{< lc "0105" >}}，只是从找 preorder[0] 变成了找 postorder[-1]。

## 解答

```python
def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
    def dfs(io, po):
        if not po:
            return None
        i = io.index(po[-1])
        return TreeNode(po[-1], dfs(io[:i], po[:i]), dfs(io[i+1:], po[i:-1]))
    return dfs(inorder, postorder)
```
112 ms

# 0105：从前序与中序遍历序列构造二叉树（★★）


## 题目

给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， 
inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。


示例 1:

![img](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

    Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
    Output: [3,9,20,null,null,15,7]

示例 2:
    
    Input: preorder = [-1], inorder = [-1]
    Output: [-1]
	
提示:
- 1 <= preorder.length <= 3000
- inorder.length == preorder.length
- -3000 <= preorder[i], inorder[i] <= 3000
- preorder 和 inorder 均无重复元素
- inorder 均出现在 preorder
- preorder 保证为二叉树的前序遍历序列
- inorder 保证为二叉树的中序遍历序列
 

## 分析

从上往下构造：
- 根节点即是 preorder[0]
- 在 inorder 中找到根节点位置 i，inorder[:i]、inorder[i+1:] 分别代表左/右子树
- 显然 preorder 和 inorder 中代表左子树的长度应该相等
- 那么 preorder[1:i+1]、preorder[i+1:] 分别代表左/右子树
- 然后可以对左/右子树递归

## 解答

```python
def buildTree(self, preorder: List[int], inorder: List[int]) -> TreeNode:
    def dfs(po, io):
        if not po:
            return None
        i = io.index(po[0])
        return TreeNode(po[0], dfs(po[1:i+1], io[:i]), dfs(po[i+1:], io[i+1:]))
    return dfs(preorder, inorder)
```
132 ms


# 0105：从前序与中序遍历序列构造二叉树（★）


> <u>**[力扣第 105 题](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**</u>

## 题目

<p>给定两个整数数组 <code>preorder</code> 和 <code>inorder</code> ，其中 <code>preorder</code> 是二叉树的<strong>先序遍历</strong>， <code>inorder</code> 是同一棵树的<strong>中序遍历</strong>，请构造二叉树并返回其根节点。</p>



<p><strong>示例 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree.jpg" style="height: 302px; width: 277px;" />
<pre>
<strong>输入</strong><strong>:</strong> preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
<strong>输出:</strong> [3,9,20,null,null,15,7]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> preorder = [-1], inorder = [-1]
<strong>输出:</strong> [-1]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= preorder.length &lt;= 3000</code></li>
<li><code>inorder.length == preorder.length</code></li>
<li><code>-3000 &lt;= preorder[i], inorder[i] &lt;= 3000</code></li>
<li><code>preorder</code> 和 <code>inorder</code> 均 <strong>无重复</strong> 元素</li>
<li><code>inorder</code> 均出现在 <code>preorder</code></li>
<li><code>preorder</code> <strong>保证</strong> 为二叉树的前序遍历序列</li>
<li><code>inorder</code> <strong>保证</strong> 为二叉树的中序遍历序列</li>
</ul>


**相似问题：**
- [0106：从中序与后序遍历序列构造二叉树](/leetcode/0106)


## 分析

- 根节点即是 preorder[0]
- 在 inorder 中找到根节点位置 i，inorder[:i]、inorder[i+1:] 分别代表左/右子树
- 显然 preorder 和 inorder 中代表左子树的长度应该相等
- 那么 preorder[1:i+1]、preorder[i+1:] 分别代表左/右子树
- 然后可以对左/右子树递归

## 解答

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        def dfs(A,B):
            if not A:
                return None
            i = B.index(A[0])
            return TreeNode(A[0],dfs(A[1:i+1],B[:i]),dfs(A[i+1:],B[i+1:]))
        return dfs(preorder,inorder)
```
140 ms


# 0106：从中序与后序遍历序列构造二叉树（★）


> <u>**[力扣第 106 题](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)**</u>

## 题目

<p>给定两个整数数组 <code>inorder</code> 和 <code>postorder</code> ，其中 <code>inorder</code> 是二叉树的中序遍历， <code>postorder</code> 是同一棵树的后序遍历，请你构造并返回这颗 <em>二叉树</em> 。</p>



<p><strong>示例 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree.jpg" />
<pre>
<b>输入：</b>inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
<b>输出：</b>[3,9,20,null,null,15,7]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>inorder = [-1], postorder = [-1]
<b>输出：</b>[-1]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= inorder.length &lt;= 3000</code></li>
<li><code>postorder.length == inorder.length</code></li>
<li><code>-3000 &lt;= inorder[i], postorder[i] &lt;= 3000</code></li>
<li><code>inorder</code> 和 <code>postorder</code> 都由 <strong>不同</strong> 的值组成</li>
<li><code>postorder</code> 中每一个值都在 <code>inorder</code> 中</li>
<li><code>inorder</code> <strong>保证</strong>是树的中序遍历</li>
<li><code>postorder</code> <strong>保证</strong>是树的后序遍历</li>
</ul>


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

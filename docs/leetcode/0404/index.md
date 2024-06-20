# 0404：左叶子之和


> <u>**[力扣第 404 题](https://leetcode.cn/problems/sum-of-left-leaves/)**</u>

## 题目

<p>给定二叉树的根节点 <code>root</code> ，返回所有左叶子之和。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg" /></p>

<pre>
<strong>输入:</strong> root = [3,9,20,null,null,15,7]
<strong>输出:</strong> 24
<strong>解释:</strong> 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> root = [1]
<strong>输出:</strong> 0
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>节点数在 <code>[1, 1000]</code> 范围内</li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>




## 分析

遍历时标记节点是左孩子还是右孩子即可。

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

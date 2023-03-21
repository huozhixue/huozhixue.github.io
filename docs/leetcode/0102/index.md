# 0102：二叉树的层序遍历（★）


> <u>**[力扣第 102 题](https://leetcode.cn/problems/binary-tree-level-order-traversal/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>层序遍历</strong> 。 （即逐层地，从左到右访问所有节点）。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg" style="width: 277px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[3],[9,20],[15,7]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[[1]]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[0, 2000]</code> 内</li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>


## 分析

迭代保存每层的节点即可。

## 解答

```python
def levelOrder(self, root: TreeNode) -> List[List[int]]:
    res, Q = [], [root] if root else []
    while Q:
        res.append([node.val for node in Q])
        Q = [child for node in Q for child in [node.left, node.right] if child]
    return res
```
36 ms


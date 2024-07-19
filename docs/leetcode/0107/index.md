# 0107：二叉树的层序遍历 II（★）


> <u>**[力扣第 107 题](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> ，返回其节点值 <strong>自底向上的层序遍历</strong> 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg" style="width: 277px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[15,7],[9,20],[3]]
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


**相似问题：**
- [0102：二叉树的层序遍历](/leetcode/0102)
- [0637：二叉树的层平均值](/leetcode/0637)


## 分析

将 {{< lc "0102" >}} 的结果反序即可。

## 解答

```python
class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        res,Q = [],[root] if root else []
        while Q:
            res.append([u.val for u in Q])
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res[::-1]
```
38 ms


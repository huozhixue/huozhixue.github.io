# 0104：二叉树的最大深度


> <u>**[力扣第 104 题](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)**</u>

## 题目

<p>给定一个二叉树 <code>root</code> ，返回其最大深度。</p>

<p>二叉树的 <strong>最大深度</strong> 是指从根节点到最远叶子节点的最长路径上的节点数。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg" style="width: 400px; height: 277px;" /></p>



<pre>
<b>输入：</b>root = [3,9,20,null,null,15,7]
<b>输出：</b>3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>root = [1,null,2]
<b>输出：</b>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数量在 <code>[0, 10<sup>4</sup>]</code> 区间内。</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>


## 分析

可以用递归，也可以用层序遍历。

## 解答

```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        res,Q = 0,[root] if root else []
        while Q:
            res += 1
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res
```
41 ms



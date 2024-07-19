# 0515：在每个树行中找最大值（★）


> <u>**[力扣第 515 题](https://leetcode.cn/problems/find-largest-value-in-each-tree-row/)**</u>

## 题目

<p>给定一棵二叉树的根节点 <code>root</code> ，请找出该二叉树中每一层的最大值。</p>



<p><strong>示例1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/08/21/largest_e1.jpg" style="height: 172px; width: 300px;" /></p>

<pre>
<strong>输入: </strong>root = [1,3,2,5,3,null,9]
<strong>输出: </strong>[1,3,9]
</pre>

<p><strong>示例2：</strong></p>

<pre>
<strong>输入: </strong>root = [1,2,3]
<strong>输出: </strong>[1,3]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>二叉树的节点个数的范围是 <code>[0,10<sup>4</sup>]</code></li>
<li><meta charset="UTF-8" /><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
</ul>






## 分析

层序遍历并取最大值即可。

## 解答

```python
class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        res,Q = [],[root] if root else []
        while Q:
            res.append(max(u.val for u in Q))
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res
```
60 ms

# 0513：找树左下角的值（★）


> <u>**[力扣第 513 题](https://leetcode.cn/problems/find-bottom-left-tree-value/)**</u>

## 题目

<p>给定一个二叉树的 <strong>根节点</strong> <code>root</code>，请找出该二叉树的 <strong>最底层 最左边 </strong>节点的值。</p>

<p>假设二叉树中至少有一个节点。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2020/12/14/tree1.jpg" style="width: 182px; " /></p>

<pre>
<strong>输入: </strong>root = [2,1,3]
<strong>输出: </strong>1
</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2020/12/14/tree2.jpg" style="width: 242px; " /><strong> </strong></p>

<pre>
<strong>输入: </strong>[1,2,3,4,null,5,6,null,null,7]
<strong>输出: </strong>7
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>二叉树的节点个数的范围是 <code>[1,10<sup>4</sup>]</code></li>
<li><meta charset="UTF-8" /><code>-2<sup>31</sup> <= Node.val <= 2<sup>31</sup> - 1</code> </li>
</ul>




## 分析

层序遍历并维护最左边的数即可。

## 解答

```python
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        res,Q = root.val,[root]
        while Q:
            res = Q[0].val
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res
```
42 ms


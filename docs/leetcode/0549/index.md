# 0549：二叉树中最长的连续序列（★）


> <u>**[力扣第 549 题](https://leetcode.cn/problems/binary-tree-longest-consecutive-sequence-ii/)**</u>

## 题目

<p>给定二叉树的根 <code>root</code> ，返回树中<strong>最长连续路径</strong>的长度。<br />
<strong>连续路径</strong>是路径中相邻节点的值相差 <code>1</code> 的路径。此路径可以是增加或减少。</p>

<ul>
<li>例如， <code>[1,2,3,4]</code> 和 <code>[4,3,2,1]</code> 都被认为有效，但路径 <code>[1,2,4,3]</code> 无效。</li>
</ul>

<p>另一方面，路径可以是子-父-子顺序，不一定是父子顺序。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/14/consec2-1-tree.jpg" /></p>

<pre>
<strong>输入: </strong>root = [1,2,3]
<strong>输出:</strong> 2
<strong>解释:</strong> 最长的连续路径是 [1, 2] 或者 [2, 1]。
</pre>



<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/14/consec2-2-tree.jpg" /></p>

<pre>
<strong>输入: </strong>root = [2,1,3]
<strong>输出:</strong> 3
<strong>解释:</strong> 最长的连续路径是 [1, 2, 3] 或者 [3, 2, 1]。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树上所有节点的值都在 <code>[1, 3 * 10<sup>4</sup>]</code> 范围内。</li>
<li><code>-3 * 10<sup>4</sup> &lt;= Node.val &lt;= 3 * 10<sup>4</sup></code></li>
</ul>


## 分析

## 解答

```python
    def longestConsecutive(self, root: TreeNode) -> int:
        def help(node):
            if not node:
                return 0, 0, 0
            l1, l2, l3 = help(node.left)
            r1, r2, r3 = help(node.right)
            a = l2 + 1 if node.left and node.left.val==node.val+1 else 1
            b = r2 + 1 if node.right and node.right.val==node.val+1 else 1
            c = l3 + 1 if node.left and node.left.val==node.val-1 else 1
            d = r3 + 1 if node.right and node.right.val==node.val-1 else 1
            return max(l1, r1, a+d-1, b+c-1), max(a, b), max(c, d)
        return help(root)[0]
```

52 ms

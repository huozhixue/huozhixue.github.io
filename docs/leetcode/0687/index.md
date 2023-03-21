# 0687：最长同值路径（★）


> <u>**[力扣第 52 场双周赛第 2 题](https://leetcode.cn/problems/longest-univalue-path/)**</u>

## 题目

<p>给定一个二叉树的<meta charset="UTF-8" /> <code>root</code> ，返回 <em>最长的路径的长度</em> ，这个路径中的 <em>每个节点具有相同值</em> 。 这条路径可以经过也可以不经过根节点。</p>

<p><strong>两个节点之间的路径长度</strong> 由它们之间的边数表示。</p>



<p><strong>示例 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/ex1.jpg" /></p>

<pre>
<strong>输入：</strong>root = [5,4,5,1,1,5]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/ex2.jpg" /></p>

<pre>
<strong>输入：</strong>root = [1,4,5,4,4,5]
<strong>输出：</strong>2
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>树的节点数的范围是<meta charset="UTF-8" /> <code>[0, 10<sup>4</sup>]</code> </li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
<li>树的深度将不超过 <code>1000</code> </li>
</ul>


## 分析

类似 {{< lc "0543" >}} 用辅助函数 help(node) 同时返回 node 的最长同值路径，
向上的终点为 node 的最长同值路径。即可递归。

## 解答

```python
def longestUnivaluePath(self, root: TreeNode) -> int:
    def help(root):
        if not root:
            return 0, 0
        l0, l1 = help(root.left)
        r0, r1 = help(root.right)
        l1 = l1 + 1 if root.left and root.left.val == root.val else 0
        r1 = r1 + 1 if root.right and root.right.val == root.val else 0
        return max(l0, r0, l1+r1), max(l1, r1)
    return help(root)[0]
```

384 ms


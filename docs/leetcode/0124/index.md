# 0124：二叉树中的最大路径和（★★）


> <u>**[力扣第 124 题](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)**</u>

## 题目

<p><strong>路径</strong> 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 <strong>至多出现一次</strong> 。该路径<strong> 至少包含一个 </strong>节点，且不一定经过根节点。</p>

<p><strong>路径和</strong> 是路径中各节点值的总和。</p>

<p>给你一个二叉树的根节点 <code>root</code> ，返回其 <strong>最大路径和</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg" style="width: 322px; height: 182px;" />
<pre>
<strong>输入：</strong>root = [1,2,3]
<strong>输出：</strong>6
<strong>解释：</strong>最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg" />
<pre>
<strong>输入：</strong>root = [-10,9,20,null,null,15,7]
<strong>输出：</strong>42
<strong>解释：</strong>最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目范围是 <code>[1, 3 * 10<sup>4</sup>]</code></li>
<li><code>-1000 <= Node.val <= 1000</code></li>
</ul>


## 分析

用 dfs(node) 返回以 node 为起点的最大路径和，递归中即可计算经过 node 的最大路径和。

## 解答

```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        def dfs(u):
            if not u:
                return 0
            l = max(0,dfs(u.left))
            r = max(0,dfs(u.right))
            self.res = max(self.res,l+r+u.val)
            return max(l,r)+u.val
        self.res = -inf
        dfs(root)
        return self.res
```
61 ms





# 0124：二叉树中的最大路径和（★★）


> <u>**[力扣第 124 题](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)**</u>

## 题目

<p>二叉树中的<strong> 路径</strong> 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 <strong>至多出现一次</strong> 。该路径<strong> 至少包含一个 </strong>节点，且不一定经过根节点。</p>

<p><strong>路径和</strong> 是路径中各节点值的总和。</p>

<p>给你一个二叉树的根节点 <code>root</code> ，返回其 <strong>最大路径和</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg" style="width: 322px; height: 182px;" />
<pre>
<strong>输入：</strong>root = [1,2,3]
<strong>输出：</strong>6
<strong>解释：</strong>最优路径是 2 -&gt; 1 -&gt; 3 ，路径和为 2 + 1 + 3 = 6</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg" />
<pre>
<strong>输入：</strong>root = [-10,9,20,null,null,15,7]
<strong>输出：</strong>42
<strong>解释：</strong>最优路径是 15 -&gt; 20 -&gt; 7 ，路径和为 15 + 20 + 7 = 42
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目范围是 <code>[1, 3 * 10<sup>4</sup>]</code></li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0112：路径总和](/leetcode/0112)
- [0129：求根节点到叶节点数字之和](/leetcode/0129)
- [0666：路径总和 IV](/leetcode/0666)
- [0687：最长同值路径](/leetcode/0687)
- [1376：通知所有员工所需的时间（1561 分）](/leetcode/1376)
- [2538：最大价值和与最小价值和的差值（2397 分）](/leetcode/2538)


## 分析

用 dfs(node) 返回以 node 为起点的最大路径和，递归中即可计算经过 node 的最大路径和。

## 解答

```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        def dfs(u):
            nonlocal res
            if not u:
                return 0
            l = max(0,dfs(u.left))
            r = max(0,dfs(u.right))
            res = max(res,l+r+u.val)
            return max(l,r)+u.val
        res = -inf
        dfs(root)
        return res
```
15 ms





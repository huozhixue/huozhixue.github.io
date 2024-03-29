# 0298：二叉树最长连续序列（★）


> <u>**[力扣第 298 题](https://leetcode.cn/problems/binary-tree-longest-consecutive-sequence/)**</u>

## 题目

<p>给你一棵指定的二叉树的根节点 <code>root</code> ，请你计算其中 <strong>最长连续序列路径</strong> 的长度。</p>

<p><strong>最长连续序列路径</strong> 是依次递增 1 的路径。该路径，可以是从某个初始节点到树中任意节点，通过「父 - 子」关系连接而产生的任意路径。且必须从父节点到子节点，反过来是不可以的。</p>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/consec1-1-tree.jpg" style="width: 306px; height: 400px;" />
<pre>
<strong>输入：</strong>root = [1,null,3,2,4,null,null,null,5]
<strong>输出：</strong>3
<strong>解释：</strong>当中，最长连续序列是 <code>3-4-5 ，所以</code>返回结果为 <code>3 。</code>
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/14/consec1-2-tree.jpg" style="width: 249px; height: 400px;" />
<pre>
<strong>输入：</strong>root = [2,null,3,2,null,1]
<strong>输出：</strong>2
<strong>解释：</strong>当中，最长连续序列是 <code>2-3 。注意，不是</code> <code>3-2-1，所以</code>返回 <code>2 。</code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 3 * 10<sup>4</sup>]</code> 内</li>
<li><code>-3 * 10<sup>4</sup> &lt;= Node.val &lt;= 3 * 10<sup>4</sup></code></li>
</ul>


## 分析

可以递归求出每个节点开始的最长连续路径。

## 解答

```python
def longestConsecutive(self, root: TreeNode) -> int:
    def dfs(p):
        if not p:
            return 0
        ans = 1
        for child in [p.left, p.right]:
            tmp = dfs(child)
            if child and child.val==p.val+1:
                ans = max(ans, 1+tmp)
        self.res = max(self.res, ans)
        return ans
    
    self.res = 0
    dfs(root)
    return self.res
```
104 ms

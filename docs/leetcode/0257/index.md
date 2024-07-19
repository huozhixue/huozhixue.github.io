# 0257：二叉树的所有路径


> <u>**[力扣第 257 题](https://leetcode.cn/problems/binary-tree-paths/)**</u>

## 题目

<p>给你一个二叉树的根节点 <code>root</code> ，按 <strong>任意顺序</strong> ，返回所有从根节点到叶子节点的路径。</p>

<p><strong>叶子节点</strong> 是指没有子节点的节点。</p>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/12/paths-tree.jpg" style="width: 207px; height: 293px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,null,5]
<strong>输出：</strong>["1-&gt;2-&gt;5","1-&gt;3"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>["1"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 100]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>


**相似问题：**
- [0113：路径总和 II](/leetcode/0113)
- [0988：从叶结点开始的最小字符串（1429 分）](/leetcode/0988)
- [2096：从二叉树一个节点到另一个节点每一步的方向（1804 分）](/leetcode/2096)


## 分析

遍历时维护根节点到当前节点的路径，遇到叶子节点就加到结果中即可。

## 解答

```python
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        def dfs(u):
            path.append(str(u.val))
            if not u.left and not u.right:
                res.append('->'.join(path))
            for v in [u.left,u.right]:
                if v:
                    dfs(v)
            path.pop()
        res,path = [],[]
        dfs(root)
        return res
```
26 ms

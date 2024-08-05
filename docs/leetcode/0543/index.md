# 0543：二叉树的直径


> <u>**[力扣第 543 题](https://leetcode.cn/problems/diameter-of-binary-tree/)**</u>

## 题目

<p>给你一棵二叉树的根节点，返回该树的 <strong>直径</strong> 。</p>

<p>二叉树的 <strong>直径</strong> 是指树中任意两个节点之间最长路径的 <strong>长度</strong> 。这条路径可能经过也可能不经过根节点 <code>root</code> 。</p>

<p>两节点之间路径的 <strong>长度</strong> 由它们之间边数表示。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg" style="width: 292px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4,5]
<strong>输出：</strong>3
<strong>解释：</strong>3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [1,2]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[1, 10<sup>4</sup>]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>


**相似问题：**
- [1522：N 叉树的直径](/leetcode/1522)
- [2246：相邻字符不同的最长路径（2126 分）](/leetcode/2246)


## 分析

- 递归返回节点的高度
- 递归过程中，根据左右子树的高度，即可求出经过该节点的最长路径

## 解答

```python
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        def dfs(u):
            if not u:
                return 0
            l,r = dfs(u.left),dfs(u.right)
            self.res = max(self.res,l+r)
            return max(l,r)+1
        self.res = 0
        dfs(root)
        return self.res
```

51 ms

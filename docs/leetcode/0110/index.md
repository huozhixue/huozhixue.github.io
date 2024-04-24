# 0110：平衡二叉树


> <u>**[力扣第 110 题](https://leetcode.cn/problems/balanced-binary-tree/)**</u>

## 题目

<p>给定一个二叉树，判断它是否是高度平衡的二叉树。</p>

<p>本题中，一棵高度平衡二叉树定义为：</p>

<blockquote>
<p>一个二叉树<em>每个节点 </em>的左右两个子树的高度差的绝对值不超过 1 。</p>
</blockquote>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg" style="width: 342px; height: 221px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg" style="width: 452px; height: 301px;" />
<pre>
<strong>输入：</strong>root = [1,2,2,3,3,null,null,4,4]
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中的节点数在范围 <code>[0, 5000]</code> 内</li>
<li><code>-10<sup>4</sup> <= Node.val <= 10<sup>4</sup></code></li>
</ul>


## 分析

- 用 dfs 同时返回子树深度和是否平衡，即可递归
- 为了方便，可以用深度为 -1 代表不平衡，dfs 返回一个参数即可

## 解答

```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def dfs(u):
            if not u:
                return 0
            l,r = dfs(u.left),dfs(u.right)
            if l==-1 or r==-1 or abs(l-r)>1:
                return -1
            return max(l,r)+1
        return dfs(root)!=-1
```
42 ms


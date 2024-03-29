# 0333：最大 BST 子树（★）


> <u>**[力扣第 333 题](https://leetcode.cn/problems/largest-bst-subtree/)**</u>

## 题目

<p>给定一个二叉树，找到其中最大的二叉搜索树（BST）子树，并返回该子树的大小。其中，最大指的是子树节点数最多的。</p>

<p><strong>二叉搜索树（BST）</strong>中的所有节点都具备以下属性：</p>

<ul>
<li>
<p>左子树的值小于其父（根）节点的值。</p>
</li>
<li>
<p>右子树的值大于其父（根）节点的值。</p>
</li>
</ul>

<p><strong>注意：</strong>子树必须包含其所有后代。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/10/17/tmp.jpg" /></strong></p>

<pre>
<strong>输入：</strong>root = [10,5,15,1,8,null,7]
<strong>输出：</strong>3
<strong>解释：</strong>本例中最大的 BST 子树是高亮显示的子树。返回值是子树的大小，即 3 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树上节点数目的范围是 <code>[0, 10<sup>4</sup>]</code></li>
<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
</ul>



<p><strong>进阶:</strong>  你能想出 O(n) 时间复杂度的解法吗？</p>


## 分析

递归返回其子树是否为 BST、最小/大值、节点数，即可判断是否为 BST，并更新最大节点数。

为了方便，当不为 BST 时，可以返回最小值为 -inf，最大值为 inf。

## 解答

```python
def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
    def dfs(node):
        if not node:
            return 0, inf, -inf
        l1, l2, l3 = dfs(node.left)
        r1, r2, r3 = dfs(node.right)
        if l3<node.val<r2:
            return 1+l1+r1, min(l2, node.val), max(r3, node.val)
        return max(l1, r1), -inf, inf
    return dfs(root)[0]
```
52 ms




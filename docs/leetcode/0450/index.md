# 0450：删除二叉搜索树中的节点（★）


> <u>**[力扣第 450 题](https://leetcode.cn/problems/delete-node-in-a-bst/)**</u>

## 题目

<p>给定一个二叉搜索树的根节点 <strong>root </strong>和一个值 <strong>key</strong>，删除二叉搜索树中的 <strong>key </strong>对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。</p>

<p>一般来说，删除节点可分为两个步骤：</p>

<ol>
<li>首先找到需要删除的节点；</li>
<li>如果找到了，删除它。</li>
</ol>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2020/09/04/del_node_1.jpg" style="width: 800px;" /></p>

<pre>
<strong>输入：</strong>root = [5,3,6,2,4,null,7], key = 3
<strong>输出：</strong>[5,4,6,2,null,null,7]
<strong>解释：</strong>给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
另一个正确答案是 [5,2,6,null,4,null,7]。

<img src="https://assets.leetcode.com/uploads/2020/09/04/del_node_supp.jpg" style="width: 350px;" />
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> root = [5,3,6,2,4,null,7], key = 0
<strong>输出:</strong> [5,3,6,2,4,null,7]
<strong>解释:</strong> 二叉树不包含值为 0 的节点
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> root = [], key = 0
<strong>输出:</strong> []</pre>



<p><strong>提示:</strong></p>

<ul>
<li>节点数的范围 <code>[0, 10<sup>4</sup>]</code>.</li>
<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
<li>节点值唯一</li>
<li><code>root</code> 是合法的二叉搜索树</li>
<li><code>-10<sup>5</sup> &lt;= key &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>进阶：</strong> 要求算法时间复杂度为 O(h)，h 为树的高度。</p>


**相似问题：**
- [0776：拆分二叉搜索树（1809 分）](/leetcode/0776)


## 分析

- 假如要删除的不是根节点，转为递归子问题
- 假如删除的是根节点且左子树为空，返回右子树即可
- 假如删除的是根节点且左子树非空，找到左子树中最大的节点（其必然是没有右子树的），将根节点的右子树作为其右子树即可

## 解答

```python
class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        def dfs(u,x):
            if not u:
                return None
            if u.val>x:
                u.left = dfs(u.left,x)
            elif u.val<x:
                u.right = dfs(u.right,x)
            elif not u.left:
                u = u.right
            else:
                p = u.left
                while p.right:
                    p = p.right
                p.right = u.right
                u = u.left
            return u
        return dfs(root,key)
```
55 ms



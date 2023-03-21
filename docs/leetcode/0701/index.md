# 0701：二叉搜索树中的插入操作（★）


> <u>**[力扣第 701 题](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)**</u>

## 题目

<p>给定二叉搜索树（BST）的根节点<meta charset="UTF-8" /> <code>root</code> 和要插入树中的值<meta charset="UTF-8" /> <code>value</code> ，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 输入数据 <strong>保证</strong> ，新值和原始二叉搜索树中的任意节点值都不同。</p>

<p><strong>注意</strong>，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 <strong>任意有效的结果</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/insertbst.jpg" />
<pre>
<strong>输入：</strong>root = [4,2,7,1,3], val = 5
<strong>输出：</strong>[4,2,7,1,3,5]
<strong>解释：</strong>另一个满足题目要求可以通过的树是：
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/bst.jpg" />
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [40,20,60,10,30,50,70], val = 25
<strong>输出：</strong>[40,20,60,10,30,50,70,null,null,25]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
<strong>输出：</strong>[4,2,7,1,3,5]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中的节点数将在<meta charset="UTF-8" /> <code>[0, 10<sup>4</sup>]</code>的范围内。<meta charset="UTF-8" /></li>
<li><code>-10<sup>8</sup> &lt;= Node.val &lt;= 10<sup>8</sup></code></li>
<li>所有值 <meta charset="UTF-8" /><code>Node.val</code> 是 <strong>独一无二</strong> 的。</li>
<li><code>-10<sup>8</sup> &lt;= val &lt;= 10<sup>8</sup></code></li>
<li><strong>保证</strong> <code>val</code> 在原始BST中不存在。</li>
</ul>


## 分析

按查找的过程递归，最终到达空节点的位置插入即可。

## 解答

```python
def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
    if not root:
        return TreeNode(val)
    if root.val < val:
        root.right = self.insertIntoBST(root.right, val)
    elif root.val > val:
        root.left = self.insertIntoBST(root.left, val)
    return root
```

156 ms


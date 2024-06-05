# 0700：二叉搜索树中的搜索


> <u>**[力扣第 700 题](https://leetcode.cn/problems/search-in-a-binary-search-tree/)**</u>

## 题目

<p>给定二叉搜索树（BST）的根节点<meta charset="UTF-8" /> <code>root</code> 和一个整数值<meta charset="UTF-8" /> <code>val</code>。</p>

<p>你需要在 BST 中找到节点值等于 <code>val</code> 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回<meta charset="UTF-8" /> <code>null</code> 。</p>



<p><strong>示例 1:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/01/12/tree1.jpg" style="height: 179px; width: 250px;" /><meta charset="UTF-8" /></p>

<pre>
<b>输入：</b>root = [4,2,7,1,3], val = 2
<b>输出：</b>[2,1,3]
</pre>

<p><strong>示例 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/12/tree2.jpg" style="height: 179px; width: 250px;" />
<pre>
<b>输入：</b>root = [4,2,7,1,3], val = 5
<b>输出：</b>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数在 <code>[1, 5000]</code> 范围内</li>
<li><code>1 &lt;= Node.val &lt;= 10<sup>7</sup></code></li>
<li><code>root</code> 是二叉搜索树</li>
<li><code>1 &lt;= val &lt;= 10<sup>7</sup></code></li>
</ul>


## 分析

递归查找即可。因为是二叉搜索树，若当前值偏大就递归到左子树，若偏小就递归到右子树。


## 解答

```python
def searchBST(self, root: TreeNode, val: int) -> TreeNode:
    if not root:
        return None
    if root.val == val:
        return root
    return self.searchBST(root.left, val) if root.val > val else self.searchBST(root.right, val)
```

84 ms


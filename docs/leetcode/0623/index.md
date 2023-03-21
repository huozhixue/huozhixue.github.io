# 0623：在二叉树中增加一行（★）


> <u>**[力扣第 623 题](https://leetcode.cn/problems/add-one-row-to-tree/)**</u>

## 题目

<p>给定一个二叉树的根 <code>root</code> 和两个整数 <code>val</code> 和 <code>depth</code> ，在给定的深度 <code>depth</code> 处添加一个值为 <code>val</code> 的节点行。</p>

<p>注意，根节点 <code>root</code> 位于深度 <code>1</code> 。</p>

<p>加法规则如下:</p>

<ul>
<li>给定整数 <code>depth</code>，对于深度为 <code>depth - 1</code> 的每个非空树节点 <code>cur</code> ，创建两个值为 <code>val</code> 的树节点作为 <code>cur</code> 的左子树根和右子树根。</li>
<li><code>cur</code> 原来的左子树应该是新的左子树根的左子树。</li>
<li><code>cur</code> 原来的右子树应该是新的右子树根的右子树。</li>
<li>如果 <code>depth == 1 </code>意味着 <code>depth - 1</code> 根本没有深度，那么创建一个树节点，值 <code>val </code>作为整个原始树的新根，而原始树就是新根的左子树。</li>
</ul>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/15/addrow-tree.jpg" style="height: 231px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> root = [4,2,6,3,1,5], val = 1, depth = 2
<strong>输出:</strong> [4,1,1,2,null,null,6,3,1,5]</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/11/add2-tree.jpg" style="height: 277px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> root = [4,2,null,3,1], val = 1, depth = 3
<strong>输出:</strong>  [4,2,null,1,1,3,null,null,1]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>节点数在 <code>[1, 10<sup>4</sup>]</code> 范围内</li>
<li>树的深度在 <code>[1, 10<sup>4</sup>]</code>范围内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
<li><code>-10<sup>5</sup> &lt;= val &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= depth &lt;= the depth of tree + 1</code></li>
</ul>


## 分析

层序遍历到第 d-1 层，修改每个节点即可。注意 d = 1 时特别处理。

## 解答

```python
def addOneRow(self, root: TreeNode, val: int, depth: int) -> TreeNode:
    if depth == 1:
        return TreeNode(val, root)
    level = [root]
    for _ in range(depth-2):
        level = [child for node in level for child in [node.left, node.right] if child]
    for node in level:
        node.left = TreeNode(val, left=node.left)
        node.right = TreeNode(val, right=node.right)
    return root
```

44 ms


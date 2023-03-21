# 0814：二叉树剪枝（★）


> <u>**[力扣第 79 场周赛第 2 题](https://leetcode.cn/problems/binary-tree-pruning/)**</u>

## 题目

<p>给你二叉树的根结点 <code>root</code> ，此外树的每个结点的值要么是 <code>0</code> ，要么是 <code>1</code> 。</p>

<p>返回移除了所有不包含 <code>1</code> 的子树的原二叉树。</p>

<p>节点 <code>node</code> 的子树为 <code>node</code> 本身加上所有 <code>node</code> 的后代。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_2.png" style="width: 500px; height: 140px;" />
<pre>
<strong>输入：</strong>root = [1,null,0,0,1]
<strong>输出：</strong>[1,null,0,null,1]
<strong>解释：</strong>
只有红色节点满足条件“所有不包含 1 的子树”。 右图为返回的答案。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_1.png" style="width: 500px; height: 115px;" />
<pre>
<strong>输入：</strong>root = [1,0,1,0,0,0,1]
<strong>输出：</strong>[1,null,1,null,1]
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/05/1028.png" style="width: 500px; height: 134px;" />
<pre>
<strong>输入：</strong>root = [1,1,0,1,1,0,1,0]
<strong>输出：</strong>[1,1,0,1,1,null,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 200]</code> 内</li>
<li><code>Node.val</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>


## 分析

递归即可，若 node 剪枝后的左子树或右子树非空或者根节点为 1，则代表 node 包含 1，否则返回 None。

## 解答

```python
def pruneTree(self, root: TreeNode) -> TreeNode:
    def help(node):
        if not node:
            return None
        node.left, node.right = help(node.left), help(node.right)
        return node if node.left or node.right or node.val==1 else None
    return help(root)
```

32 ms


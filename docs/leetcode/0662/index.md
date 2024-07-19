# 0662：二叉树最大宽度（★）


> <u>**[力扣第 662 题](https://leetcode.cn/problems/maximum-width-of-binary-tree/)**</u>

## 题目

<p>给你一棵二叉树的根节点 <code>root</code> ，返回树的 <strong>最大宽度</strong> 。</p>

<p>树的 <strong>最大宽度</strong> 是所有层中最大的 <strong>宽度</strong> 。</p>

<div class="original__bRMd">
<div>
<p>每一层的 <strong>宽度</strong> 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的 <code>null</code> 节点，这些 <code>null</code> 节点也计入长度。</p>

<p>题目数据保证答案将会在  <strong>32 位</strong> 带符号整数范围内。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/03/width1-tree.jpg" style="width: 359px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [1,3,2,5,3,null,9]
<strong>输出：</strong>4
<strong>解释：</strong>最大宽度出现在树的第 3 层，宽度为 4 (5,3,null,9) 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2022/03/14/maximum-width-of-binary-tree-v3.jpg" style="width: 442px; height: 422px;" />
<pre>
<strong>输入：</strong>root = [1,3,2,5,null,null,9,6,null,7]
<strong>输出：</strong>7
<strong>解释：</strong>最大宽度出现在树的第 4 层，宽度为 7 (6,null,null,null,null,null,7) 。
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/03/width3-tree.jpg" style="width: 289px; height: 299px;" />
<pre>
<strong>输入：</strong>root = [1,3,2,5]
<strong>输出：</strong>2
<strong>解释：</strong>最大宽度出现在树的第 2 层，宽度为 2 (3,2) 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目范围是 <code>[1, 3000]</code></li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>
</div>
</div>




## 分析

满二叉树的一个性质是对于序号 i 的节点，其左右子树节点的序号分别为 2*i，2*i+1。

因此层序遍历并保存节点在满二叉树中的序号，每层宽度即可由该层的第一个节点和最后一个节点的序号计算得到。


## 解答

```python
def widthOfBinaryTree(self, root: TreeNode) -> int:
    res, level = 0, [(root, 0)]
    while level:
        res = max(res, level[-1][1]-level[0][1]+1)
        level = [(child, y) for node, x in level for child, y in [(node.left, 2*x), (node.right, 2*x+1)] if child]
    return res
```
52 ms
 


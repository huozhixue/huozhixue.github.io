# 0872：叶子相似的树（1287 分）


> <u>**[力扣第 94 场周赛第 1 题](https://leetcode.cn/problems/leaf-similar-trees/)**</u>

## 题目

<p>请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 <strong>叶值序列 </strong>。</p>

<p><img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/16/tree.png" style="height: 336px; width: 400px;" /></p>

<p>举个例子，如上图所示，给定一棵叶值序列为 <code>(6, 7, 4, 9, 8)</code> 的树。</p>

<p>如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 <em>叶相似 </em>的。</p>

<p>如果给定的两个根结点分别为 <code>root1</code> 和 <code>root2</code> 的树是叶相似的，则返回 <code>true</code>；否则返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/09/03/leaf-similar-1.jpg" style="height: 237px; width: 600px;" /></p>

<pre>
<strong>输入：</strong>root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/09/03/leaf-similar-2.jpg" style="height: 110px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>root1 = [1,2,3], root2 = [1,3,2]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>给定的两棵树结点数在 <code>[1, 200]</code> 范围内</li>
<li>给定的两棵树上的值在 <code>[0, 200]</code> 范围内</li>
</ul>




## 分析

前序遍历中保存叶子的值即得到叶值序列。

## 解答

```python
def leafSimilar(self, root1: TreeNode, root2: TreeNode) -> bool:
    def leaf(root):
        res, stack = [], [root]
        while stack:
            node = stack.pop()
            if node:
                if not node.left and not node.right:
                    res.append(node.val)
                stack.extend([node.right, node.left])
        return res
    return leaf(root1) == leaf(root2)
```

48 ms


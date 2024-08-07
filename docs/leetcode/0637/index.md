# 0637：二叉树的层平均值


> <u>**[力扣第 637 题](https://leetcode.cn/problems/average-of-levels-in-binary-tree/)**</u>

## 题目

<p>给定一个非空二叉树的根节点<meta charset="UTF-8" /> <code>root</code> , 以数组的形式返回每一层节点的平均值。与实际答案相差 <code>10<sup>-5</sup></code> 以内的答案可以被接受。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/03/09/avg1-tree.jpg" /></p>

<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[3.00000,14.50000,11.00000]
<strong>解释：</strong>第 0 层的平均值为 3,第 1 层的平均值为 14.5,第 2 层的平均值为 11 。
因此返回 [3, 14.5, 11] 。
</pre>

<p><strong>示例 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/03/09/avg2-tree.jpg" /></p>

<pre>
<strong>输入：</strong>root = [3,9,20,15,7]
<strong>输出：</strong>[3.00000,14.50000,11.00000]
</pre>



<p><strong>提示：</strong></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li>树中节点数量在 <code>[1, 10<sup>4</sup>]</code> 范围内</li>
<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0102：二叉树的层序遍历](/leetcode/0102)
- [0107：二叉树的层序遍历 II](/leetcode/0107)


## 分析

将 {{< lc "0102" >}} 的每层结果中取均值即可。

## 解答

```python
def averageOfLevels(self, root: TreeNode) -> List[float]:
    if not root:
        return []
    res, level = [], [root]
    while level:
        res.append(sum(node.val for node in level)/len(level))
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```

48 ms


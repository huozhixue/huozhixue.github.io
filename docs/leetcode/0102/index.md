# 0102：二叉树的层序遍历（★）


> <u>**[力扣第 102 题](https://leetcode.cn/problems/binary-tree-level-order-traversal/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>层序遍历</strong> 。 （即逐层地，从左到右访问所有节点）。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg" style="width: 277px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[3],[9,20],[15,7]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[[1]]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[0, 2000]</code> 内</li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0103：二叉树的锯齿形层序遍历](/leetcode/0103)
- [0107：二叉树的层序遍历 II](/leetcode/0107)
- [0111：二叉树的最小深度](/leetcode/0111)
- [0314：二叉树的垂直遍历](/leetcode/0314)
- [0637：二叉树的层平均值](/leetcode/0637)
- [0429：N 叉树的层序遍历](/leetcode/0429)
- [0993：二叉树的堂兄弟节点（1287 分）](/leetcode/0993)
- [2471：逐层排序二叉树所需的最少操作数目（1635 分）](/leetcode/2471)
- [2493：将节点分成尽可能多的组（2415 分）](/leetcode/2493)


## 分析

迭代保存每层的节点即可。

## 解答

```python
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res,Q = [],[root] if root else []
        while Q:
            res.append([u.val for u in Q])
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res
```
45 ms


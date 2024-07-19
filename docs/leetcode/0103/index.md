# 0103：二叉树的锯齿形层序遍历（★）


> <u>**[力扣第 103 题](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>锯齿形层序遍历</strong> 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg" style="width: 277px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[3],[20,9],[15,7]]
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
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>


**相似问题：**
- [0102：二叉树的层序遍历](/leetcode/0102)


## 分析

{{< lc "0102" >}} 升级版，将奇数层的节点反序即可。

## 解答

```python
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        res,Q = [],[root] if root else []
        while Q:
            res.append([u.val for u in (Q[::-1] if len(res)%2 else Q)])
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res
```
26 ms


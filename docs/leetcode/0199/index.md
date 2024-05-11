# 0199：二叉树的右视图（★）


> <u>**[力扣第 199 题](https://leetcode.cn/problems/binary-tree-right-side-view/)**</u>

## 题目

<p>给定一个二叉树的 <strong>根节点</strong> <code>root</code>，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/02/14/tree.jpg" style="width: 270px; " /></p>

<pre>
<strong>输入:</strong> [1,2,3,null,5,null,4]
<strong>输出:</strong> [1,3,4]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> [1,null,3]
<strong>输出:</strong> [1,3]
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> []
<strong>输出:</strong> []
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>二叉树的节点个数的范围是 <code>[0,100]</code></li>
<li><meta charset="UTF-8" /><code>-100 <= Node.val <= 100</code> </li>
</ul>


## 分析

层序遍历，保存每层的最后一个元素即可。
 
## 解答

```python
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        res,Q = [],[root] if root else []
        while Q:
            res.append(Q[-1].val)
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return res
```
28 ms




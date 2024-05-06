# 0145：二叉树的后序遍历


> <u>**[力扣第 145 题](https://leetcode.cn/problems/binary-tree-postorder-traversal/)**</u>

## 题目

<p>给你一棵二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>后序遍历 </strong>。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg" style="width: 127px; height: 200px;" />
<pre>
<strong>输入：</strong>root = [1,null,2,3]
<strong>输出：</strong>[3,2,1]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[0, 100]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>



<p><strong>进阶：</strong>递归算法很简单，你可以通过迭代算法完成吗？</p>


## 分析


迭代算法类似 {{< lc "0094" >}}，入栈顺序换成 [节点值、右子树、左子树] 即可。

## 解答

```python
class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res,sk = [],[root] if root else []
        while sk:
            u = sk.pop()
            if isinstance(u,int):
                res.append(u)
            elif u:
                sk.extend([u.val,u.right,u.left])
        return res
```
37 ms


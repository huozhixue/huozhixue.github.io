# 0101：对称二叉树


> <u>**[力扣第 101 题](https://leetcode.cn/problems/symmetric-tree/)**</u>

## 题目

<p>给你一个二叉树的根节点 <code>root</code> ， 检查它是否轴对称。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://pic.leetcode.cn/1698026966-JDYPDU-image.png" style="width: 354px; height: 291px;" />
<pre>
<strong>输入：</strong>root = [1,2,2,3,4,4,3]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://pic.leetcode.cn/1698027008-nPFLbM-image.png" style="width: 308px; height: 258px;" />
<pre>
<strong>输入：</strong>root = [1,2,2,null,3,null,3]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[1, 1000]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>



<p><strong>进阶：</strong>你可以运用递归和迭代两种方法解决这个问题吗？</p>




## 分析

### #1

- {{< lc "0100" >}} 升级版，等价于判断左子树和右子树是否镜像对称
- 令 dfs(p, q) 代表 p 和 q 是否镜像对称，即可递归

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def dfs(p,q):
            if not p or not q:
                return not p and not q
            return p.val==q.val and dfs(p.left,q.right) and dfs(p.right,q.left)
        return dfs(root.left,root.right)
```
42 ms

### #2

也可以用栈遍历迭代，改下入栈顺序即可。

## 解答

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        sk = [(root.left,root.right)]
        while sk:
            a,b = sk.pop()
            if not a and not b:
                continue
            if not a or not b or a.val!=b.val:
                return False
            sk.extend([(a.left,b.right),(a.right,b.left)])
        return True
```
32 ms


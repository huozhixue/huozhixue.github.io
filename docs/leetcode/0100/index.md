# 0100：相同的树


> <u>**[力扣第 100 题](https://leetcode.cn/problems/same-tree/)**</u>

## 题目

<p>给你两棵二叉树的根节点 <code>p</code> 和 <code>q</code> ，编写一个函数来检验这两棵树是否相同。</p>

<p>如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg" style="width: 622px; height: 182px;" />
<pre>
<strong>输入：</strong>p = [1,2,3], q = [1,2,3]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg" style="width: 382px; height: 182px;" />
<pre>
<strong>输入：</strong>p = [1,2], q = [1,null,2]
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg" style="width: 622px; height: 182px;" />
<pre>
<strong>输入：</strong>p = [1,2,1], q = [1,1,2]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>两棵树上的节点数目都在范围 <code>[0, 100]</code> 内</li>
<li><code>-10<sup>4</sup> <= Node.val <= 10<sup>4</sup></code></li>
</ul>




## 分析

### #1

递归很容易写出。

```python
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        def dfs(p,q):
            if not p or not q:
                return not p and not q
            return p.val==q.val and dfs(p.left,q.left) and dfs(p.right,q.right)
        return dfs(p,q)
```
37 ms

### #2

也可以用栈遍历判断。
## 解答

```python
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        sk = [(p,q)]
        while sk:
            a,b = sk.pop()
            if not a and not b:
                continue
            if not a or not b or a.val!=b.val:
                return False
            sk.extend([(a.right,b.right),(a.left,b.left)])
        return True
```
34 ms


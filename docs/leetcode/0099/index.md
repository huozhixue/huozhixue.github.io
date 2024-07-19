# 0099：恢复二叉搜索树（★）


> <u>**[力扣第 99 题](https://leetcode.cn/problems/recover-binary-search-tree/)**</u>

## 题目

<p>给你二叉搜索树的根节点 <code>root</code> ，该树中的 <strong>恰好</strong> 两个节点的值被错误地交换。<em>请在不改变其结构的情况下，恢复这棵树 </em>。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/28/recover1.jpg" style="width: 300px;" />
<pre>
<strong>输入：</strong>root = [1,3,null,null,2]
<strong>输出：</strong>[3,1,null,null,2]
<strong>解释：</strong>3 不能是 1 的左孩子，因为 3 &gt; 1 。交换 1 和 3 使二叉搜索树有效。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/28/recover2.jpg" style="height: 208px; width: 400px;" />
<pre>
<strong>输入：</strong>root = [3,1,4,null,null,2]
<strong>输出：</strong>[2,1,4,null,null,3]
<strong>解释：</strong>2 不能在 3 的右子树中，因为 2 &lt; 3 。交换 2 和 3 使二叉搜索树有效。</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树上节点的数目在范围 <code>[2, 1000]</code> 内</li>
<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>使用 <code>O(n)</code> 空间复杂度的解法很容易实现。你能想出一个只使用 <code>O(1)</code> 空间的解决方案吗？</p>




## 分析

- 二叉搜索树等价于其中序遍历的节点值是递增的
- 错误的节点处不递增
- 找出两处或一处不递增的地方，即可找到两个错误节点

## 解答

```python
class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        a,b,p = None,None,TreeNode(-inf)
        sk = [(root,0)]
        while sk:
            u,flag = sk.pop()
            if flag:
                if u.val<p.val:
                    a,b = (a,u) if a else (p,u)
                p = u
            elif u:
                sk.extend([(u.right,0),(u,1),(u.left,0)])
        a.val,b.val = b.val,a.val
```
40 ms

## *附加

要求 O(1) 空间，需要用 [Morris 中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/)。Morris 遍历减少了空间但也增加了时间，一般不用。

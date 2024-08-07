# 0098：验证二叉搜索树（★）


> <u>**[力扣第 98 题](https://leetcode.cn/problems/validate-binary-search-tree/)**</u>

## 题目

<p>给你一个二叉树的根节点 <code>root</code> ，判断其是否是一个有效的二叉搜索树。</p>

<p><strong>有效</strong> 二叉搜索树定义如下：</p>

<ul>
<li>节点的左<span data-keyword="subtree">子树</span>只包含<strong> 小于 </strong>当前节点的数。</li>
<li>节点的右子树只包含 <strong>大于</strong> 当前节点的数。</li>
<li>所有左子树和右子树自身必须也是二叉搜索树。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg" style="width: 302px; height: 182px;" />
<pre>
<strong>输入：</strong>root = [2,1,3]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg" style="width: 422px; height: 292px;" />
<pre>
<strong>输入：</strong>root = [5,1,4,null,null,3,6]
<strong>输出：</strong>false
<strong>解释：</strong>根节点的值是 5 ，但是右子节点的值是 4 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目范围在<code>[1, 10<sup>4</sup>]</code> 内</li>
<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0094：二叉树的中序遍历](/leetcode/0094)
- [0501：二叉搜索树中的众数](/leetcode/0501)


## 分析

可以中序遍历判断是否递增，也可以用递归，令 dfs(u,a,b) 返回子树 u 是否在范围(a,b)内即可。

## 解答

```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def dfs(u,a,b):
            if not u:
                return True
            return a<u.val<b and dfs(u.left,a,u.val) and dfs(u.right,u.val,b)
        return dfs(root,-inf,inf)
```
49 ms



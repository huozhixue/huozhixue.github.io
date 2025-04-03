# 1373：二叉搜索子树的最大键值和（1913 分）


> <u>**[力扣第 21 场双周赛第 4 题](https://leetcode.cn/problems/maximum-sum-bst-in-binary-tree/)**</u>

## 题目

<p>给你一棵以 <code>root</code> 为根的 <strong>二叉树</strong> ，请你返回 <strong>任意</strong> 二叉搜索子树的最大键值和。</p>

<p>二叉搜索树的定义如下：</p>

<ul>
<li>任意节点的左子树中的键值都 <strong>小于</strong> 此节点的键值。</li>
<li>任意节点的右子树中的键值都 <strong>大于</strong> 此节点的键值。</li>
<li>任意节点的左子树和右子树都是二叉搜索树。</li>
</ul>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/03/07/sample_1_1709.png" style="height: 250px; width: 320px;" /></p>

<pre>
<strong>输入：</strong>root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
<strong>输出：</strong>20
<strong>解释：</strong>键值为 3 的子树是和最大的二叉搜索树。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/03/07/sample_2_1709.png" style="height: 180px; width: 134px;" /></p>

<pre>
<strong>输入：</strong>root = [4,3,null,1,2]
<strong>输出：</strong>2
<strong>解释：</strong>键值为 2 的单节点子树是和最大的二叉搜索树。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [-4,-2,-5]
<strong>输出：</strong>0
<strong>解释：</strong>所有节点键值都为负数，和最大的二叉搜索树为空。
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>root = [2,1,3]
<strong>输出：</strong>6
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>root = [5,4,8,3,null,6,3]
<strong>输出：</strong>7
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>每棵树有 <code>1</code> 到 <code>40000</code> 个节点。</li>
<li>每个节点的键值在 <code>[-4 * 10^4 , 4 * 10^4]</code> 之间。</li>
</ul>




## 分析

- 递归时同时返回子树的值范围，即可判断子树是否二叉搜索树
- 是二叉搜索树就更新结果即可
- 为了方便，令空节点的值范围为 [inf,-inf]，合并左右子树的值范围时注意即可

## 解答


```python
class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        def dfs(u):
            nonlocal res
            if not u:
                return 0,inf,-inf
            l,r = dfs(u.left),dfs(u.right)
            if l[2]<u.val<r[1]:
                res = max(res,l[0]+r[0]+u.val)
                return l[0]+r[0]+u.val,min(l[1],u.val),max(r[2],u.val)
            return 0,-inf,inf
        res = 0
        dfs(root)
        return res
```
119 ms

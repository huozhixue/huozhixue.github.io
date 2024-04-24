# 0095：不同的二叉搜索树 II（★）


> <u>**[力扣第 95 题](https://leetcode.cn/problems/unique-binary-search-trees-ii/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你生成并返回所有由 <code>n</code> 个节点组成且节点值从 <code>1</code> 到 <code>n</code> 互不相同的不同 <strong>二叉搜索树</strong><em> </em>。可以按 <strong>任意顺序</strong> 返回答案。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg" style="width: 600px; height: 148px;" />
<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>[[1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 8</code></li>
</ul>
</div>
</div>


## 分析

令 dfs(i,j) 代表节点值 i 到 j 组成的不同二叉搜索树，即可递归。

## 解答

```python
class Solution:
    def generateTrees(self, n: int) -> List[Optional[TreeNode]]:
        def dfs(i,j):
            if i>j:
                return [None]
            res = []
            for k in range(i,j+1):
                for l in dfs(i,k-1):
                    for r in dfs(k+1,j):
                        res.append(TreeNode(k,l,r))
            return res
        return dfs(1,n)
```
56 ms



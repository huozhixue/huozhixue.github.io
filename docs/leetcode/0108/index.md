# 0108：将有序数组转换为二叉搜索树


> <u>**[力扣第 108 题](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，其中元素已经按 <strong>升序</strong> 排列，请你将其转换为一棵 <span data-keyword="height-balanced">平衡</span> 二叉搜索树。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg" style="width: 302px; height: 222px;" />
<pre>
<strong>输入：</strong>nums = [-10,-3,0,5,9]
<strong>输出：</strong>[0,-3,9,-10,null,5]
<strong>解释：</strong>[0,-10,5,null,-3,null,9] 也将被视为正确答案：
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg" style="width: 302px; height: 222px;" />
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/18/btree.jpg" style="width: 342px; height: 142px;" />
<pre>
<strong>输入：</strong>nums = [1,3]
<strong>输出：</strong>[3,1]
<strong>解释：</strong>[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>nums</code> 按 <strong>严格递增</strong> 顺序排列</li>
</ul>


**相似问题：**
- [0109：有序链表转换二叉搜索树](/leetcode/0109)


## 分析

将中点作为根节点，前半部分和后半部分分别作为左子树和右子树，即可递归。

## 解答

```python
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def dfs(i,j):
            if i>j:
                return None
            k = (i+j)//2
            return TreeNode(nums[k],dfs(i,k-1),dfs(k+1,j))
        return dfs(0,len(nums)-1)
```
46 ms


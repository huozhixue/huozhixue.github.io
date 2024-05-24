# 0230：二叉搜索树中第K小的元素（★）


> <u>**[力扣第 230 题](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)**</u>

## 题目

<p>给定一个二叉搜索树的根节点 <code>root</code> ，和一个整数 <code>k</code> ，请你设计一个算法查找其中第 <code>k</code><strong> </strong>个最小元素（从 1 开始计数）。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg" style="width: 212px; height: 301px;" />
<pre>
<strong>输入：</strong>root = [3,1,4,null,2], k = 1
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg" style="width: 382px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [5,3,6,2,4,null,null,1], k = 3
<strong>输出：</strong>3
</pre>






**提示：**

- 树中的节点数为 `n` 。
- `1 <= k <= n <= 10^4`
- `0 <= Node.val <= 10^4`

<p><strong>进阶：</strong>如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 <code>k</code> 小的值，你将如何优化算法？</p>


## 分析

中序遍历到第 k 个数即可。

## 解答

```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        sk = [root]
        while sk:
            u = sk.pop()
            if isinstance(u,int):
                k -= 1
                if k==0:
                    return u
            elif u:
                sk.extend([u.right,u.val,u.left])
```
48 ms

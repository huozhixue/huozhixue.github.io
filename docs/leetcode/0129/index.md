# 0129：求根节点到叶节点数字之和（★）


> <u>**[力扣第 129 题](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)**</u>

## 题目

给你一个二叉树的根节点 <code>root</code> ，树中每个节点都存放有一个 <code>0</code> 到 <code>9</code> 之间的数字。
<div class="original__bRMd">
<div>
<p>每条从根节点到叶节点的路径都代表一个数字：</p>

<ul>
<li>例如，从根节点到叶节点的路径 <code>1 -> 2 -> 3</code> 表示数字 <code>123</code> 。</li>
</ul>

<p>计算从根节点到叶节点生成的 <strong>所有数字之和</strong> 。</p>

<p><strong>叶节点</strong> 是指没有子节点的节点。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg" style="width: 212px; height: 182px;" />
<pre>
<strong>输入：</strong>root = [1,2,3]
<strong>输出：</strong>25
<strong>解释：</strong>
从根到叶子节点路径 <code>1->2</code> 代表数字 <code>12</code>
从根到叶子节点路径 <code>1->3</code> 代表数字 <code>13</code>
因此，数字总和 = 12 + 13 = <code>25</code></pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg" style="width: 292px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [4,9,0,5,1]
<strong>输出：</strong>1026
<strong>解释：</strong>
从根到叶子节点路径 <code>4->9->5</code> 代表数字 495
从根到叶子节点路径 <code>4->9->1</code> 代表数字 491
从根到叶子节点路径 <code>4->0</code> 代表数字 40
因此，数字总和 = 495 + 491 + 40 = <code>1026</code>
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目在范围 <code>[1, 1000]</code> 内</li>
<li><code>0 <= Node.val <= 9</code></li>
<li>树的深度不超过 <code>10</code></li>
</ul>
</div>
</div>


**相似问题：**
- [0112：路径总和](/leetcode/0112)
- [0124：二叉树中的最大路径和](/leetcode/0124)
- [0988：从叶结点开始的最小字符串（1429 分）](/leetcode/0988)


## 分析

遍历时维护根节点到当前节点的路径数字，遇到叶子节点就加到结果中即可。

## 解答

```python
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        sk = [(root,0)]
        res = 0
        while sk:
            u,s = sk.pop()
            if u:
                s = s*10+u.val
                if not u.left and not u.right:
                    res += s
                sk.extend([(u.right,s),(u.left,s)])
        return res
```
32 ms




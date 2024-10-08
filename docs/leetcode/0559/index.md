# 0559：N 叉树的最大深度


> <u>**[力扣第 559 题](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/)**</u>

## 题目

<p>给定一个 N 叉树，找到其最大深度。</p>

<p class="MachineTrans-lang-zh-CN">最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。</p>

<p class="MachineTrans-lang-zh-CN">N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。</p>

<p class="MachineTrans-lang-zh-CN"> </p>

<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,3,2,4,null,5,6]
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="width: 296px; height: 241px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
<strong>输出：</strong>5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树的深度不会超过 <code>1000</code> 。</li>
<li>树的节点数目位于 <code>[0, 10<sup>4</sup>]</code> 之间。</li>
</ul>


**相似问题：**
- [0104：二叉树的最大深度](/leetcode/0104)
- [2039：网络空闲的时刻（1865 分）](/leetcode/2039)


## 分析

层序遍历记录有多少层即可。

## 解答

```python
class Solution:
    def maxDepth(self, root: 'Node') -> int:
        res,Q = 0,[root] if root else []
        while Q:
            Q = [v for u in Q for v in u.children]
            res += 1
        return res
```

50 ms


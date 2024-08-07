# 0429：N 叉树的层序遍历（★）


> <u>**[力扣第 429 题](https://leetcode.cn/problems/n-ary-tree-level-order-traversal/)**</u>

## 题目

<p>给定一个 N 叉树，返回其节点值的<em>层序遍历</em>。（即从左到右，逐层遍历）。</p>

<p>树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,3,2,4,null,5,6]
<strong>输出：</strong>[[1],[3,2,4],[5,6]]
</pre>

<p><strong class="example">示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="width: 296px; height: 241px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
<strong>输出：</strong>[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树的高度不会超过 <code>1000</code></li>
<li>树的节点总数在 <code>[0, 10<sup>4</sup>]</code> 之间</li>
</ul>


**相似问题：**
- [0102：二叉树的层序遍历](/leetcode/0102)
- [0589：N 叉树的前序遍历](/leetcode/0589)
- [0590：N 叉树的后序遍历](/leetcode/0590)
- [2039：网络空闲的时刻（1865 分）](/leetcode/2039)


## 分析

迭代保存每层的节点即可。

## 解答

```python
class Solution:
    def levelOrder(self, root: 'Node') -> List[List[int]]:
        res = []
        Q = [root] if root else []
        while Q:
            res.append([u.val for u in Q])
            Q = [c for u in Q for c in u.children]
        return res
```

52 ms


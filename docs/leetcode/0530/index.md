# 0530：二叉搜索树的最小绝对差


> <u>**[力扣第 530 题](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)**</u>

## 题目

<p>给你一个二叉搜索树的根节点 <code>root</code> ，返回 <strong>树中任意两不同节点值之间的最小差值</strong> 。</p>

<p>差值是一个正数，其数值等于两值之差的绝对值。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg" style="width: 292px; height: 301px;" />
<pre>
<strong>输入：</strong>root = [4,2,6,1,3]
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg" style="width: 282px; height: 301px;" />
<pre>
<strong>输入：</strong>root = [1,0,48,null,null,12,49]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目范围是 <code>[2, 10<sup>4</sup>]</code></li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>注意：</strong>本题与 783 <a href="https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/">https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/</a> 相同</p>


**相似问题：**
- [0532：数组中的 k-diff 数对](/leetcode/0532)


## 分析

中序遍历求最小相邻间隔即可。

## 解答

```python
class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        res,pre = inf,-inf
        sk = [root]
        while sk:
            u = sk.pop()
            if isinstance(u,int):
                res = min(res,u-pre)
                pre = u
            elif u:
                sk.extend([u.right,u.val,u.left])
        return res
```

56 ms

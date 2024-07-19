# 0508：出现次数最多的子树元素和（★）


> <u>**[力扣第 508 题](https://leetcode.cn/problems/most-frequent-subtree-sum/)**</u>

## 题目

<p>给你一个二叉树的根结点 <code>root</code> ，请返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。</p>

<p>一个结点的 <strong>「子树元素和」</strong> 定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/24/freq1-tree.jpg" /></p>

<pre>
<strong>输入:</strong> root = [5,2,-3]
<strong>输出:</strong> [2,-3,4]
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/24/freq2-tree.jpg" /></p>

<pre>
<strong>输入:</strong> root = [5,2,-5]
<b>输出:</b> [2]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>节点数在 <code>[1, 10<sup>4</sup>]</code> 范围内</li>
<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0572：另一棵树的子树](/leetcode/0572)
- [1973：值等于子节点值之和的节点数量](/leetcode/1973)


## 分析

遍历时统计子树元素和即可。

## 解答

```python
class Solution:
    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:
        def dfs(u):
            if not u:
                return 0
            s = u.val+dfs(u.left)+dfs(u.right)
            ct[s] += 1
            return s

        ct = defaultdict(int)
        dfs(root)
        ma = max(ct.values())
        return [x for x in ct if ct[x]==ma]
```
42 ms

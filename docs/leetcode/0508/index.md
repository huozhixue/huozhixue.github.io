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


## 分析

统计所有的子树元素和即可。计算根节点的递归过程中就可以完成统计了。

## 解答

```python
def findFrequentTreeSum(self, root: TreeNode) -> List[int]:
    def help(root):
        if not root:
            return 0
        key = root.val + help(root.left) + help(root.right)
        ct[key] += 1
        return key

    ct = Counter()
    help(root)
    M = max(ct.values())
    return [key for key in ct if ct[key] == M]
```

64 ms

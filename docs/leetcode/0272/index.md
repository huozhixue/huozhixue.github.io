# 0272：最接近的二叉搜索树值 II（★★）


> <u>**[力扣第 272 题](https://leetcode.cn/problems/closest-binary-search-tree-value-ii/)**</u>

## 题目

<p>给定二叉搜索树的根 <code>root</code> 、一个目标值 <code>target</code> 和一个整数 <code>k</code> ，返回BST中最接近目标的 <code>k</code> 个值。你可以按 <strong>任意顺序</strong> 返回答案。</p>

<p>题目 <strong>保证</strong> 该二叉搜索树中只会存在一种 k 个值集合最接近 <code>target</code></p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/12/closest1-1-tree.jpg" /></p>

<pre>
<strong>输入:</strong> root = [4,2,5,1,3]，目标值 = 3.714286，且 <em>k</em> = 2
<strong>输出:</strong> [4,3]</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> root = [1], target = 0.000000, k = 1
<strong>输出:</strong> [1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>二叉树的节点总数为 <code>n</code></li>
<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
</ul>



<p><strong>进阶：</strong>假设该二叉搜索树是平衡的，请问您是否能在小于 <code>O(n)</code>（ <code>n = total nodes</code> ）的时间复杂度内解决该问题呢？</p>


## 分析

最简单的就是遍历所有值并排序。

## 解答

```python
def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
    A, stack = [], [root]
    while stack:
        p = stack.pop()
        if p:
            A.append(p.val)
            stack.extend([p.right, p.left])
    return nsmallest(k, A, key=lambda x: abs(x-target))
```
48 ms


# 0653：两数之和 IV - 输入二叉搜索树


> <u>**[力扣第 653 题](https://leetcode.cn/problems/two-sum-iv-input-is-a-bst/)**</u>

## 题目

<p>给定一个二叉搜索树 <code>root</code> 和一个目标结果 <code>k</code>，如果二叉搜索树中存在两个元素且它们的和等于给定的目标结果，则返回 <code>true</code>。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/21/sum_tree_1.jpg" style="height: 229px; width: 400px;" />
<pre>
<strong>输入:</strong> root = [5,3,6,2,4,null,7], k = 9
<strong>输出:</strong> true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/21/sum_tree_2.jpg" style="height: 229px; width: 400px;" />
<pre>
<strong>输入:</strong> root = [5,3,6,2,4,null,7], k = 28
<strong>输出:</strong> false
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>二叉树的节点个数的范围是  <code>[1, 10<sup>4</sup>]</code>.</li>
<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
<li>题目数据保证，输入的 <code>root</code> 是一棵 <strong>有效</strong> 的二叉搜索树</li>
<li><code>-10<sup>5</sup> &lt;= k &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

类似 {{< lc "0001" >}}，边遍历边用哈希存储元素值，每轮查询前面是否有对应的数即可。

## 解答

```python
def findTarget(self, root: TreeNode, k: int) -> bool:
    stack, vis = [root], set()
    while stack:
        node = stack.pop()
        if node:
            if k - node.val in vis:
                return True
            vis.add(node.val)
            stack.extend([node.right, node.left])
    return False
```

64 ms
 


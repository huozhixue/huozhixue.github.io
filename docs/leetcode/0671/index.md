# 0671：二叉树中第二小的节点


> <u>**[力扣第 671 题](https://leetcode.cn/problems/second-minimum-node-in-a-binary-tree/)**</u>

## 题目

<p>给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 <code>2</code> 或 <code>0</code>。如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。</p>

<p>更正式地说，即 <code>root.val = min(root.left.val, root.right.val)</code> 总成立。</p>

<p>给出这样的一个二叉树，你需要输出所有节点中的 <strong>第二小的值 </strong>。</p>

<p>如果第二小的值不存在的话，输出 -1 <strong>。</strong></p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/15/smbt1.jpg" style="height: 210px; width: 300px;" />
<pre>
<strong>输入：</strong>root = [2,2,5,null,null,5,7]
<strong>输出：</strong>5
<strong>解释：</strong>最小的值是 2 ，第二小的值是 5 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/15/smbt2.jpg" style="height: 113px; width: 200px;" />
<pre>
<strong>输入：</strong>root = [2,2,2]
<strong>输出：</strong>-1
<strong>解释：</strong>最小的值是 2, 但是不存在第二小的值。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[1, 25]</code> 内</li>
<li><code>1 &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
<li>对于树中每个节点 <code>root.val == min(root.left.val, root.right.val)</code></li>
</ul>


**相似问题：**
- [0230：二叉搜索树中第K小的元素](/leetcode/0230)


## 分析

递归查找大于 root.val 的最小数即可。显然，若当前节点大于 root.val，可以直接返回，无需再遍历子树了。

## 解答

```python
def findSecondMinimumValue(self, root: TreeNode) -> int:
    def help(node):
        if not node:
            return float('inf')
        if node.val > root.val:
            return node.val
        return min(help(node.left), help(node.right))
    res = help(root)
    return res if res < float('inf') else -1
```
40 ms


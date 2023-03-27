# 0111：二叉树的最小深度


> <u>**[力扣第 111 题](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)**</u>

## 题目

<p>给定一个二叉树，找出其最小深度。</p>

<p>最小深度是从根节点到最近叶子节点的最短路径上的节点数量。</p>

<p><strong>说明：</strong>叶子节点是指没有子节点的节点。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg" style="width: 432px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [2,null,3,null,4,null,5,null,6]
<strong>输出：</strong>5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数的范围在 <code>[0, 10<sup>5</sup>]</code> 内</li>
<li><code>-1000 <= Node.val <= 1000</code></li>
</ul>


## 分析

### #1

类似 {{< lc "0104" >}} ，可以用递归。

```python
def minDepth(self, root: TreeNode) -> int:
	if not root:
		return 0
	if not root.left or not root.right:
		return self.minDepth(root.right) + self.minDepth(root.left) + 1
	return min(self.minDepth(root.left), self.minDepth(root.right)) + 1
```
616 ms

### #2

也可以层序遍历，遇到第一个叶子节点即返回。

## 解答

```python
def minDepth(self, root: TreeNode) -> int:
    res, Q = 0, [root] if root else []
    while Q:
        res += 1
        if any(not node.left and not node.right for node in Q):
            break
        Q = [child for node in Q for child in [node.left, node.right] if child]
    return res
```
476 ms


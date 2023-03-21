# 0104：二叉树的最大深度


> <u>**[力扣第 104 题](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)**</u>

## 题目

<p>给定一个二叉树，找出其最大深度。</p>

<p>二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。</p>

<p><strong>说明:</strong> 叶子节点是指没有子节点的节点。</p>

<p><strong>示例：</strong><br>
给定二叉树 <code>[3,9,20,null,null,15,7]</code>，</p>

<pre>    3
/ \
9  20
/  \
15   7</pre>

<p>返回它的最大深度 3 。</p>


## 分析

### #1

层序遍历，记录有多少层即可。

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    res, Q = 0, [root] if root else []
    while Q:
        res += 1
        Q = [child for node in Q for child in [node.left, node.right] if child]
    return res
```
44 ms

### #2

也可以用递归。

## 解答

```python
def maxDepth(self, root: TreeNode) -> int:
	return 0 if not root else max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
```
48 ms


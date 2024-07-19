# 0543：二叉树的直径


> <u>**[力扣第 543 题](https://leetcode.cn/problems/diameter-of-binary-tree/)**</u>

## 题目

<p>给你一棵二叉树的根节点，返回该树的 <strong>直径</strong> 。</p>

<p>二叉树的 <strong>直径</strong> 是指树中任意两个节点之间最长路径的 <strong>长度</strong> 。这条路径可能经过也可能不经过根节点 <code>root</code> 。</p>

<p>两节点之间路径的 <strong>长度</strong> 由它们之间边数表示。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg" style="width: 292px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4,5]
<strong>输出：</strong>3
<strong>解释：</strong>3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [1,2]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[1, 10<sup>4</sup>]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>


**相似问题：**
- [1522：N 叉树的直径](/leetcode/1522)
- [2246：相邻字符不同的最长路径（2126 分）](/leetcode/2246)


## 分析

假设路径经过根节点 root，那么最大长度是 （终点为 root.left 的最大路径长度 + 终点为 root.right 的最大路径长度 + 2）。

为了递归，令辅助函数 help(node) 同时返回 node 的直径长度、向上的终点为 node 的最大路径长度。

再注意下边界条件即可。

## 解答

```python
def diameterOfBinaryTree(self, root: TreeNode) -> int:
	def help(node):
		if not node:
			return -1, -1
		l0, l1 = help(node.left)
		r0, r1 = help(node.right)
		return max(l0, r0, l1+r1+2), 1+max(l1, r1)
	return help(root)[0]
```

52 ms

# 0783：二叉搜索树节点最小距离（1303 分）


> <u>**[力扣第 783 题](https://leetcode.cn/problems/minimum-distance-between-bst-nodes/)**</u>

## 题目

<p>给你一个二叉搜索树的根节点 <code>root</code> ，返回 <strong>树中任意两不同节点值之间的最小差值</strong> 。</p>

<p>差值是一个正数，其数值等于两值之差的绝对值。</p>



<div class="original__bRMd">
<div>
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
<li>树中节点的数目范围是 <code>[2, 100]</code></li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>



<p><strong>注意：</strong>本题与 530：<a href="https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/">https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/</a> 相同</p>
</div>
</div>


**相似问题：**
- [0094：二叉树的中序遍历](/leetcode/0094)


## 分析

与 {{< lc "0530" >}} 完全相同。


## 解答

```python
def minDiffInBST(self, root: TreeNode) -> int:
	res = float('inf')
	stack, pre = [root], float('-inf')
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res, pre = min(res, node - pre), node
		elif node:
			stack.extend([node.right, node.val, node.left])
	return res
```

40 ms



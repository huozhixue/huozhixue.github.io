# 0366：寻找二叉树的叶子节点（★）


> <u>**[力扣第 366 题](https://leetcode.cn/problems/find-leaves-of-binary-tree/)**</u>

## 题目

<p>给你一棵二叉树，请按以下要求的顺序收集它的全部节点：</p>

<ol>
<li>依次从左到右，每次收集并删除所有的叶子节点</li>
<li>重复如上过程直到整棵树为空</li>
</ol>



<p><strong>示例:</strong></p>

<pre><strong>输入: </strong>[1,2,3,4,5]

1
/ \
2   3
/ \
4   5

<strong>输出: </strong>[[4,5,3],[2],[1]]
</pre>



<p><strong>解释:</strong></p>

<p>1. 删除叶子节点 <code>[4,5,3]</code> ，得到如下树结构：</p>

<pre>          1
/
2
</pre>



<p>2. 现在删去叶子节点 <code>[2]</code> ，得到如下树结构：</p>

<pre>          1
</pre>



<p>3. 现在删去叶子节点 <code>[1]</code> ，得到空树：</p>

<pre>          []
</pre>


## 分析


观察发现是按节点的高度从小到大收集，因此用递归并返回节点高度即可。

## 解答

```python
def findLeaves(self, root: TreeNode) -> List[List[int]]:
	def dfs(node):
		if not node:
			return -1
		h = 1+max(dfs(node.left), dfs(node.right))
		if h==len(res):
			res.append([])
		res[h].append(node.val)
		return h

	res = []
	dfs(root)
	return res
```

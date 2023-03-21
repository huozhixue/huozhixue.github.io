# 0589：N 叉树的前序遍历


> <u>**[力扣第 589 题](https://leetcode.cn/problems/n-ary-tree-preorder-traversal/)**</u>

## 题目

<p>给定一个 n 叉树的根节点 <meta charset="UTF-8" /> <code>root</code> ，返回 <em>其节点值的<strong> 前序遍历</strong></em> 。</p>

<p>n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 <code>null</code> 分隔（请参见示例）。</p>

<p><br />
<strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="height: 193px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,3,2,4,null,5,6]
<strong>输出：</strong>[1,3,5,6,2,4]
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="height: 272px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
<strong>输出：</strong>[1,2,3,6,7,11,14,4,8,12,5,9,13,10]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>节点总数在范围<meta charset="UTF-8" /> <code>[0, 10<sup>4</sup>]</code>内</li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
<li>n 叉树的高度小于或等于 <code>1000</code></li>
</ul>



<p><strong>进阶：</strong>递归法很简单，你可以使用迭代法完成此题吗?</p>


## 分析

### #1

先写出递归算法，显然，将根节点、每个子树的前序遍历拼接起来即可。

```python
def preorder(self, root: 'Node') -> List[int]:
	if not root:
		return []
	res = [root.val]
	if root.children:
		for child in root.children:
			res.extend(self.preorder(child))
	return res
```

56 ms

### #2

迭代算法和 0144 类似，注意入栈顺序是子树的反序。

## 解答

```python
def preorder(self, root: 'Node') -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if node:
			res.append(node.val)
			if node.children:
				stack.extend(node.children[::-1])
	return res
```

52 ms


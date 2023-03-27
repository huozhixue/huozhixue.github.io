# 0094：二叉树的中序遍历


> <u>**[力扣第 94 题](https://leetcode.cn/problems/binary-tree-inorder-traversal/)**</u>

## 题目

<p>给定一个二叉树的根节点 <code>root</code> ，返回 <em>它的 <strong>中序</strong> 遍历</em> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg" style="height: 200px; width: 125px;" />
<pre>
<strong>输入：</strong>root = [1,null,2,3]
<strong>输出：</strong>[1,3,2]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[0, 100]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>



<p><strong>进阶:</strong> 递归算法很简单，你可以通过迭代算法完成吗？</p>


## 分析

### #1

先写出递归算法，显然，将左子树的中序遍历、根节点、右子树的中序遍历拼接起来即可。

```python
def inorderTraversal(self, root: TreeNode) -> List[int]:
	return self.inorderTraversal(root.left) + [root.val] + self.inorderTraversal(root.right) if root else []
```
40 ms

### #2

可以借助栈改写成迭代算法：
- 初始栈保存根节点
- 每轮出栈，如果是节点，按 [右子树、节点值、左子树] 顺序入栈
- 如果出栈的是节点值，说明其左子树已经遍历完，将节点值添加到结果中
- 依此循环直到栈空即遍历完毕

## 解答

```python
def inorderTraversal(self, root: TreeNode) -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res.append(node)
		elif node:
			stack.extend([node.right, node.val, node.left])
	return res
```
32 ms


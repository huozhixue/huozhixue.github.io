# 0144：二叉树的前序遍历


> <u>**[力扣第 144 题](https://leetcode.cn/problems/binary-tree-preorder-traversal/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> ，返回它节点值的 <strong>前序</strong><em> </em>遍历。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg" style="width: 202px; height: 324px;" />
<pre>
<strong>输入：</strong>root = [1,null,2,3]
<strong>输出：</strong>[1,2,3]
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

<p><strong>示例 4：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg" style="width: 202px; height: 202px;" />
<pre>
<strong>输入：</strong>root = [1,2]
<strong>输出：</strong>[1,2]
</pre>

<p><strong>示例 5：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg" style="width: 202px; height: 202px;" />
<pre>
<strong>输入：</strong>root = [1,null,2]
<strong>输出：</strong>[1,2]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[0, 100]</code> 内</li>
<li><code>-100 <= Node.val <= 100</code></li>
</ul>



<p><strong>进阶：</strong>递归算法很简单，你可以通过迭代算法完成吗？</p>


## 分析

### #1

先写出递归算法，显然，将根节点、左子树的前序遍历、右子树的前序遍历拼接起来即可。

```python
def preorderTraversal(self, root: TreeNode) -> List[int]:
	return [root.val]+self.preorderTraversal(root.left)+self.preorderTraversal(root.right) if root else []
```

40 ms

### #2

迭代算法类似 {{< lc "0094" >}}，入栈顺序换成 [右子树、左子树] ，节点值不需入栈直接输出即可。

## 解答

```python
def preorderTraversal(self, root: TreeNode) -> List[int]:
	res, stack = [], [root]
	while stack:
		node = stack.pop()
		if node:
			res.append(node.val)
			stack.extend([node.right, node.left])
	return res
```
32 ms


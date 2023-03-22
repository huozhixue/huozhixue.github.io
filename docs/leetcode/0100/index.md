# 0100：相同的树


> <u>**[力扣第 100 题](https://leetcode.cn/problems/same-tree/)**</u>

## 题目

<p>给你两棵二叉树的根节点 <code>p</code> 和 <code>q</code> ，编写一个函数来检验这两棵树是否相同。</p>

<p>如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg" style="width: 622px; height: 182px;" />
<pre>
<strong>输入：</strong>p = [1,2,3], q = [1,2,3]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex2.jpg" style="width: 382px; height: 182px;" />
<pre>
<strong>输入：</strong>p = [1,2], q = [1,null,2]
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/20/ex3.jpg" style="width: 622px; height: 182px;" />
<pre>
<strong>输入：</strong>p = [1,2,1], q = [1,1,2]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>两棵树上的节点数目都在范围 <code>[0, 100]</code> 内</li>
<li><code>-10<sup>4</sup> <= Node.val <= 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

显然两个二叉树相同等价于根节点、左子树、右子树都相同，容易写出递归解法。

```python
def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
    if not p or not q:
        return not p and not q
    return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
```
28 ms

### #2

也可以用迭代。

遍历一遍二叉树，如果每一步经过的节点都相同，那么两个二叉树相同。

为了方便，这里用前序遍历。

## 解答

```python
def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
	stack1, stack2 = [p], [q]
	while stack1:
		p, q = stack1.pop(), stack2.pop()
		if not p and not q:
			continue
		if not p or not q or p.val != q.val:
			return False
		stack1.extend([p.right, p.left])
		stack2.extend([q.right, q.left])
	return True
```
28 ms


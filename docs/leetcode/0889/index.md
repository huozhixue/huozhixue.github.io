# 0889：根据前序和后序遍历构造二叉树（1731 分）


> <u>**[力扣第 98 场周赛第 3 题](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)**</u>

## 题目

<p>给定两个整数数组，<code>preorder</code> 和 <code>postorder</code> ，其中 <code>preorder</code> 是一个具有 <strong>无重复</strong> 值的二叉树的前序遍历，<code>postorder</code> 是同一棵树的后序遍历，重构并返回二叉树。</p>

<p>如果存在多个答案，您可以返回其中 <strong>任何</strong> 一个。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/24/lc-prepost.jpg" style="height: 265px; width: 304px;" /></p>

<pre>
<strong>输入：</strong>preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
<strong>输出：</strong>[1,2,3,4,5,6,7]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> preorder = [1], postorder = [1]
<strong>输出:</strong> [1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= preorder.length &lt;= 30</code></li>
<li><code>1 &lt;= preorder[i] &lt;= preorder.length</code></li>
<li><code>preorder</code> 中所有值都 <strong>不同</strong></li>
<li><code>postorder.length == preorder.length</code></li>
<li><code>1 &lt;= postorder[i] &lt;= postorder.length</code></li>
<li><code>postorder</code> 中所有值都 <strong>不同</strong></li>
<li>保证 <code>preorder</code> 和 <code>postorder</code> 是同一棵二叉树的前序遍历和后序遍历</li>
</ul>




## 分析

和 {{< lc "0105" >}} 类似的思路。pre[0] 和 pos[-1] 是根节点，pre[1] 有两种情况：

	存在左子树，pre[1] 代表左子树
	
	不存在左子树，pre[1] 代表右子树
	
这里有个巧妙的想法。将右子树所有节点移到左子树，二叉树的前序和后序遍历不变。因此可以令 pre[1] 代表左子树。

在 post 中找到 pre[1] 的位置 i，那么 post[:i+1]、post[i+1:-1] 分别代表左子树、右子树。
对应的 pre[1:i+2]、pre[i+2:] 分别代表左子树、右子树。即可递归。

## 解答

```python
def constructFromPrePost(self, pre: List[int], post: List[int]) -> TreeNode:
	if not pre:
		return None
	if len(pre) == 1:
		return TreeNode(pre[0])
	i = post.index(pre[1])
	return TreeNode(pre[0], self.constructFromPrePost(pre[1:i+2], post[:i+1]), self.constructFromPrePost(pre[i+2:], post[i+1:-1]))
```

60 ms


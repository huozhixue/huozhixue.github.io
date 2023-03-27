# 0098：验证二叉搜索树（★）


> <u>**[力扣第 98 题](https://leetcode.cn/problems/validate-binary-search-tree/)**</u>

## 题目

<p>给你一个二叉树的根节点 <code>root</code> ，判断其是否是一个有效的二叉搜索树。</p>

<p><strong>有效</strong> 二叉搜索树定义如下：</p>

<ul>
<li>节点的左子树只包含<strong> 小于 </strong>当前节点的数。</li>
<li>节点的右子树只包含 <strong>大于</strong> 当前节点的数。</li>
<li>所有左子树和右子树自身必须也是二叉搜索树。</li>
</ul>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg" style="width: 302px; height: 182px;" />
<pre>
<strong>输入：</strong>root = [2,1,3]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg" style="width: 422px; height: 292px;" />
<pre>
<strong>输入：</strong>root = [5,1,4,null,null,3,6]
<strong>输出：</strong>false
<strong>解释：</strong>根节点的值是 5 ，但是右子节点的值是 4 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目范围在<code>[1, 10<sup>4</sup>]</code> 内</li>
<li><code>-2<sup>31</sup> &lt;= Node.val &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

有效的二叉搜索树等价于其中序遍历的节点值是递增的，所以中序遍历加个判断即可。

## 解答

```python
def isValidBST(self, root: TreeNode) -> bool:
	pre, stack = float('-inf'), [root]
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			if node <= pre:
				return False
			pre = node
		elif node:
			stack.extend([node.right, node.val, node.left])
	return True
```
52 ms

## *附加

也可以用递归：
- 如果 node 的左子树和右子树都是二叉搜索树，且左子树的数都小于node.val，右子树的数都大于 node.val，node 即为二叉搜索树
- 于是令 dfs(node, low, high) 代表 node 子树是否为 [low, high] 范围内的二叉搜索树，即可递归
- 初始无限制，所以 low/high 设为极小/大值

```python
def isValidBST(self, root: TreeNode) -> bool:
    def dfs(node, low, high):
        if not node:
            return True
        if not low<node.val<high:
            return False
        return dfs(node.left, low, node.val) and dfs(node.right, node.val, high)

    return dfs(root, float('-inf'), float('inf'))
```
36 ms

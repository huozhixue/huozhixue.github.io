# 1080：根到叶路径上的不足节点（1804 分）


> <u>**[力扣第 140 场周赛第 3 题](https://leetcode.cn/problems/insufficient-nodes-in-root-to-leaf-paths/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> 和一个整数 <code>limit</code> ，请你同时删除树中所有 <strong>不足节点 </strong>，并返回最终二叉树的根节点。</p>

<p>假如通过节点 <code>node</code> 的每种可能的 “根-叶” 路径上值的总和全都小于给定的 <code>limit</code>，则该节点被称之为<strong> 不足节点 </strong>，需要被删除。</p>

<p><strong>叶子节点</strong>，就是没有子节点的节点。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/06/05/insufficient-11.png" style="width: 500px; height: 207px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14], limit = 1
<strong>输出：</strong>[1,2,3,4,null,null,7,8,9,null,14]
</pre>

<p><strong class="example">示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/06/05/insufficient-3.png" style="width: 400px; height: 274px;" />
<pre>
<strong>输入：</strong>root = [5,4,8,11,null,17,4,7,1,null,null,5,3], limit = 22
<strong>输出：</strong>[5,4,8,11,null,17,4,7,null,null,null,5]
</pre>

<p><strong class="example">示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2019/06/11/screen-shot-2019-06-11-at-83301-pm.png" style="width: 250px; height: 199px;" />
<pre>
<strong>输入：</strong>root = [1,2,-3,-5,null,4,null], limit = -1
<strong>输出：</strong>[1,null,-3,4]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数目在范围 <code>[1, 5000]</code> 内</li>
<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= limit &lt;= 10<sup>9</sup></code></li>
</ul>




**相似问题：**
- [2265：统计值等于子树平均值的节点数（1472 分）](/leetcode/2265)


## 分析

典型的递归问题。令 dfs(node, s) 代表限制为 s 时 node 删除得到的树：
- 叶子节点如果值小于 s，返回空即可
- 否则，递归得到左右子树 dfs(node.left,s-node.val), dfs(node.right,s-node.val)
- 如果左右子树都为空，则返回空

## 解答

```python
def sufficientSubset(self, root: Optional[TreeNode], limit: int) -> Optional[TreeNode]:
	def dfs(node, s):
		if not node:
			return
		if not node.left and not node.right:
			return None if node.val<s else node
		node.left = dfs(node.left, s-node.val)
		node.right = dfs(node.right, s-node.val)
		return node if node.left or node.right else None
	return dfs(root, limit)
```
76 ms

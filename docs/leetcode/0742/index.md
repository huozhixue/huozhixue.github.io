# 0742：二叉树最近的叶节点（★）


> <u>**[力扣第 742 题](https://leetcode.cn/problems/closest-leaf-in-a-binary-tree/)**</u>

## 题目

<p>给定一个 <strong>每个结点的值互不相同</strong> 的二叉树，和一个目标整数值 <code>k</code>，返回 <em>树中与目标值 <code>k</code>  <strong>最近的叶结点</strong></em> 。 </p>

<p><strong>与叶结点最近</strong><em> </em>表示在二叉树中到达该叶节点需要行进的边数与到达其它叶结点相比最少。而且，当一个结点没有孩子结点时称其为叶结点。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/13/closest1-tree.jpg" /></p>

<pre>
<strong>输入：</strong>root = [1, 3, 2], k = 1
<strong>输出：</strong> 2
<strong>解释：</strong> 2 和 3 都是距离目标 1 最近的叶节点。
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/13/closest2-tree.jpg" /></p>

<pre>
<strong>输入：</strong>root = [1], k = 1
<strong>输出：</strong>1
<strong>解释：</strong>最近的叶节点是根结点自身。
</pre>

<p><strong>示例 3：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/13/closest3-tree.jpg" /></p>

<pre>
<strong>输入：</strong>root = [1,2,3,4,null,null,null,5,null,6], k = 2
<strong>输出：</strong>3
<strong>解释：</strong>值为 3（而不是值为 6）的叶节点是距离结点 2 的最近结点。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>二叉树节点数在 <code>[1, 1000]</code> 范围内</li>
<li><code>1 &lt;= Node.val &lt;= 1000</code></li>
<li>每个节点值都 <strong>不同</strong></li>
<li>给定的二叉树中有某个结点使得 <code>node.val == k</code></li>
</ul>


## 分析

先建树对应的无向图，然后 bfs 找最近的叶节点即可。

注意有根节点的干扰，不能根据节点的度数来判断，所以建图时先记录所有叶节点。

## 解答

```python
def findClosestLeaf(self, root: Optional[TreeNode], k: int) -> int:
	nxt = defaultdict(list)
	stack, leaf = [root], set()
	while stack:
		u = stack.pop()
		if not u.right and not u.left:
			leaf.add(u.val)
			continue
		for v in [u.right,u.left]:
			if v:
				stack.append(v)
				nxt[u.val].append(v.val)
				nxt[v.val].append(u.val)
	Q, vis = deque([k]), {k}
	while Q:
		u = Q.popleft()
		if u in leaf:
			return u
		for v in nxt[u]:
			if v not in vis:
				Q.append(v)
				vis.add(v)
```

60 ms

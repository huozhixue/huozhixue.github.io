# 0437：路径总和 III（★）


> <u>**[力扣第 437 题](https://leetcode.cn/problems/path-sum-iii/)**</u>

## 题目

<p>给定一个二叉树的根节点 <code>root</code> ，和一个整数 <code>targetSum</code> ，求该二叉树里节点值之和等于 <code>targetSum</code> 的 <strong>路径</strong> 的数目。</p>

<p><strong>路径</strong> 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg" style="width: 452px; " /></p>

<pre>
<strong>输入：</strong>root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
<strong>输出：</strong>3
<strong>解释：</strong>和等于 8 的路径有 3 条，如图所示。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
<strong>输出：</strong>3
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>二叉树的节点个数的范围是 <code>[0,1000]</code></li>
<li><meta charset="UTF-8" /><code>-10<sup>9</sup> <= Node.val <= 10<sup>9</sup></code> </li>
<li><code>-1000 <= targetSum <= 1000</code> </li>
</ul>


## 分析

### #1

依然可以采用 {{< lc "0112" >}} 的思路，只不过要传递的信息变成了所有以当前节点结尾的路径和。

于是遍历每个节点，统计以当前节点结尾的路径和等于目标的个数即可。

```python
def pathSum(self, root: TreeNode, sum: int) -> int:
	res, stack = 0, [(root, [])]
	while stack:
		node, tmp = stack.pop()
		if node:
			tmp = [node.val+v for v in tmp+[0]]
			res += tmp.count(sum)
			stack.extend([(node.right, tmp[:]), (node.left,tmp[:])])
	return res
```

192 ms

### #2

还以利用前缀和来节省时间：
- 遍历时，维护从根到当前节点路径上的所有前缀和
- 以当前节点结尾的路径和等于target的个数，即是当前前缀和-target的前缀和个数
- 为了维护前缀和的个数，考虑后序遍历，当节点二次出栈时去掉对应的前缀和

## 解答

```python
def pathSum(self, root: TreeNode, sum: int) -> int:
	d = defaultdict(int)
	d[0] = 1
	res, stack = 0, [(root, 0)]
	while stack:
		node, val = stack.pop()
		if isinstance(node, int):
			d[val] -= 1
		elif node:
			val += node.val
			res += d[val-sum]
			d[val] += 1
			stack.extend([(node.val, val), (node.right, val), (node.left, val)])
	return res
```

60 ms


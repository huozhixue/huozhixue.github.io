# 0437：路径总和 III（★★）


## 题目

给定一个二叉树，它的每个结点都存放着一个整数值。

找出路径和等于给定数值的路径总数。

路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

<!--more--> 

示例：

	root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

		  10
		 /  \
		5   -3
	   / \    \
	  3   2   11
	 / \   \
	3  -2   1

	返回 3。和等于 8 的路径有:

	1.  5 -> 3
	2.  5 -> 2 -> 1
	3.  -3 -> 11


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

本题还有个巧妙的想法，可以利用前缀和来节省时间。
遍历每个节点，统计等于 当前前缀和 - 目标数 的前缀和个数即可。

为了动态维护前缀和的哈希表，考虑后序遍历，当节点二次出栈时去掉对应的前缀和。

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


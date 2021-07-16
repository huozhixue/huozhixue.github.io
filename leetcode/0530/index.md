# 0530：二叉搜索树的最小绝对差（★）


## 题目

给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。

提示：树中至少有 2 个节点。

 <!--more--> 
 
示例：

	输入：

	   1
		\
		 3
		/
	   2

	输出：
	1

	解释：
	最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。
	 
	
## 分析

最简单的就是遍历得到数组，排序后求相邻间隔的最小值。

因为本题是二叉搜索树，所以直接中序遍历即可。

## 解答

```python
def getMinimumDifference(self, root: TreeNode) -> int:
	res = float('inf')
	stack, pre = [root], float('-inf')
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res, pre = min(res, node-pre), node
		elif node:
			stack.extend([node.right, node.val, node.left])
	return res
```

68 ms

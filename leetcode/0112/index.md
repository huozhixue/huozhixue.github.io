# 0112：路径总和（★）


## 题目

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。

叶子节点 是指没有子节点的节点。


<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

	输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
	输出：true
	
示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

	输入：root = [1,2,3], targetSum = 5
	输出：false
	
示例 3：

	输入：root = [1,2], targetSum = 0
	输出：false


## 分析

显然应该遍历找到叶节点，判断对应的路径和是否符合。遍历时，可以将历史路径和传到下一层，就能马上判断了。

这里采用前序遍历，参考 {{< lc "0144" >}} 的代码。

## 解答

```python
def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
	stack = [(root, 0)]
	while stack:
		node, val = stack.pop()
		if node:
			val += node.val
			if not node.left and not node.right and val == targetSum:
				return True
			stack.extend([(node.right, val), (node.left,val)])
	return False
```

60 ms


# 0113：路径总和 II（★）


## 题目

给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。

叶子节点 是指没有子节点的节点。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg)

	输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
	输出：[[5,4,11,2],[5,8,4,5]]

示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

	输入：root = [1,2,3], targetSum = 5
	输出：[]
	
示例 3：

	输入：root = [1,2], targetSum = 0
	输出：[]



## 分析

和 {{< lc "0112" >}} 的不同在于要输出路径。那么遍历时将历史路径传到下一层即可。

## 解答

```python
def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
	res, stack = [], [(root, [])]
	while stack:
		node, tmp = stack.pop()
		if node:
			tmp.append(node.val)
			if not node.left and not node.right and sum(tmp) == targetSum:
				res.append(tmp)
			stack.extend([(node.right, tmp[:]), (node.left,tmp[:])])
	return res
```

60 ms


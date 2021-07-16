# 0783：二叉搜索树节点最小距离（★）


## 题目

给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

提示：

- 树中节点数目在范围 [2, 100] 内
- 0 <= Node.val <= 10^5
- 差值是一个正数，其数值等于两值之差的绝对值

 <!--more--> 
 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg)

	输入：root = [4,2,6,1,3]
	输出：1

示例 2：

![img](https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg)

	输入：root = [1,0,48,null,null,12,49]
	输出：1


## 分析

与 {{< lc "0530" >}} 完全相同。


## 解答

```python
def minDiffInBST(self, root: TreeNode) -> int:
	res = float('inf')
	stack, pre = [root], float('-inf')
	while stack:
		node = stack.pop()
		if isinstance(node, int):
			res, pre = min(res, node - pre), node
		elif node:
			stack.extend([node.right, node.val, node.left])
	return res
```

40 ms



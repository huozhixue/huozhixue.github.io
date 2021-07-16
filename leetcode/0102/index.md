# 0102：二叉树的层序遍历（★）


## 题目

给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

<!--more--> 

示例：

二叉树：[3,9,20,null,null,15,7],

		3
	   / \
	  9  20
		/  \
	   15   7
	   
返回其层序遍历结果：

	[
	  [3],
	  [9,20],
	  [15,7]
	]


## 分析

迭代保存每层的节点即可。

## 解答

```python
def levelOrder(self, root: TreeNode) -> List[List[int]]:
    res, level = [], [root] if root else []
    while level:
        res.append([node.val for node in level])
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```

36 ms


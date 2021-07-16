# 0103：二叉树的锯齿形层序遍历（★）


## 题目

给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

<!--more--> 

例如：

	给定二叉树 [3,9,20,null,null,15,7],

		3
	   / \
	  9  20
		/  \
	   15   7
	   
	返回锯齿形层序遍历如下：

	[
	  [3],
	  [20,9],
	  [15,7]
	]



## 分析

层序遍历，将奇数层的节点反序即可。

## 解答

```python
def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
    res, level = [], [root] if root else []
    while level:
        res.append([node.val for node in (level[::-1] if len(res) % 2 else level)])
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```

40 ms


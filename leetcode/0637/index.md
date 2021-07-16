# 0637：二叉树的层平均值


## 题目

给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。

<!--more--> 

示例 1：

	输入：
		3
	   / \
	  9  20
		/  \
	   15   7
	输出：[3, 14.5, 11]
	解释：
	第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。


## 分析

将 {{< lc "0102" >}} 的每层结果中取均值即可。

## 解答

```python
def averageOfLevels(self, root: TreeNode) -> List[float]:
    if not root:
        return []
    res, level = [], [root]
    while level:
        res.append(sum(node.val for node in level)/len(level))
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```

48 ms


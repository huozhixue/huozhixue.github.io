# 0199：二叉树的右视图（★）


## 题目

给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，
返回从右侧所能看到的节点值。

 

示例 1:

![img](https://assets.leetcode.com/uploads/2021/02/14/tree.jpg)

	输入: [1,2,3,null,5,null,4]
	输出: [1,3,4]

示例 2:

	输入: [1,null,3]
	输出: [1,3]

示例 3:

	输入: []
	输出: []
 

提示:
- 二叉树的节点个数的范围是 [0,100]
- -100 <= Node.val <= 100 



## 分析

层序遍历，保存每层的最后一个元素即可。
 
## 解答

```python
def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
    res, Q = [], [root] if root else []
    while Q:
        res.append(Q[-1].val)
        Q = [child for p in Q for child in [p.left, p.right] if child]
    return res
```
28 ms




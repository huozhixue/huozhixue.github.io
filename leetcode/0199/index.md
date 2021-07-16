# 0199：打家劫舍（★）


## 题目

给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。




 <!--more--> 

示例:

    输入: [1,2,3,null,5,null,4]
    输出: [1, 3, 4]
    解释:
    
       1            <---
     /   \
    2     3         <---
     \     \
      5     4       <---

## 分析

层序遍历，将每层最后一个元素添加到结果中即可。
 
## 解答

```python
def rightSideView(self, root: TreeNode) -> List[int]:
    res, level = [], [root] if root else []
    while level:
        res.append(level[-1].val)
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```

36 ms




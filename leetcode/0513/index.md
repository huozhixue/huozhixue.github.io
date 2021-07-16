# 0513：找树左下角的值（★）


## 题目

给定一个二叉树，在树的最后一行找到最左边的值。

注意: 您可以假设树（即给定的根节点）不为 NULL。

 <!--more--> 
 
示例 1:

    输入:
    
        2
       / \
      1   3
    
    输出:
    1
     

示例 2:

    输入:
    
            1
           / \
          2   3
         /   / \
        4   5   6
           /
          7
    
    输出:
    7
     

## 分析

层序遍历并维护最左边的数即可。

## 解答

```python
def findBottomLeftValue(self, root: TreeNode) -> int:
    res, level = None, [root]
    while level:
        res = level[0].val
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```
44 ms

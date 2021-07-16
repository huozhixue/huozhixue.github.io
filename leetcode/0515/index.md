# 0515：在每个树行中找最大值（★）


## 题目

您需要在二叉树的每一行中找到最大的值。



 <!--more--> 
 
示例：

    输入: 
    
              1
             / \
            3   2
           / \   \  
          5   3   9 
    
    输出: [1, 3, 9]
     

## 分析

层序遍历并取最大值即可。

## 解答

```python
def largestValues(self, root: TreeNode) -> List[int]:
    res, level = [], [root] if root else []
    while level:
        res.append(max(node.val for node in level))
        level = [child for node in level for child in [node.left, node.right] if child]
    return res
```
60 ms

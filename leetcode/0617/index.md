# 0617：合并二叉树（★）


## 题目

给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

你需要将他们合并为一个新的二叉树。
合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，
否则不为 NULL 的节点将直接作为新二叉树的节点。

注意: 合并必须从两个树的根节点开始。

<!--more--> 

示例 1:

    输入: 
        Tree 1                     Tree 2                  
              1                         2                             
             / \                       / \                            
            3   2                     1   3                        
           /                           \   \                      
          5                             4   7                  
    输出: 
    合并后的树:
             3
            / \
           4   5
          / \   \ 
         5   4   7

## 分析

递归合并即可。当有一边为空时，可以直接返回非空的一边。

## 解答

```python
def mergeTrees(self, root1: TreeNode, root2: TreeNode) -> TreeNode:
    if not root1:
        return root2
    if not root2:
        return root1
    return TreeNode(root1.val + root2.val, self.mergeTrees(root1.left, root2.left),
                    self.mergeTrees(root1.right, root2.right))
```

80 ms


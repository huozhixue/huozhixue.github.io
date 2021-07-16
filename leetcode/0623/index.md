# 0623：在二叉树中增加一行（★）


## 题目

给定一个二叉树，根节点为第1层，深度为 1。在其第 d 层追加一行值为 v 的节点。

添加规则：给定一个深度值 d （正整数），针对深度为 d-1 层的每一非空节点 N，
为 N 创建两个值为 v 的左子树和右子树。

将 N 原先的左子树，连接为新节点 v 的左子树；将 N 原先的右子树，连接为新节点 v 的右子树。

如果 d 的值为 1，深度 d - 1 不存在，则创建一个新的根节点 v，原先的整棵树将作为 v 的左子树。

注意:

- 输入的深度值 d 的范围是：[1，二叉树最大深度 + 1]。
- 输入的二叉树至少有一个节点。

<!--more--> 

示例 1:

    输入: 
    二叉树如下所示:
           4
         /   \
        2     6
       / \   / 
      3   1 5   
    
    v = 1
    
    d = 2
    
    输出: 
           4
          / \
         1   1
        /     \
       2       6
      / \     / 
     3   1   5   

示例 2:

    输入: 
    二叉树如下所示:
          4
         /   
        2    
       / \   
      3   1    
    
    v = 1
    
    d = 3
    
    输出: 
          4
         /   
        2
       / \    
      1   1
     /     \  
    3       1
    


## 分析

层序遍历到第 d-1 层，修改每个节点即可。注意 d = 1 时特别处理。

## 解答

```python
def addOneRow(self, root: TreeNode, val: int, depth: int) -> TreeNode:
    if depth == 1:
        return TreeNode(val, root)
    level = [root]
    for _ in range(depth-2):
        level = [child for node in level for child in [node.left, node.right] if child]
    for node in level:
        node.left = TreeNode(val, left=node.left)
        node.right = TreeNode(val, right=node.right)
    return root
```

44 ms


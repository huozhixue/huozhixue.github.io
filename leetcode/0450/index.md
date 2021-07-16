# 0450：删除二叉搜索树中的节点（★★）


## 题目

给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：首先找到需要删除的节点；如果找到了，删除它。

说明： 要求算法时间复杂度为 O(h)，h 为树的高度。

<!--more--> 

示例:

    root = [5,3,6,2,4,null,7]
    key = 3
    
        5
       / \
      3   6
     / \   \
    2   4   7
    
    给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
    
    一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
    
        5
       / \
      4   6
     /     \
    2       7
    
    另一个正确答案是 [5,2,6,null,4,null,7]。
    
        5
       / \
      2   6
       \   \
        4   7



## 分析

假如要删除的不是根节点，转为递归子问题。

假如删除的是根节点且左子树为空，返回右子树即可。

假如删除的是根节点且左子树非空，找到左子树中最大的节点（其必然是没有右子树的），将根节点的右子树作为其右子树即可。

## 解答

```python
def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
    if not root:
        return None
    if root.val > key:
        root.left = self.deleteNode(root.left, key)
    elif root.val < key:
        root.right = self.deleteNode(root.right, key)
    elif not root.left:
        root = root.right
    else:
        p = root.left
        while p.right:
            p = p.right
        p.right = root.right
        root = root.left
    return root
```

76 ms



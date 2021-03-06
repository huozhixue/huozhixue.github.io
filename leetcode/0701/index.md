# 0701：二叉搜索树中的插入操作


## 题目

给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 
输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。

注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果 。

提示：

- 给定的树上的节点数介于 0 和 10^4 之间
- 每个节点都有一个唯一整数值，取值范围从 0 到 10^8
- -10^8 <= val <= 10^8
- 新值和原始二叉搜索树中的任意节点值都不同


 <!--more--> 
 
示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/05/insertbst.jpg)

    输入：root = [4,2,7,1,3], val = 5
    输出：[4,2,7,1,3,5]
    解释：另一个满足题目要求可以通过的树是：

![img](https://assets.leetcode.com/uploads/2020/10/05/bst.jpg)

示例 2：
    
    输入：root = [40,20,60,10,30,50,70], val = 25
    输出：[40,20,60,10,30,50,70,null,null,25]

示例 3：

    输入：root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
    输出：[4,2,7,1,3,5]
 

## 分析

按查找的过程递归，最终到达空节点的位置插入即可。

## 解答

```python
def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:
    if not root:
        return TreeNode(val)
    if root.val < val:
        root.right = self.insertIntoBST(root.right, val)
    elif root.val > val:
        root.left = self.insertIntoBST(root.left, val)
    return root
```

156 ms


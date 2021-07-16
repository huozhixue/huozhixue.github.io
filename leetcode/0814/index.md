# 0814：二叉树剪枝（★★）



## 题目

给定二叉树根结点 root ，此外树的每个结点的值要么是 0，要么是 1。

返回移除了所有不包含 1 的子树的原二叉树。

( 节点 X 的子树为 X 本身，以及所有 X 的后代。)

说明:

- 给定的二叉树最多有 100 个节点。
- 每个节点的值只会为 0 或 1 。


 <!--more--> 
 
示例1:

    输入: [1,null,0,0,1]
    输出: [1,null,0,null,1]
     
    解释: 
    只有红色节点满足条件“所有不包含 1 的子树”。
    右图为返回的答案。

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_2.png)

示例2:

    输入: [1,0,1,0,0,0,1]
    输出: [1,null,1,null,1]

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/06/1028_1.png)

示例3:

    输入: [1,1,0,1,1,0,1,0]
    输出: [1,1,0,1,1,null,1]

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/05/1028.png)



## 分析

递归即可，若 node 剪枝后的左子树或右子树非空或者根节点为 1，则代表 node 包含 1，否则返回 None。

## 解答

```python
def pruneTree(self, root: TreeNode) -> TreeNode:
    def help(node):
        if not node:
            return None
        node.left, node.right = help(node.left), help(node.right)
        return node if node.left or node.right or node.val==1 else None
    return help(root)
```

32 ms


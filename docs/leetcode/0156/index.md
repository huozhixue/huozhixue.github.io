# 0156：上下翻转二叉树（★★）


## 题目

给你一个二叉树的根节点 root ，请你将此二叉树上下翻转，并返回新的根节点。

你可以按下面的步骤翻转一棵二叉树：
1. 原来的左子节点变成新的根节点
2. 原来的根节点变成新的右子节点
3. 原来的右子节点变成新的左子节点

![img](https://assets.leetcode.com/uploads/2020/08/29/main.jpg)

上面的步骤逐层进行。题目数据保证每个右节点都有一个同级节点（即共享同一父节点的左节点）且不存在子节点。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/08/29/updown.jpg)

    输入：root = [1,2,3,4,5]
    输出：[4,5,2,null,null,3,1]

示例 2：
    
    输入：root = []
    输出：[]

示例 3：
    
    输入：root = [1]
    输出：[1]
     
提示：
- 树中节点数目在范围 [0, 10] 内
- 1 <= Node.val <= 10
- 树中的每个右节点都有一个同级节点（即共享同一父节点的左节点）
- 树中的每个右节点都没有子节点

## 分析

注意树中的每个右节点都没有子节点。因此先递归把左子树翻转了，再修改左节点和根节点的指针即可。

## 解答

```python
def upsideDownBinaryTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
    if not root or not root.left:
        return root
    new = self.upsideDownBinaryTree(root.left)
    root.left.left = root.right
    root.left.right = root
    root.left = root.right = None
    return new
```
20 ms



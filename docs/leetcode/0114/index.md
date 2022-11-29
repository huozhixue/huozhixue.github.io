# 0114：二叉树展开为链表（★）


## 题目

给你二叉树的根结点 root ，请你将它展开为一个单链表：
- 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，
而左子指针始终为 null 。
- 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 
 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg)

	输入：root = [1,2,5,3,4,null,6]
	输出：[1,null,2,null,3,null,4,null,5,null,6]

示例 2：

	输入：root = []
	输出：[]

示例 3：

	输入：root = [0]
	输出：[0]
	 
提示：
- 树中结点数在范围 [0, 2000] 内
- -100 <= Node.val <= 100

## 分析

先序遍历 root，每次将上一个节点的 right 指向当前节点即可。

注意要去掉节点的 left 指针。

## 解答

```python
def flatten(self, root: TreeNode) -> None:
    stack, prev = [root], TreeNode()
    while stack:
        node = stack.pop()
        if node:
            stack.extend([node.right, node.left])
            prev.right = node
            node.left = None
            prev = node
```
40 ms


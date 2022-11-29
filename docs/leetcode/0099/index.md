# 0099：恢复二叉搜索树（★★★）


## 题目

给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/28/recover1.jpg)

	输入：root = [1,3,null,null,2]
	输出：[3,1,null,null,2]
	解释：3 不能是 1 左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/28/recover2.jpg)

	输入：root = [3,1,4,null,null,2]
	输出：[2,1,4,null,null,3]
	解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。

提示：
- 树上节点的数目在范围 [2, 1000] 内
- -2^31 <= Node.val <= 2^31 - 1

进阶：使用 O(n) 空间复杂度的解法很容易实现。你能想出一个只使用 O(1) 空间的解决方案吗？

## 分析

二叉搜索树等价于其中序遍历的节点值是递增的，所以可以遍历找到两个错误的节点，然后交换。

第一个错误节点就是第一个大于后继节点的节点，第二个错误节点就是最后一个小于前面节点的节点。

## 解答

```python
def recoverTree(self, root: TreeNode) -> None:
    stack, prev = [(root, 0)], None
    x, y = None, None
    while stack:
        node, flag = stack.pop()
        if flag:
            if prev and prev.val > node.val:
                x, y = x if x else prev, node
            prev = node
        elif node:
            stack.extend([(node.right, 0), (node, 1), (node.left, 0)])
    x.val, y.val = y.val, x.val
```
60 ms

## *附加

要求 O(1) 空间，需要用 
[Morris 中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/)

Morris 遍历减少了空间但也增加了时间，一般不用。

```python
def recoverTree(self, root: TreeNode) -> None:
    x, y, prev = None, None, None
    while root:
        if root.left:
            predecessor = root.left
            while predecessor.right and predecessor.right != root:
                predecessor = predecessor.right
            if not predecessor.right:
                predecessor.right = root
                root = root.left
            else:
                predecessor.right = None
                if prev and root.val < prev.val:
                    x, y = x if x else prev, root
                prev = root
                root = root.right
        else:
            if prev and root.val < prev.val:
                x, y = x if x else prev, root
            prev = root
            root = root.right
    x.val, y.val = y.val, x.val
```
44 ms

# 0230：二叉搜索树中第K小的元素（★）


## 题目

给定一个二叉搜索树的根节点 root ，和一个整数 k ，
请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。


示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg)

    输入：root = [3,1,4,null,2], k = 1
    输出：1
示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg)

    输入：root = [5,3,6,2,4,null,null,1], k = 3
    输出：3

提示：
- 树中的节点数为 n 。
- 1 <= k <= n <= 10^4
- 0 <= Node.val <= 10^4


## 分析

中序遍历到第 k 个数即可。

## 解答

```python
def kthSmallest(self, root: TreeNode, k: int) -> int:
    stack = [root]
    while stack:
        node = stack.pop()
        if isinstance(node, int):
            k -= 1
            if k == 0:
                return node
        elif node:
            stack.extend([node.right, node.val, node.left]
```
52 ms

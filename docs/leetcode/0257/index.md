# 0257：二叉树的所有路径（★）


## 题目

给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。

叶子节点 是指没有子节点的节点。

 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/12/paths-tree.jpg)

	输入：root = [1,2,3,null,5]
	输出：["1->2->5","1->3"]

示例 2：

	输入：root = [1]
	输出：["1"]
 

提示：
- 树中节点的数目在范围 [1, 100] 内
- -100 <= Node.val <= 100


## 分析

遍历时维护根节点到当前节点的路径，遇到叶子节点就加到结果中即可。

## 解答

```python
def binaryTreePaths(self, root: TreeNode) -> List[str]:
    res, stack = [], [(root, '')]
    while stack:
        node, s = stack.pop()
        if node:
            s += ('->' if s else '') + str(node.val)
            if not node.left and not node.right:
                res.append(s)
            stack.extend([(node.right, s), (node.left, s)])
    return res
```
24 ms

# 0669：修剪二叉搜索树（★★）


## 题目

给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。
通过修剪二叉搜索树，使得所有节点的值在[low, high]中。
修剪树不应该改变保留在树中的元素的相对结构（即，如果没有被移除，原有的父代子代关系都应当保留）。
 可以证明，存在唯一的答案。

所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。

提示：

- 树中节点数在范围 [1, 10^4] 内
- 0 <= Node.val <= 10^4
- 树中每个节点的值都是唯一的
- 题目数据保证输入是一棵有效的二叉搜索树
- 0 <= low <= high <= 10^4

 <!--more--> 
    
示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/09/trim1.jpg)

    输入：root = [1,0,2], low = 1, high = 2
    输出：[1,null,2]

示例 2：

![img](https://assets.leetcode.com/uploads/2020/09/09/trim2.jpg)

    输入：root = [3,0,4,null,2,null,null,1], low = 1, high = 3
    输出：[3,2,null,1]

示例 3：

    输入：root = [1], low = 1, high = 2
    输出：[1]

示例 4：

    输入：root = [1,null,2], low = 1, high = 3
    输出：[1,null,2]

示例 5：

    输入：root = [1,null,2], low = 2, high = 4
    输出：[2]

 
	 
## 分析

按是否保留根节点，分别递归即可。

## 解答

```python
def trimBST(self, root: TreeNode, low: int, high: int) -> TreeNode:
    if not root:
        return None
    if root.val < low:
        return self.trimBST(root.right, low, high)
    if root.val > high:
        return self.trimBST(root.left, low, high)
    root.left = self.trimBST(root.left, low, high)
    root.right = self.trimBST(root.right, low, high)
    return root
```
68 ms


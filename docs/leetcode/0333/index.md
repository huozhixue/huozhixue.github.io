# 0333：最大 BST 子树（★★）


## 题目

给定一个二叉树，找到其中最大的二叉搜索树（BST）子树，并返回该子树的大小。
其中，最大指的是子树节点数最多的。

二叉搜索树（BST）中的所有节点都具备以下属性：
- 左子树的值小于其父（根）节点的值。
- 右子树的值大于其父（根）节点的值。

注意：子树必须包含其所有后代。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/17/tmp.jpg)

	输入：root = [10,5,15,1,8,null,7]
	输出：3
	解释：本例中最大的 BST 子树是高亮显示的子树。返回值是子树的大小，即 3 。

示例 2：

	输入：root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]
	输出：2
	 

提示：
- 树上节点数目的范围是 [0, 10^4]
- -10^4 <= Node.val <= 10^4

进阶:  你能想出 O(n) 时间复杂度的解法吗？


## 分析

递归返回其子树是否为 BST、最小/大值、节点数，即可判断是否为 BST，并更新最大节点数。

为了方便，当不为 BST 时，可以返回最小值为 -inf，最大值为 inf。

## 解答

```python
def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
    def dfs(node):
        if not node:
            return 0, inf, -inf
        l1, l2, l3 = dfs(node.left)
        r1, r2, r3 = dfs(node.right)
        if l3<node.val<r2:
            return 1+l1+r1, min(l2, node.val), max(r3, node.val)
        return max(l1, r1), -inf, inf
    return dfs(root)[0]
```
52 ms




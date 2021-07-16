# 0671：二叉树中第二小的节点（★）


## 题目

给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。
如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。

更正式地说，root.val = min(root.left.val, root.right.val) 总成立。

给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。

提示：

- 树中节点数目在范围 [1, 25] 内
- 1 <= Node.val <= 2^31 - 1
- 对于树中每个节点 root.val == min(root.left.val, root.right.val)

 <!--more--> 
 
示例 1：

![img](https://assets.leetcode.com/uploads/2020/10/15/smbt1.jpg)
    
    输入：root = [2,2,5,null,null,5,7]
    输出：5
    解释：最小的值是 2 ，第二小的值是 5 。

示例 2：

![img](https://assets.leetcode.com/uploads/2020/10/15/smbt2.jpg)

    输入：root = [2,2,2]
    输出：-1
    解释：最小的值是 2, 但是不存在第二小的值。
 
	 
## 分析

递归查找大于 root.val 的最小数即可。显然，若当前节点大于 root.val，可以直接返回，无需再遍历子树了。

## 解答

```python
def findSecondMinimumValue(self, root: TreeNode) -> int:
    def help(node):
        if not node:
            return float('inf')
        if node.val > root.val:
            return node.val
        return min(help(node.left), help(node.right))
    res = help(root)
    return res if res < float('inf') else -1
```
40 ms


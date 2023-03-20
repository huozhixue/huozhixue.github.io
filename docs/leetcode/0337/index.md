# 0337：打家劫舍 III（★★）


## 题目

小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，
聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 
如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。

给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。

 

示例 1:

![img](https://assets.leetcode.com/uploads/2021/03/10/rob1-tree.jpg)

	输入: root = [3,2,3,null,3,null,1]
	输出: 7 
	解释: 小偷一晚能够盗取的最高金额 3 + 3 + 1 = 7

示例 2:

![img](https://assets.leetcode.com/uploads/2021/03/10/rob2-tree.jpg)

	输入: root = [3,4,5,1,3,null,1]
	输出: 9
	解释: 小偷一晚能够盗取的最高金额 4 + 5 = 9
 

提示：
- 树的节点数在 [1, 10^4] 范围内
- 0 <= Node.val <= 10^4



## 分析

令 dfs(node) 同时返回
- 能偷的最高金额
- 不偷 node 情况下的最高金额

即可递归。


## 解答

```python
def rob(self, root: TreeNode) -> int:
    def dfs(node):
        if not node:
            return 0, 0
        l1, l2 = dfs(node.left)
        r1, r2 = dfs(node.right)
        return max(node.val+l2+r2, l1+r1), l1+r1
    return dfs(root)[0]
```
48 ms


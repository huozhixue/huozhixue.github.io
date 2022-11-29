# 0108：将有序数组转换为二叉搜索树（★）


## 题目

给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。

高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg)

	输入：nums = [-10,-3,0,5,9]
	输出：[0,-3,9,-10,null,5]
	解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：

示例 2：

![img](https://assets.leetcode.com/uploads/2021/02/18/btree.jpg)


	输入：nums = [1,3]
	输出：[3,1]
	解释：[1,3] 和 [3,1] 都是高度平衡二叉搜索树。

提示：
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- nums 按 严格递增 顺序排列

## 分析

将中点作为根节点，前半部分和后半部分分别作为左子树和右子树，即可转为递归子问题。

## 解答

```python
def sortedArrayToBST(self, nums: List[int]) -> TreeNode:
    def dfs(i, j):
        mid = (i+j)//2
        return None if i==j else TreeNode(nums[mid], dfs(i, mid), dfs(mid+1, j))
    return dfs(0, len(nums))
```
40 ms


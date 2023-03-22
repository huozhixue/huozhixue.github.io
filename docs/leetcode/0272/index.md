# 0272：最接近的二叉搜索树值 II（★★）


## 题目

给定二叉搜索树的根 root 、一个目标值 target 和一个整数 k ，
返回 BST 中最接近目标的 k 个值。你可以按 任意顺序 返回答案。

题目 保证 该二叉搜索树中只会存在一种 k 个值集合最接近 target

 
示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/12/closest1-1-tree.jpg)

	输入: root = [4,2,5,1,3]，目标值 = 3.714286，且 k = 2
	输出: [4,3]

示例 2:

	输入: root = [1], target = 0.000000, k = 1
	输出: [1]
	 

提示：
- 二叉树的节点总数为 n
- 1 <= k <= n <= 10^4
- 0 <= Node.val <= 10^9
- -10^9 <= target <= 10^9

进阶：假设该二叉搜索树是平衡的，请问您是否能在小于 O(n)（ n = total nodes ）的时间复杂度内解决该问题呢？


## 分析

最简单的就是遍历所有值并排序。

## 解答

```python
def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
    A, stack = [], [root]
    while stack:
        p = stack.pop()
        if p:
            A.append(p.val)
            stack.extend([p.right, p.left])
    return nsmallest(k, A, key=lambda x: abs(x-target))
```
48 ms

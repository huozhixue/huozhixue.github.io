# 0255：验证前序遍历序列二叉搜索树（★★★）


## 题目

给定一个 无重复元素 的整数数组 preorder ， 如果它是以二叉搜索树的先序遍历排列 ，返回 true。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/12/preorder-tree.jpg)

	输入: preorder = [5,2,1,3,6]
	输出: true

示例 2：

	输入: preorder = [5,2,6,1,3]
	输出: false
	 

提示:
- 1 <= preorder.length <= 10^4
- 1 <= preorder[i] <= 10^4
- preorder 中 无重复元素
 

进阶：您能否使用恒定的空间复杂度来完成此题？


## 分析

先模拟先序遍历的过程：
- 一开始一直往左走到底
- 如果该节点没有右子树，就返回其根节点
- 如果该节点有右子树，就走到右子树，跳回第一步

根据 preorder 元素的大小可以还原这一过程：
- 递减即是在往左走
- 增大时，假如当前元素为 x ，往左找到最大的小于 x 的元素 y，
y 即是应该返回到的根节点，x 是 y 的右节点
- 假如 x 子树里的某个节点小于 y，即错误

可以用单调栈来具体实现：
- 维护一个单调递减的栈，并维护当前元素所处右子树的根节点的值 bound
- 每来一个元素 x，弹出比 x 小的元素 y，并更新 bound = y
- 假如 x<bound，即错误


## 解答

```python
def verifyPreorder(self, preorder: List[int]) -> bool:
    stack, bound = [], 0
    for x in preorder:
        if x<bound:
            return False
        while stack and stack[-1]<x:
            bound = stack.pop()
        stack.append(x)
    return True
```
48 ms

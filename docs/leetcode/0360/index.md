# 0360：有序转化数组（★★）


## 题目

给你一个已经 排好序 的整数数组 nums 和整数 a 、 b 、 c 。对于数组中的每一个元素 nums[i] ，
计算函数值 f(x) = ax^2 + bx + c ，请 按升序返回数组 。

 

示例 1：

	输入: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
	输出: [3,9,15,33]

示例 2：

	输入: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
	输出: [-23,-5,1,7]
	 

提示：
- 1 <= nums.length <= 200
- -100 <= nums[i], a, b, c <= 100
- nums 按照 升序排列
 

进阶：你可以在时间复杂度为 O(n) 的情况下解决这个问题吗？


## 分析


最简单的排序即可。

要求 O(N) 的话则需要考虑到抛物线的性质，分类讨论即可。


## 解答

```python
def sortTransformedArray(self, nums: List[int], a: int, b: int, c: int) -> List[int]:
    return sorted(a*x*x+b*x+c for x in nums)
```
24 ms


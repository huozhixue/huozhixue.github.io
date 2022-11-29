# 0238：除自身以外数组的乘积（★）


## 题目

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 
nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请不要使用除法，且在 O(n) 时间复杂度内完成此题。


示例 1:

	输入: nums = [1,2,3,4]
	输出: [24,12,8,6]

示例 2:

	输入: nums = [-1,1,0,-3,3]
	输出: [0,0,9,0,0]
	 

提示：
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30
- 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内
 
进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 
出于对空间复杂度分析的目的，输出数组不被视为额外空间。）



## 分析

### #1

要求不用除法，只能考虑 answer[i] 等于 nums[:i] 的连乘再乘以 nums[i+1:] 的连乘。

于是先遍历得到前缀乘和后缀乘，再相乘即可。

```python
def productExceptSelf(self, nums: List[int]) -> List[int]:
    pre = list(accumulate([1]+nums[:-1], mul))
    suf = list(accumulate([1]+nums[:0:-1], mul))[::-1]
    return [a*b for a,b in zip(pre, suf)]
```
48 ms

### #2

要求常数空间，可以用 answer 先保存前缀乘的信息，再遍历后缀乘并修改。

## 解答

```python
def productExceptSelf(self, nums: List[int]) -> List[int]:
    ans, n = [1], len(nums)
    for i in range(n-1):
        ans.append(nums[i]*ans[-1])
    suf = 1
    for i in range(n-1, -1, -1):
        ans[i] *= suf
        suf *= nums[i]
    return ans
```
52 ms

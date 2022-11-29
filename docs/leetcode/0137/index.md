# 0137：只出现一次的数字 II（★★★）


## 题目

给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。
请你找出并返回那个只出现了一次的元素。

 

示例 1：

	输入：nums = [2,2,3,2]
	输出：3

示例 2：

	输入：nums = [0,1,0,1,0,1,99]
	输出：99
	 

提示：
- 1 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次

进阶：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？


## 分析

### #1

最简单的依然是哈希表。

```python
def singleNumber(self, nums: List[int]) -> int:
    return [x for x,freq in Counter(nums).items() if freq==1].pop()
```
32 ms

### #2

要不用额外空间实现，有个非常巧妙的位运算方法：
{{< link "逻辑电路角度详细分析该题思路" 
"https://leetcode-cn.com/problems/single-number-ii/solution/luo-ji-dian-lu-jiao-du-xiang-xi-fen-xi-gai-ti-si-l/" >}}。

## 解答

```python
def singleNumber(self, nums: List[int]) -> int:
	X, Y = 0, 0
	for Z in nums:
		Y = Y^Z & ~X
		X = X^Z & ~Y
	return Y
```
48 ms


# 0169：多数元素（★）


## 题目


给定一个大小为 n 的数组 nums ，返回其中的多数元素。
多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1：

	输入：nums = [3,2,3]
	输出：3

示例 2：

	输入：nums = [2,2,1,1,1,2,2]
	输出：2
 

提示：
- n == nums.length
- 1 <= n <= 5 * 104
- -10^9 <= nums[i] <= 10^9
 

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
    

## 分析

### #1

时间复杂度 O(N) 很简单，直接计数即可。

```python
def majorityElement(self, nums: List[int]) -> int:
	ct = Counter(nums)
	return max(ct, key=ct.get)
```

### #2

要求空间复杂度 O(1)，有个经典的摩尔投票法 ：
- 在 nums 中任意消除两个不同的数直到剩下的数都相同
- 假如 nums 中存在多数元素，那么该元素必然会留下来
- 因此返回最终留下来的数即可
 
## 解答

```python
def majorityElement(self, nums: List[int]) -> int:
    cand, cnt = None, 0
    for num in nums:
        cand = cand if cnt else num
        cnt += 1 if num == cand else -1
    return cand
```
56 ms



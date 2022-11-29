# 0015：三数之和（★★）


## 题目

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。


示例 1：

	输入：nums = [-1,0,1,2,-1,-4]
	输出：[[-1,-1,2],[-1,0,1]]
	
示例 2：

	输入：nums = []
	输出：[]
	
示例 3：

	输入：nums = [0]
	输出：[]

提示：
- 0 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5


## 分析

取不重复元组的问题，采用排序并跳过相同数字的通用方法即可。

然后类似 {{< lc "0001" >}} ，可以用哈希表优化最后一层的查找。

## 解答

```python
def threeSum(self, nums: List[int]) -> List[List[int]]:
    nums.sort()
    d = {num: i for i, num in enumerate(nums)}
    res, n = [], len(nums)
    for i in range(n - 2):
        if i and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 1):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            k = d.get(-nums[i] - nums[j], -1)
            if k > j:
                res.append([nums[i], nums[j], nums[k]])
    return res
```
时间复杂度 O(N^2)，852 ms

# 0018：四数之和（★★）


## 题目

你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组
 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
- 0 <= a, b, c, d < n
- a、b、c 和 d 互不相同
- nums[a] + nums[b] + nums[c] + nums[d] == target

你可以按 任意顺序 返回答案 。


示例 1：

	输入：nums = [1,0,-1,0,-2,2], target = 0
	输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

示例 2：

	输入：nums = [2,2,2,2,2], target = 8
	输出：[[2,2,2,2]]
 

提示：
- 1 <= nums.length <= 200
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9


## 分析

### #1

类似 {{< lc "0015" >}}，不过是多加了一重循环。

```python
def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
    nums.sort()
    d = {x: i for i, x in enumerate(nums)}
    res, n = [], len(nums)
    for i in range(n-3):
        if i and nums[i]==nums[i-1]:
            continue
        for j in range(i+1, n-2):
            if j>i+1 and nums[j]==nums[j-1]:
                continue
            for k in range(j+1, n-1):
                if k>j+1 and nums[k]==nums[k-1]:
                    continue
                kk = d.get(target-nums[i]-nums[j]-nums[k], -1)
                if kk > k:
                    res.append([nums[i], nums[j], nums[k], nums[kk]])
    return res
```
时间复杂度 O(N^3)，1132 ms

### #2

本题的循环轮数较多，可以加强限制，例如：
- sum(nums[i:i+4])>target 时可以跳出循环
- nums[i]+sum(nums[-3:])<target 时，可以跳过 i

## 解答

```python
def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
    nums.sort()
    d = {x: i for i, x in enumerate(nums)}
    res, n = [], len(nums)
    for i in range(n-3):
        if sum(nums[i:i+4])>target:
            break
        if (i and nums[i]==nums[i-1]) or nums[i]+sum(nums[-3:])<target:
            continue
        for j in range(i+1, n-2):
            if nums[i]+sum(nums[j:j+3])>target:
                break
            if (j>i+1 and nums[j]==nums[j-1]) or nums[i]+nums[j]+sum(nums[-2:])<target:
                continue
            for k in range(j+1, n-1):
                if nums[i]+nums[j]+sum(nums[k:k+2])>target:
                    break
                if k>j+1 and nums[k]==nums[k-1]:
                    continue
                kk = d.get(target-nums[i]-nums[j]-nums[k], -1)
                if kk > k:
                    res.append([nums[i], nums[j], nums[k], nums[kk]])
    return res
```
48 ms

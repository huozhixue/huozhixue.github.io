# 0016：最接近的三数之和（★★）


## 题目

给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。


示例 1：

	输入：nums = [-1,2,1,-4], target = 1
	输出：2
	解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

示例 2：

	输入：nums = [0,0,0], target = 1
	输出：0
 

提示：
- 3 <= nums.length <= 1000
- -1000 <= nums[i] <= 1000
- -10^4 <= target <= 10^4

     
## 分析

### #1

类似 {{< lc "0015" >}} ，可以先排序再取元组 <a, b, c>。

但本题最后一个数 c 不能直接用哈希表获得。
要查找一个最接近 target-a-b 的数，容易想到用二分查找。

```python
def threeSumClosest(self, nums: List[int], target: int) -> int:
    nums.sort()
    res, n = float('inf'), len(nums)
    for i in range(n-2):
        for j in range(i+1, n-1):
            t0 = target-nums[i]-nums[j]
            pos = bisect_left(nums, t0, j+1, n-1)
            for k in [pos-1, pos]:
                if k>j and abs(t0-nums[k])<abs(target-res):
                    res = nums[i]+nums[j]+nums[k]
    return res
```
时间复杂度 $O(N^2 logN)$，944 ms

### #2

还有个更巧妙的双指针解法。

排序后先固定数 nums[i]，然后寻找 nums[j]、nums[k] 使得两数之和最接近 target-nums[i]。
- 初始指针 j、k 分别指向 i+1, n-1。
- 如果 nums[j]+nums[k]<target-nums[i]，则 nums[j] 与任意 [j+1,k-1] 内的数相加都更小，离 target 更远，
故可以不再考虑 nums[j]，缩小查找范围为 [j+1,k]
- 同理，如果 nums[j]+nums[k]<target-nums[i]，可以缩小查找范围为 [j, k-1]
- 循环操作直到 j、k 相遇，取过程中最接近的和即可


## 解答

```python
def threeSumClosest(self, nums: List[int], target: int) -> int:
    nums.sort()
    res, n = float('inf'), len(nums)
    for i in range(n - 2):
        j, k = i + 1, n - 1
        while j < k:
            s = nums[i] + nums[j] + nums[k]
            if abs(s - target) < abs(res - target):
                res = s
            if s < target:
                j += 1
            else:
                k -= 1
    return res
```
时间复杂度 $O(N^2)$，368 ms
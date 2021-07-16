# 0016：最接近的三数之和（★★）


## 题目

给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

<!--more--> 


示例：

	输入：nums = [-1,2,1,-4], target = 1
	输出：2
	解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。



## 分析

### #1

类似 {{< lc "0015" >}} ，可以先排序，然后遍历前两个数 nums[i]、nums[j]。

区别在于本题中最后一个数 nums[k] 不能直接用哈希表获得，
但可以用二分查找最接近 target-nums[i]-nums[j] 的数。

```python
def threeSumClosest(self, nums: List[int], target: int) -> int:
    nums.sort()
    res, n = float('inf'), len(nums)
    for i in range(n-2):
        for j in range(i+1, n-1):
            pos = bisect_left(nums, target-nums[i]-nums[j], j+1, n-1)
            for k in [pos-1, pos]:
                if j < k and abs(target-nums[i]-nums[j]-nums[k]) < abs(target-res):
                    res = nums[i]+nums[j]+nums[k]
    return res
```

776 ms

### #2

还有个更巧妙的双指针解法。排序后先固定数 nums[i]，然后是寻找 nums[j]、nums[k] 使得两数之和最接近
target-nums[i]。

    初始指针 j、k 分别指向 i+1, n-1。
    
    如果 nums[j]+nums[k]<target-nums[i]，则 nums[j] 与任意 [j+1,k-1] 内的数相加都更小，离 target 更远。
    故可以不再考虑 nums[j]，缩小查找范围为 [j+1,k]。

    同理，如果 nums[j]+nums[k]<target-nums[i]，可以缩小查找范围为 [j, k-1]。
    
    循环操作直到 j、k 相遇，取过程中最接近的和即可。


## 解答

```python
def threeSumClosest(self, nums: List[int], target: int) -> int:
    nums.sort()
    res, n = float('inf'), len(nums)
    for i in range(n-2):
        j, k = i+1, n-1
        while j < k:
            Sum = nums[i] + nums[j] + nums[k]
            if Sum == target:
                return Sum
            if abs(Sum-target) < abs(res-target):
                res = Sum
            if Sum < target:
                j += 1
            else:
                k -= 1
    return res
```

128 ms

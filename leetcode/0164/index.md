# 0164：最大间距（★★★）


## 题目

给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

如果数组元素个数小于 2，则返回 0。

说明:

- 你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
- 请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。


<!--more--> 

示例 1:

    输入: [3,6,9,1]
    输出: 3
    解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。

示例 2:

    输入: [10]
    输出: 0
    解释: 数组元素个数小于 2，因此返回 0。


## 分析

### #1

最简单的是排序后遍历每个间距即可。

```python
def maximumGap(self, nums: List[int]) -> int:
    nums.sort()
    return max((nums[i+1]-nums[i] for i in range(len(nums)-1)), default=0)
```

228 ms

### #2

题目要求线性时间排序，数据范围又较大，故想到用桶排序。

有个巧妙的想法是，只要桶长小于等于最大差值，那么桶内元素就无需比较，
只需要比较相邻桶的相邻元素间距即可。
而最大差值必定大于等于 值的范围 // 间距个数，所以桶长取它即可。

要特别注意边界条件，n 小于 2 时返回0，size 不能取 0。
 
## 解答

```python
def maximumGap(self, nums: List[int]) -> int:
    n, Min, Max = len(nums), min(nums), max(nums)
    if n < 2 or Min == Max:
        return 0
    bucket, size = defaultdict(list), max(1, (Max-Min)//(n-1))
    for num in nums:
        bucket[num//size].append(num)
    res, pre = 0, float('inf')
    for k in range(Min//size, Max//size+1):
        if bucket[k]:
            res = max(res, min(bucket[k])-pre)
            pre = max(bucket[k])
    return res
```

652 ms




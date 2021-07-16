# 0220：存在重复元素 III（★★）


## 题目

给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，
使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。

如果存在则返回 true，不存在返回 false。


提示：

- 0 <= nums.length <= 2 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 10^4
- 0 <= t <= 2^31 - 1

<!--more--> 

示例 1：
    
    输入：nums = [1,2,3,1], k = 3, t = 0
    输出：true

示例 2：
    
    输入：nums = [1,0,1,1], k = 1, t = 2
    输出：true

示例 3：

    输入：nums = [1,5,9,1,5,9], k = 2, t = 3
    输出：false



## 分析

### #1

暴力做法是遍历 j，在 [j-k, j-1] 范围中查找数 x 使得 abs(nums[j]-x) <= t 。

假如 [j-k, j-1] 范围内的数有序排列，则可以二分查找数 x。
因此考虑维护一个长度 k 的有序列表。

python 维护有序列表可以直接用 list，实际速度很快。

```python
def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
    tmp = []
    for j, num in enumerate(nums):
        if j > k:
            tmp.pop(bisect_left(tmp, nums[j-k-1]))
        pos = bisect_left(tmp, num)
        if pos and abs(num-tmp[pos-1])<=t:
            return True
        if pos < len(tmp) and abs(num-tmp[pos])<=t:
            return True
        tmp[pos:pos] = [num]
    return False
```
136 ms

### #2

还有个巧妙的桶排序方法。将 [j-k, j-1] 范围内的数分别放入 t+1 大小的桶。

    假如 nums[j] 所应放的桶 key 已经有数 x 了，显然 abs(nums[j]-x) <= t，返回 True。
    假如相邻的桶 key-1 或 key+1 中的数 x 满足 abs(nums[j]-x) <= t，返回 True。
    否则，[j-k, j-1] 范围内不存在满足的数 x。
    
因此，维护桶的状态即可在 O(1) 时间内查找数 x。

## 解答

```python
def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
    bucket, size = {}, t + 1
    for j, num in enumerate(nums):
        if j > k:
            bucket.pop(nums[j-k-1]//size)
        key = num // size
        if key in bucket:
            return True
        if key-1 in bucket and abs(num-bucket[key-1])<=t:
            return True
        if key+1 in bucket and abs(num-bucket[key+1])<=t:
            return True
        bucket[key] = num
    return False
```

64 ms



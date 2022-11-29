# 0220：存在重复元素 III（★★）


## 题目

给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，
使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。

如果存在则返回 true，不存在返回 false。

示例 1：
    
    输入：nums = [1,2,3,1], k = 3, t = 0
    输出：true

示例 2：
    
    输入：nums = [1,0,1,1], k = 1, t = 2
    输出：true

示例 3：

    输入：nums = [1,5,9,1,5,9], k = 2, t = 3
    输出：false

提示：
- 0 <= nums.length <= 2 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 10^4
- 0 <= t <= 2^31 - 1



## 分析

### #1

{{< lc "0219" >}} 升级版，要找的不是相同数而是一个范围内的数了。
- 考虑维护窗口 [j-k, j-1] 有序，即可二分查找离 nums[j] 最近的数
- 有序窗口要进行插入、删除、查找操作，考虑用有序集合 SortedList 实现

```python
def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
    from sortedcontainers import SortedList
    sl = SortedList()
    for j, num in enumerate(nums):
        if j > k:
            sl.remove(nums[j-k-1])
        pos = sl.bisect_left(num)
        for x in [pos-1, pos]:
            if 0<=x<len(sl) and abs(sl[x]-num) <= t:
                return True
        sl.add(num)
    return False
```
376 ms


### #2

还有个巧妙的桶排序方法。
- 桶的 size 设为 t+1，维护窗口 [j-k, j-1] 的桶状态。
- 符合条件的数和 nums[j] 要么在一个桶，要么在相邻桶
- 如果某个桶有两个元素，显然已经符合了
- 因此每轮最多与三个桶中的唯一元素比较，时间复杂度 O(N)
    
## 解答

```python
def containsNearbyAlmostDuplicate(self, nums: List[int], k: int, t: int) -> bool:
    bucket, size = {}, t + 1
    for j, num in enumerate(nums):
        if j > k:
            bucket.pop(nums[j - k - 1] // size)
        key = num // size
        if any(kk in bucket and abs(bucket[kk]-num)<=t for kk in [key, key-1, key+1]):
            return True
        bucket[key] = num
    return False
```
64 ms



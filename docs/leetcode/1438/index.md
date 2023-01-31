# 1438：绝对差不超过限制的最长连续子数组（★★）


> **第 187 场周赛第 3 题**

## 题目

给你一个整数数组 nums ，和一个表示限制的整数 limit，请你返回最长连续子数组的长度，
该子数组中的任意两个元素之间的绝对差必须小于或者等于 limit 。

如果不存在满足条件的子数组，则返回 0 。

 
示例 1：

    输入：nums = [8,2,4,7], limit = 4
    输出：2 
    解释：所有子数组如下：
    [8] 最大绝对差 |8-8| = 0 <= 4.
    [8,2] 最大绝对差 |8-2| = 6 > 4. 
    [8,2,4] 最大绝对差 |8-2| = 6 > 4.
    [8,2,4,7] 最大绝对差 |8-2| = 6 > 4.
    [2] 最大绝对差 |2-2| = 0 <= 4.
    [2,4] 最大绝对差 |2-4| = 2 <= 4.
    [2,4,7] 最大绝对差 |2-7| = 5 > 4.
    [4] 最大绝对差 |4-4| = 0 <= 4.
    [4,7] 最大绝对差 |4-7| = 3 <= 4.
    [7] 最大绝对差 |7-7| = 0 <= 4. 
    因此，满足题意的最长子数组的长度为 2 。

示例 2：
    
    输入：nums = [10,1,2,4,7,2], limit = 5
    输出：4 
    解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。

示例 3：
    
    输入：nums = [4,2,2,2,4,4,2,2], limit = 0
    输出：3
     
提示：
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^9
- 0 <= limit <= 10^9

## 分析

### #1

显然可以遍历结尾下标 j，找最小的 i 使得 max(nums[i:j+1])-min(nums[i:j+1])<=limit。

注意到随着 j 递增，i 必然不递减，因此是一个滑动窗口问题。

要维护 nums[i:j+1] 的最大值和最小值，考虑用有序集合。

```python
def longestSubarray(self, nums: List[int], limit: int) -> int:
    from sortedcontainers import SortedList
    sl = SortedList()
    res, i = 0, 0
    for j, num in enumerate(nums):
        sl.add(num)
        while sl[-1]-sl[0]>limit:
            sl.remove(nums[i])
            i += 1
        res = max(res, j-i+1)
    return res
```
1164 ms

### #2

也可以用两个单调队列分别维护窗口的最大/小值。

## 解答

```python
def longestSubarray(self, nums: List[int], limit: int) -> int:
    que1, que2 = deque(), deque()
    res, i = 0, 0
    for j, num in enumerate(nums):
        while que1 and que1[-1][0]<=num:
            que1.pop()
        while que2 and que2[-1][0]>=num:
            que2.pop()
        que1.append((num, j))
        que2.append((num, j))
        while que1[0][0]-que2[0][0]>limit:
            if que1[0][1] == i:
                que1.popleft()
            if que2[0][1] == i:
                que2.popleft()
            i += 1
        res = max(res, j-i+1)
    return res
```
328 ms



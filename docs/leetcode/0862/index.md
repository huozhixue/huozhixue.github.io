# 0862：和至少为 K 的最短子数组（★★★）


> **第 91 场周赛第 4 题**

## 题目

给你一个整数数组 nums 和一个整数 k ，找出 nums 中和至少为 k 的 最短非空子数组 ，
并返回该子数组的长度。如果不存在这样的 子数组 ，返回 -1 。

子数组 是数组中 连续 的一部分。

 
示例 1：

    输入：nums = [1], k = 1
    输出：1

示例 2：

    输入：nums = [1,2], k = 4
    输出：-1

示例 3：
    
    输入：nums = [2,-1,2], k = 3
    输出：3
 

提示：
- 1 <= nums.length <= 10^5
- -10^5 <= nums[i] <= 10^5
- 1 <= k <= 10^9

 
 
## 分析

### #1

涉及到子数组的和，首先想到前缀和。得到前缀和数组 pre 后，问题转为：
求最小的 j-i 使得 pre[i]<=pre[j]-K。

暴力法就是遍历位置 j，在 pre[:j] 中找最大的满足要求的 i。

注意到如果 x < y 且 pre[x] >= pre[y]，那么 y 比 x 更优，在后面的遍历中都可以排除 x。

因此可以维护一个严格递增的栈 stack，保存有用的位置和值。
然后就可以二分查找最大的 i 了。
	
```python
def shortestSubarray(self, nums: List[int], k: int) -> int:
    pre = list(accumulate([0]+nums))
    res, stack = float('inf'), []
    for j,x in enumerate(pre):
        while stack and stack[-1][0]>=x:
            stack.pop()
        pos = bisect_right(stack, (x-k, float('inf')))-1
        if pos>=0:
            res = min(res, j-stack[pos][1])
        stack.append((x, j))
    return res if res<float('inf') else -1
```
时间复杂度 O(N*logN)，728 ms

### #2

还有个巧妙的想法。对于栈中的 i，当遍历到第一个 j 使得 pre[i]<=pre[j]-K，那么以 i 开头的最短子数组就是
pre[i:j+1]，可以弹出 i 并更新结果。

因此，可以维护一个单调队列。

## 解答

```python
def shortestSubarray(self, nums: List[int], k: int) -> int:
    pre = list(accumulate([0]+nums))
    res, queue = float('inf'), deque()
    for j,x in enumerate(pre):
        while queue and queue[-1][0]>=x:
            queue.pop()
        while queue and queue[0][0]<=x-k:
            res = min(res, j-queue.popleft()[1])
        queue.append((x, j))
    return res if res<float('inf') else -1
```
时间复杂度 O(N)，464 ms


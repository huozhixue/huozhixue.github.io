# 0239：滑动窗口最大值（★★★）


## 题目

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。
你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

提示：

- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length

<!--more--> 

示例 1：

	输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
	输出：[3,3,5,5,6,7]
	解释：
	滑动窗口的位置                最大值
	---------------               -----
	[1  3  -1] -3  5  3  6  7       3
	 1 [3  -1  -3] 5  3  6  7       3
	 1  3 [-1  -3  5] 3  6  7       5
	 1  3  -1 [-3  5  3] 6  7       5
	 1  3  -1  -3 [5  3  6] 7       6
	 1  3  -1  -3  5 [3  6  7]      7
	 
示例 2：

	输入：nums = [1], k = 1
	输出：[1]
	
示例 3：

	输入：nums = [1,-1], k = 1
	输出：[1,-1]
	
示例 4：

	输入：nums = [9,11], k = 2
	输出：[11]
	
示例 5：

	输入：nums = [4,-2], k = 2
	输出：[4]
 


## 分析

### #1

可以维护一个长度为 k 的升序列表 tmp，显然对应的窗口最大值即为 tmp[-1]。

```python
def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    res, tmp = [], []
    for j, num in enumerate(nums):
        pos = bisect_right(tmp, num)
        tmp[pos:pos] = [num]
        if j >= k:
            tmp.pop(bisect_left(tmp, nums[j-k]))
        if j >= k-1:
            res.append(tmp[-1])
    return res
```

3040 ms

### #2

有个巧妙的想法是当窗口内存在 i<j 且 nums[i]<=nums[j] 时，nums[i] 可以去掉。

因此可以维护一个严格单调递减的列表，优化时间。
注意要弹出过时元素，所以用一个单调队队列保存 (位置，值)。

## 解答

```python
def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
    res, queue = [], deque()
    for j, num in enumerate(nums):
        while queue and queue[-1][1] <= num:
            queue.pop()
        queue.append((j, num))
        if queue[0][0] == j-k:
            queue.popleft()
        if j >= k-1:
            res.append(queue[0][1])
    return res
```

456 ms

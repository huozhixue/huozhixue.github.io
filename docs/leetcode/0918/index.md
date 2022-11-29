# 0918：环形子数组的最大和（★★）


## 题目

给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。

环形数组 意味着数组的末端将会与开头相连呈环状。形式上， nums[i] 的下一个元素是 nums[(i + 1) % n] ， 
nums[i] 的前一个元素是 nums[(i - 1 + n) % n] 。

子数组 最多只能包含固定缓冲区 nums 中的每个元素一次。形式上，对于子数组 nums[i], nums[i + 1], ..., nums[j] ，
不存在 i <= k1, k2 <= j 其中 k1 % n == k2 % n 。


示例 1：

    输入：nums = [1,-2,3,-2]
    输出：3
    解释：从子数组 [3] 得到最大和 3

示例 2：

    输入：nums = [5,-3,5]
    输出：10
    解释：从子数组 [5,5] 得到最大和 5 + 5 = 10

示例 3：

    输入：nums = [3,-2,2,-3]
    输出：3
    解释：从子数组 [3] 和 [3,-2,2] 都可以得到最大和 3
     

提示：
- n == nums.length
- 1 <= n <= 3 * 10^4
- -3 * 10^4 <= nums[i] <= 3 * 10^4


## 分析

### #1

涉及到子数组的和，首先想到前缀和。因为是环形数组，所以考虑求 nums*2 的前缀和。

得到前缀和数组 pre 后，问题转为：求最大的 pre[j]-pre[i] 满足 j-i<=len(nums)。

那么遍历 j，维护 pre[j-n:j] 的最小值即可。这类似于 {{< lc "0239" >}}，可以用有序集合解决。

```python
def maxSubarraySumCircular(self, nums: List[int]) -> int:
    from sortedcontainers import SortedList
    pre = list(accumulate([0]+nums*2))
    sl, n = SortedList(), len(nums)
    res = float('-inf')
    for j, x in enumerate(pre):
        if j:
            res = max(res, x-sl[0])
        sl.add(x)
        if j>=n:
            sl.remove(pre[j-n])
    return res
```
时间复杂度 O(N*logN)，1472 ms

### #2

也可以采用 {{< lc "0239" >}} 的单调队列方法。


## 解答

```python
def maxSubarraySumCircular(self, nums: List[int]) -> int:
    pre = list(accumulate([0]+nums*2))
    queue, n = deque(), len(nums)
    res = float('-inf')
    for j, x in enumerate(pre):
        if j:
            res = max(res, x-queue[0][0])
        while queue and queue[-1][0]>=x:
            queue.pop()
        queue.append((x, j))
        if queue[0][1]==j-n:
            queue.popleft()
    return res
```
时间复杂度 O(N)，340 ms


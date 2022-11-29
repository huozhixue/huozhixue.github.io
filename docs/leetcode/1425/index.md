# 1425：带限制的子序列和（★★★）




## 题目

给你一个整数数组 nums 和一个整数 k ，请你返回 非空 子序列元素和的最大值，
子序列需要满足：子序列中每两个 相邻 的整数 nums[i] 和 nums[j] ，它们在原数组中的下标 i 和 j 满足 i < j 且 j - i <= k 。

数组的子序列定义为：将数组中的若干个数字删除（可以删除 0 个数字），剩下的数字按照原本的顺序排布。


示例 1：
    
    输入：nums = [10,2,-10,5,20], k = 2
    输出：37
    解释：子序列为 [10, 2, 5, 20] 。

示例 2：

    输入：nums = [-1,-2,-3], k = 1
    输出：-1
    解释：子序列必须是非空的，所以我们选择最大的数字。

示例 3：
    
    输入：nums = [10,-2,-10,-5,20], k = 2
    输出：23
    解释：子序列为 [10, -2, -5, 20] 。
     

提示：
- 1 <= k <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4



## 分析

### #1

令 dp[j] 代表以 nums[j] 结尾的满足要求的最大子序列和，那么显然可以递推：

    dp[j] = nums[j]+max(dp[j-k:j]+[0])
    
但是这样时间复杂度为 O(N*K)，会超时。

注意到递推式中本质是在求滑动窗口的最大值，因此类似 {{< lc "0239" >}}，可以用有序集合解决。

>本题滑动窗口的区别在于，数组并不是一开始就给定的，而是边递推边滑动的。

```python
def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
    from sortedcontainers import SortedList
    sl, dp = SortedList(), nums[:]
    for j, num in enumerate(nums):
        if j:
            dp[j] = num + max(0, sl[-1])
        sl.add(dp[j])
        if j>=k:
            sl.remove(dp[j-k])
    return max(dp)
```
时间复杂度 O(N*logN)，3032 ms

### #2

也可以采用 {{< lc "0239" >}} 的单调队列方法。


## 解答

```python
def constrainedSubsetSum(self, nums: List[int], k: int) -> int:
    queue, dp = deque(), nums[:]
    for j, num in enumerate(nums):
        dp[j] = num + max(0, queue[0][0] if queue else 0)
        while queue and queue[-1][0]<=dp[j]:
            queue.pop()
        queue.append((dp[j], j))
        if queue[0][1] == j-k:
            queue.popleft()
    return max(dp)
```
时间复杂度 O(N)，652 ms



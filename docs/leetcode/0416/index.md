# 0416：分割等和子集（★★）


## 题目

给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，
使得两个子集的元素和相等。

示例 1：

    输入：nums = [1,5,11,5]
    输出：true
    解释：数组可以分割成 [1, 5, 5] 和 [11] 。
示例 2：
    
    输入：nums = [1,2,3,5]
    输出：false
    解释：数组不能分割成两个元素和相等的子集。
 
提示：
- 1 <= nums.length <= 200
- 1 <= nums[i] <= 100


## 分析

### #1

令 s=sum(nums)，s 为奇数时显然无解。s 为偶数时，问题等价于找子集使得和为 s//2。

注意到 s//2 最大为 10^4，于是考虑递推 nums[:i] 能得到的所有子集和。

令 dp[i] 代表nums[:i] 能得到的所有小于等于 s//2 的子集和，那么

    dp[i] = dp[i-1] | {x+nums[i-1] for x in dp[i-1] if x+nums[i-1]<=s//2}
    
只要递推过程中找到 s//2 即为真。

```python
def canPartition(self, nums: List[int]) -> bool:
    s = sum(nums)
    if s%2:
        return False
    res = {0}
    for num in nums:
        for x in list(res):
            if x+num==s//2:
                return True
            if x+num<s//2:
                res.add(x+num)
    return False
```
380 ms

### #2

还有个巧妙的想法，可以将集合状态压缩为一个数 state，然后集合内所有数加上 num 得到的集合即是 state<<num。

这样显著优化了递推的时间。

## 解答

```python
def canPartition(self, nums: List[int]) -> bool:
    s = sum(nums)
    if s % 2:
        return False
    state = 1
    for num in nums:
        state |= state << num
        if state & (1 << (s//2)):
            return True
    return False
```
32 ms


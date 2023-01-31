# 1995：统计特殊四元组（★）


> **第 257 场周赛第 1 题**

## 题目

给你一个 下标从 0 开始 的整数数组 nums ，返回满足下述条件的 不同 四元组 (a, b, c, d) 的 数目 ：
- nums[a] + nums[b] + nums[c] == nums[d] ，且
- a < b < c < d

提示：
- 4 <= nums.length <= 50
- 1 <= nums[i] <= 100

示例 1：

    输入：nums = [1,2,3,6]
    输出：1
    解释：满足要求的唯一一个四元组是 (0, 1, 2, 3) 因为 1 + 2 + 3 == 6 。

示例 2：

    输入：nums = [3,3,6,4,5]
    输出：0
    解释：[3,3,6,4,5] 中不存在满足要求的四元组。

示例 3：

    输入：nums = [1,1,1,3,5]
    输出：4
    解释：满足要求的 4 个四元组如下：
    - (0, 1, 2, 3): 1 + 1 + 1 == 3
    - (0, 1, 3, 4): 1 + 1 + 3 == 5
    - (0, 2, 3, 4): 1 + 1 + 3 == 5
    - (1, 2, 3, 4): 1 + 1 + 3 == 5

## 分析

### #1

最简单的就是固定 c 和 d，在 [0, c) 中求和等于 nums[d]-nums[c] 的二元组个数，可以用哈希表。

```python
def countQuadruplets(self, nums: List[int]) -> int:
    res, n = 0, len(nums)
    for d in range(n):
        for c in range(d):
            ct = Counter()
            for b in range(c):
                res += ct[nums[d]-nums[c]-nums[b]]
                ct[nums[b]] += 1
    return res
```
时间复杂度 O(N^3)，628 ms

### #2

注意到数据范围很小，所以考虑直接统计 nums[:d] 中的 {三元组的和: 三元组的个数} 哈希表。

nums[:i+1] 的三元组计数显然可以由 nums[i] 和 nums[:i] 中 {二元组的和: 二元组的个数} 哈希表得到。
同理，nums[:i+1] 的二元组计数可以由 nums[i] 和 Counter(nums[:i]) 得到。

令 dp3[i]、dp2[i]、dp1[i] 分别代表 nums[:i+1] 的三元组计数、二元组计数、哈希表计数。那么：

    dp1[i], dp2[i], dp3[i] = dp1[i-1].copy(), dp2[i-1].copy(), dp3[i-1].copy()
    dp1[i][nums[i]] += 1
    for x in dp1[i-1]:
        dp2[i][x+nums[i]] += dp1[i-1][x]
    for x in dp2[i-1]:
        dp3[i][x+nums[i]] += dp2[i-1][x]

> 具体实现时，可以用将 dp1、dp2、dp3 分别优化为 1 个哈希表 ct1、ct2、ct3，
>注意要按 ct3、ct2、ct1 的顺序更新，防止相互影响。

## 解答

```python
def countQuadruplets(self, nums: List[int]) -> int:
    res, ct1, ct2, ct3 = 0, Counter(), Counter(), Counter()
    for num in nums:
        res += ct3[num]
        for x in ct2:
            ct3[x+num] += ct2[x]
        for x in ct1:
            ct2[x+num] += ct1[x]
        ct1[num] += 1
    return res
```
时间复杂度 O(N*S)，116 ms


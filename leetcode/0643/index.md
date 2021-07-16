# 0643：子数组最大平均数 I


## 题目

给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。

提示：

- 1 <= k <= n <= 30,000。
- 所给数据范围 [-10,000，10,000]。


<!--more--> 

示例：

    输入：[1,12,-5,-6,50,3], k = 4
    输出：12.75
    解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75


## 分析

遍历子数组取最大值即可，相邻的子数组之和可以递推得到。

## 解答

```python
def findMaxAverage(self, nums: List[int], k: int) -> float:
    res, s = float('-inf'), 0
    for i, num in enumerate(nums):
        s += num
        if i >= k:
            s -= nums[i-k]
        if i >= k-1:
            res = max(res, s/k)
    return res
```

312 ms


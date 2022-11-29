# 0042：接雨水（★★★）


## 题目

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。


示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

	输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
	输出：6
	解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，
	可以接 6 个单位的雨水（蓝色部分表示雨水）。 
	
示例 2：

	输入：height = [4,2,0,3,2,5]
	输出：9

提示：
- n == height.length
- 1 <= n <= 2 * 10^4
- 0 <= height[i] <= 10^5

## 分析 

### #1

观察发现：
- 对于任一柱子，如果左右都有更高的柱子，那么该位置就能接到雨水。
- 设左右最高的柱子分别为 L, R, 该位置能接到的雨水数量为 min(L, R) - 柱子高度。
- 每根柱子对应的 L 和 R 可以一趟递推得到，优化为线性时间复杂度。

```python
def trap(self, height: List[int]) -> int:
    left = list(accumulate(height, max))
    right = list(accumulate(height[::-1], max))[::-1]
    return sum(min(l, r)-h for h,l,r in zip(height, left, right))
```
时间复杂度 O(N)，64 ms

### #2

还有个巧妙的双指针方法可以一趟解决。
- 初始 i、j 分别指向数组首尾
- 若 max(height[:i+1]) <= max(height[j:])，可求得位置 i 处的雨水，然后移动 i
- 若 max(height[:i+1]) >= max(height[j:])，可求得位置 j 处的雨水，然后移动 j
- 循环操作直到 i、j 相遇，即可得到每个位置处的雨水

## 解答

```python
def trap(self, height: List[int]) -> int:
    res, L, R = 0, 0, 0
    i, j = 0, len(height)-1
    while i <= j:
        L, R = max(L, height[i]), max(R, height[j])
        if L <= R:
            res += L - height[i]
            i += 1
        else:
            res += R - height[j]
            j -= 1
    return res
```
时间复杂度 O(N)，64 ms

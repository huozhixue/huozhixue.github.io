# 0042：接雨水（★★★）


## 题目

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。


<!--more--> 
示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)

	输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
	输出：6
	解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，
	可以接 6 个单位的雨水（蓝色部分表示雨水）。 
	
示例 2：

	输入：height = [4,2,0,3,2,5]
	输出：9


## 分析 

### #1

观察发现，对于任一柱子，如果左右都有更高的柱子，那么该位置就能接到雨水。
设左右最高的柱子分别为 maxL, maxR, 该位置能接到的雨水数量为 min(maxL, maxR) - 柱子高度。

```python
def trap(self, height: List[int]) -> int:
	return sum(min(max(height[:i+1]), max(height[i:]))-h for i, h in enumerate(height))
```

1668 ms

### #2

每根柱子的 MaxL 和 maxR 可以一趟递推得到，优化为线性时间复杂度。

```python
def trap(self, height: List[int]) -> int:
	n = len(height)
	maxL, maxR = [0]*n, [0]*n
	for i in range(n):
		maxL[i] = max(height[i], maxL[i-1] if i else 0)
	for i in range(n-1, -1, -1):
		maxR[i] = max(height[i], maxR[i+1] if i<n-1 else 0)
	return sum(min(maxL[i], maxR[i])-h for i, h in enumerate(height))
```

48 ms

### #3

还有个巧妙的双指针方法可以一趟解决。

    初始 i、j 初始分别指向数组首位

	若 max(height[:i+1]) <= max(height[j:])，那么位置 i 处的雨水就已经知道了，可以移动 i
	
	若 max(height[:i+1]) >= max(height[j:])，那么位置 j 处的雨水就已经知道了，可以移动 j

	循环操作直到 i、j 相遇，即可得到每个位置处的雨水。


## 解答

```python
def trap(self, height: List[int]) -> int:
	res, maxL, maxR, i, j = 0, 0, 0, 0, len(height)-1
	while i <= j:
		maxL, maxR = max(maxL, height[i]), max(maxR, height[j])
		if maxL <= maxR:
			res += maxL - height[i]
			i += 1
		else:
			res += maxR - height[j]
			j -= 1
	return res
```

40 ms

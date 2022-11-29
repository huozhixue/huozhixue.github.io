# 0011：盛最多水的容器（★★★）


## 题目

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。


示例 1：

![img](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)


    输入：[1,8,6,2,5,4,8,3,7]
    输出：49 
    解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。
    在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例 2：
    
    输入：height = [1,1]
    输出：1

	
提示：
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4
	
## 分析

本题是经典的双指针问题。
- 初始指针 i、j 分别指向 height 的首尾，组成容器 C。
- 如果 height[i]<=height[j]，则 i 与任意 [i+1,j-1] 内的线组成的容器都小于 C，
故可以不再考虑 height[i]，缩小查找范围为 [i+1,j]
- 同理，如果 height[i]>=height[j]，可以缩小查找范围为 [i, j-1]
- 循环操作直到 i、j 相遇，取过程中的最大容器即可。

## 解答

```python
def maxArea(self, height: List[int]) -> int:
    res, i, j = 0, 0, len(height)-1
    while i < j:
        res = max(res, (j-i)*min(height[i], height[j]))
        if height[i] <= height[j]:
            i += 1
        else:
            j -= 1
    return res
```
236 ms

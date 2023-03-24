# 0011：盛最多水的容器（★）


> <u>**[力扣第 11 题](https://leetcode.cn/problems/container-with-most-water/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的整数数组 <code>height</code> 。有 <code>n</code> 条垂线，第 <code>i</code> 条线的两个端点是 <code>(i, 0)</code> 和 <code>(i, height[i])</code> 。</p>

<p>找出其中的两条线，使得它们与 <code>x</code> 轴共同构成的容器可以容纳最多的水。</p>

<p>返回容器可以储存的最大水量。</p>

<p><strong>说明：</strong>你不能倾斜容器。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg" /></p>

<pre>
<strong>输入：</strong>[1,8,6,2,5,4,8,3,7]
<strong>输出：</strong>49
<strong>解释：</strong>图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>height = [1,1]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == height.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

本题是经典的双指针问题。
- 初始指针 i、j 分别指向 height 的首尾，组成容器 C。
- 如果 height[i]<=height[j]，则 i 与任意 [i+1,j-1] 内的线组成的容器都小于 C，故可以不再考虑 height[i]，缩小查找范围为 [i+1,j]
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
时间 O(N)，236 ms

# 0396：旋转函数（★）


> <u>**[力扣第 396 题](https://leetcode.cn/problems/rotate-function/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的整数数组 <code>nums</code> 。</p>

<p>假设 <code>arr<sub>k</sub></code> 是数组 <code>nums</code> 顺时针旋转 <code>k</code> 个位置后的数组，我们定义 <code>nums</code> 的 <strong>旋转函数</strong>  <code>F</code> 为：</p>

<ul>
<li><code>F(k) = 0 * arr<sub>k</sub>[0] + 1 * arr<sub>k</sub>[1] + ... + (n - 1) * arr<sub>k</sub>[n - 1]</code></li>
</ul>

<p>返回 <em><code>F(0), F(1), ..., F(n-1)</code>中的最大值 </em>。</p>

<p>生成的测试用例让答案符合 <strong>32 位</strong> 整数。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [4,3,2,6]
<strong>输出:</strong> 26
<strong>解释:</strong>
F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
所以 F(0), F(1), F(2), F(3) 中的最大值是 F(3) = 26 。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [100]
<strong>输出:</strong> 0
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>
</ul>




## 分析

观察发现 F(k) 可以递推：

$$F[k] = F[k-1]+sum(A)-len(A)*A[-k]$$
## 解答

```python
class Solution:
    def maxRotateFunction(self, nums: List[int]) -> int:
        s,n = sum(nums),len(nums)
        f = sum(i*x for i,x in enumerate(nums))
        res = f
        for x in nums[::-1]:
            f = f+s-n*x
            res = max(res,f)
        return res
```
227 ms



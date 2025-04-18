# 1458：两个子序列的最大点积（1823 分）


> <u>**[力扣第 190 场周赛第 4 题](https://leetcode.cn/problems/max-dot-product-of-two-subsequences/)**</u>

## 题目

<p>给你两个数组 <code>nums1</code> 和 <code>nums2</code> 。</p>

<p>请你返回 <code>nums1</code> 和 <code>nums2</code> 中两个长度相同的 <strong>非空</strong> 子序列的最大点积。</p>

<p>数组的非空子序列是通过删除原数组中某些元素（可能一个也不删除）后剩余数字组成的序列，但不能改变数字间相对顺序。比方说，<code>[2,3,5]</code> 是 <code>[1,2,3,4,5]</code> 的一个子序列而 <code>[1,5,3]</code> 不是。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [2,1,-2,5], nums2 = [3,0,-6]
<strong>输出：</strong>18
<strong>解释：</strong>从 nums1 中得到子序列 [2,-2] ，从 nums2 中得到子序列 [3,-6] 。
它们的点积为 (2*3 + (-2)*(-6)) = 18 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [3,-2], nums2 = [2,-6,7]
<strong>输出：</strong>21
<strong>解释：</strong>从 nums1 中得到子序列 [3] ，从 nums2 中得到子序列 [7] 。
它们的点积为 (3*7) = 21 。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [-1,-1], nums2 = [1,1]
<strong>输出：</strong>-1
<strong>解释：</strong>从 nums1 中得到子序列 [-1] ，从 nums2 中得到子序列 [1] 。
它们的点积为 -1 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums1.length, nums2.length &lt;= 500</code></li>
<li><code>-1000 &lt;= nums1[i], nums2[i] &lt;= 100</code></li>
</ul>



<p><strong>点积：</strong></p>

<pre>
定义 <code><strong>a</strong> = [<em>a</em><sub>1</sub>, <em>a</em><sub>2</sub>,…, <em>a</em><sub><em>n</em></sub>]</code> 和<strong> <code>b</code></strong><code> = [<em>b</em><sub>1</sub>, <em>b</em><sub>2</sub>,…, <em>b</em><sub><em>n</em></sub>]</code> 的点积为：

<img alt="\mathbf{a}\cdot \mathbf{b} = \sum_{i=1}^n a_ib_i = a_1b_1 + a_2b_2 + \cdots + a_nb_n " class="tex" src="https://pic.leetcode-cn.com/1666164309-PBJMQp-image.png" />

这里的 <strong>Σ</strong> 指示总和符号。
</pre>




## 分析

按结尾是否凑一对递推即可

## 解答


```python
class Solution:
    def maxDotProduct(self, nums1: List[int], nums2: List[int]) -> int:
        m,n = len(nums1), len(nums2)
        f = [-inf]*(n+1)
        for x in nums1:
            g = [-inf]*(n+1)
            for j,y in enumerate(nums2):
                g[j+1] = max(f[j+1],g[j],x*y+max(0,f[j]))
            f = g
        return f[-1]
```
155 ms

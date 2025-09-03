# 3299：连续子序列的和（★★）


> <u>**[力扣第 3299 题](https://leetcode.cn/problems/sum-of-consecutive-subsequences/)**</u>

## 题目

<p>如果一个长度为 <code>n</code> 的数组 <code>arr</code> 符合下面其中一个条件，可以称它 <strong>连续</strong>：</p>

<ul>
<li>对于所有的 <code>1 &lt;= i &lt; n</code>，<code>arr[i] - arr[i - 1] == 1</code>。</li>
<li>对于所有的 <code>1 &lt;= i &lt; n</code>，<code>arr[i] - arr[i - 1] == -1</code>。</li>
</ul>

<p>数组的 <strong>值</strong> 是其元素的和。</p>

<p>例如，<code>[3, 4, 5]</code> 是一个值为 12 的连续数组，并且 <code>[9, 8]</code> 是另一个值为 17 的连续数组。而 <code>[3, 4, 3]</code> 和 <code>[8, 6]</code> 都不连续。</p>

<p>给定一个整数数组 <code>nums</code>，返回所有 <strong>连续</strong> 非空 <span data-keyword="subsequence-array">子序列</span> 的 <strong>值</strong> 之和。</p>

<p>由于答案可能很大，返回它对 <code>10<sup>9 </sup>+ 7</code> <strong>取模</strong> 的值。</p>

<p><strong>注意</strong> 长度为 1 的数组也被认为是连续的。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [1,2]</span></p>

<p><strong>输出：</strong><span class="example-io">6</span></p>

<p><strong>解释：</strong></p>

<p>连续子序列为 <code>[1]</code>，<code>[2]</code>，<code>[1, 2]</code>。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [1,4,2,3]</span></p>

<p><span class="example-io"><b>输出：</b>31</span></p>

<p><strong>解释：</strong></p>

<p>连续子序列为：<code>[1]</code>，<code>[4]</code>，<code>[2]</code>，<code>[3]</code>，<code>[1, 2]</code>，<code>[2, 3]</code>，<code>[4, 3]</code>，<code>[1, 2, 3]</code>。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

- 维护以 x 结尾的递增/减连续子序列个数和、子序列总和，即可递推
- 长度为 1 的子序列被统计了两次，减去即可

## 解答


```python
class Solution:
    def getSum(self, nums: List[int]) -> int:
        mod = 10**9+7
        def cal(A):
            f = defaultdict(int)
            g = defaultdict(int)
            for x in A:
                add = 1+f[x-1]
                f[x] = (f[x]+add)%mod
                g[x] = (g[x]+g[x-1]+x*add)%mod
            return sum(g.values())%mod   
        return (cal(nums)+cal(nums[::-1])-sum(nums))%mod  
```
769 ms

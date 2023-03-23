# 0259：较小的三数之和（★）


> <u>**[力扣第 259 题](https://leetcode.cn/problems/3sum-smaller/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的整数数组和一个目标值 <code>target</code> ，寻找能够使条件 <code>nums[i] + nums[j] + nums[k] &lt; target</code> 成立的三元组  <code>i, j, k</code> 个数（<code>0 &lt;= i &lt; j &lt; k &lt; n</code>）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong><em>nums</em> = <code>[-2,0,1,3]</code>, <em>target</em> = 2
<strong>输出: </strong>2
<strong>解释: </strong>因为一共有两个三元组满足累加和小于 2:
[-2,0,1]
[-2,0,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入: </strong><em>nums</em> = <code>[]</code>, <em>target</em> = 0
<strong>输出: </strong>0 </pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入: </strong><em>nums</em> = <code>[0]</code>, <em>target</em> = 0
<strong>输出: </strong>0 </pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>0 &lt;= n &lt;= 3500</code></li>
<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>
<li><code>-100 &lt;= target &lt;= 100</code></li>
</ul>


## 分析

注意到数的范围很小，因此考虑递推出 所有可能的三元组之和及其个数。

令 dp[i][j] 代表 nums[:i] 所有可能的 j 元组之和及其个数，即可递推。

因为 dp[i] 只依赖于 dp[i-1]，所以可以优化为 3 个计数器。

## 解答

```python
def threeSumSmaller(self, nums: List[int], target: int) -> int:
    d1, d2, d3 = [defaultdict(int) for _ in range(3)]
    for x in nums:
        for y in d2:
            d3[x+y] += d2[y]
        for y in d1:
            d2[x+y] += d1[y]
        d1[x] += 1
    return sum(d3[x] for x in d3 if x<target)
```
116 ms

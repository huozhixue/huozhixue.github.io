# 3141：最大汉明距离（★★）


> <u>**[力扣第 3141 题](https://leetcode.cn/problems/maximum-hamming-distances/)**</u>

## 题目

<p>给定一个数组 <code>nums</code> 和一个整数 <code>m</code>，每个元素 <code>nums[i]</code> 满足 <code>0 &lt;= nums[i] &lt; 2<sup>m</sup></code>，返回数组 <code>answer</code>。<code>answer</code> 数组应该与 <code>nums</code>  有相同的长度，每个元素 <code>answer[i]</code> 表示 <code>nums[i]</code> 和数组中其它任何元素 <code>nums[j]</code> 的最大 <strong>汉明距离</strong>。</p>

<p>两个二进制整数之间的 <strong>汉明距离</strong> 定义为对应位上二进制位不同的数量（如果需要，添加前置零）。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [9,12,9,11], m = 4</span></p>

<p><strong>输出：</strong><span class="example-io">[2,3,2,3]</span></p>

<p><strong>解释：</strong></p>

<p>二进制表示为 <code>nums = [1001,1100,1001,1011]</code>。</p>

<p>每个下标的最大汉明距离为：</p>

<ul>
<li><code>nums[0]</code>：1001 与 1100 距离为 2。</li>
<li><code>nums[1]</code>：1100 与 1011 距离为 3。</li>
<li><code>nums[2]</code>：1001 与 1100 距离为 2。</li>
<li><code>nums[3]</code>：1011 与 1100 距离为 3。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">nums = [3,4,6,10], m = 4</span></p>

<p><strong>输出：</strong><span class="example-io">[3,3,2,3]</span></p>

<p><strong>解释：</strong></p>

<p>二进制表示为 <code>nums = [0011,0100,0110,1010]</code>。</p>

<p>每个下标的最大汉明距离为：</p>

<ul>
<li><code>nums[0]</code>：0011 与 0100 距离为 3。</li>
<li><code>nums[1]</code>：0100 与 0011 距离为 3。</li>
<li><code>nums[2]</code>：0110 与 1010 距离为 2。</li>
<li><code>nums[3]</code>：1010 与 0100 距离为 3。</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m &lt;= 17</code></li>
<li><code>2 &lt;= nums.length &lt;= 2<sup>m</sup></code></li>
<li><code>0 &lt;= nums[i] &lt; 2<sup>m</sup></code></li>
</ul>




## 分析

- 等价于求 nums[i] 的反码与数组中任意元素的最短距离
- 可以用多源 bfs 预处理出 [0,2^m) 每个数到数组元素的最短距离

## 解答


```python
class Solution:
    def maxHammingDistances(self, nums: List[int], m: int) -> List[int]:
        N = 1<<m
        dq = set(nums)
        d = [inf]*N
        for x in nums:
            d[x] = 0
        while dq:
            tmp,dq = dq,[]
            for u in tmp:
                for i in range(m):
                    v = u^1<<i
                    if d[v]==inf:
                        d[v] = d[u]+1
                        dq.append(v)
        return [m-d[x^(N-1)] for x in nums]
```
849 ms

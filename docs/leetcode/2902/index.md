# 2902：和带限制的子多重集合的数目（2758 分）


> <u>**[力扣第 115 场双周赛第 4 题](https://leetcode.cn/problems/count-of-sub-multisets-with-bounded-sum/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的非负整数数组 <code>nums</code> 和两个整数 <code>l</code> 和 <code>r</code> 。</p>

<p>请你返回 <code>nums</code> 中子多重集合的和在闭区间 <code>[l, r]</code> 之间的 <strong>子多重集合的数目</strong> 。</p>

<p>由于答案可能很大，请你将答案对 <code>10<sup>9 </sup>+ 7</code> 取余后返回。</p>

<p><strong>子多重集合</strong> 指的是从数组中选出一些元素构成的 <strong>无序</strong> 集合，每个元素 <code>x</code> 出现的次数可以是 <code>0, 1, ..., occ[x]</code> 次，其中 <code>occ[x]</code> 是元素 <code>x</code> 在数组中的出现次数。</p>

<p><b>注意：</b></p>

<ul>
<li>如果两个子多重集合中的元素排序后一模一样，那么它们两个是相同的 <strong>子多重集合</strong> 。</li>
<li><strong>空</strong> 集合的和是 <code>0</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [1,2,2,3], l = 6, r = 6
<b>输出：</b>1
<b>解释：</b>唯一和为 6 的子集合是 {1, 2, 3} 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [2,1,4,2,7], l = 1, r = 5
<b>输出：</b>7
<b>解释：</b>和在闭区间 [1, 5] 之间的子多重集合为 {1} ，{2} ，{4} ，{2, 2} ，{1, 2} ，{1, 4} 和 {1, 2, 2} 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>nums = [1,2,1,3,5,2], l = 3, r = 5
<b>输出：</b>9
<b>解释：</b>和在闭区间 [3, 5] 之间的子多重集合为 {3} ，{5} ，{1, 2} ，{1, 3} ，{2, 2} ，{2, 3} ，{1, 1, 2} ，{1, 1, 3} 和 {1, 2, 2} 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>nums</code> 的和不超过 <code>2 * 10<sup>4</sup></code> 。</li>
<li><code>0 &lt;= l &lt;= r &lt;= 2 * 10<sup>4</sup></code></li>
</ul>


## 分析

- 类似 {{< lc "2585" >}}，采用前缀和优化的多重背包即可
- 特别注意元素 0 

## 解答


```python
class Solution:
    def countSubMultisets(self, nums: List[int], l: int, r: int) -> int:
        mod = 10**9+7
        ct = Counter(nums)
        f = [1+ct[0]]+[0]*r
        del ct[0]
        for x,w in ct.items():
            for j in range(x,r+1):
                f[j] = (f[j]+f[j-x])%mod
            a = w*x+x
            for j in range(r,a-1,-1):
                f[j] = (f[j]-f[j-a])%mod
        return sum(f[l:])%mod
```
1771 ms

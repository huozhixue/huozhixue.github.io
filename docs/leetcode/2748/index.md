# 2748：美丽下标对的数目（1301 分）


> <u>**[力扣第 351 场周赛第 1 题](https://leetcode.cn/problems/number-of-beautiful-pairs/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 。如果下标对 <code>i</code>、<code>j</code> 满足 <code>0 ≤ i &lt; j &lt; nums.length</code> ，如果 <code>nums[i]</code> 的 <strong>第一个数字</strong> 和 <code>nums[j]</code> 的 <strong>最后一个数字</strong> <strong>互质</strong> ，则认为 <code>nums[i]</code> 和 <code>nums[j]</code> 是一组 <strong>美丽下标对</strong> 。</p>

<p>返回 <code>nums</code> 中 <strong>美丽下标对</strong> 的总数目。</p>

<p>对于两个整数 <code>x</code> 和 <code>y</code> ，如果不存在大于 1 的整数可以整除它们，则认为 <code>x</code> 和 <code>y</code> <strong>互质</strong> 。换而言之，如果 <code>gcd(x, y) == 1</code> ，则认为 <code>x</code> 和 <code>y</code> 互质，其中 <code>gcd(x, y)</code> 是 <code>x</code> 和 <code>y</code> 的 <strong>最大公因数</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,5,1,4]
<strong>输出：</strong>5
<strong>解释：</strong>nums 中共有 5 组美丽下标对：
i = 0 和 j = 1 ：nums[0] 的第一个数字是 2 ，nums[1] 的最后一个数字是 5 。2 和 5 互质，因此 gcd(2,5) == 1 。
i = 0 和 j = 2 ：nums[0] 的第一个数字是 2 ，nums[2] 的最后一个数字是 1 。2 和 1 互质，因此 gcd(2,1) == 1 。
i = 1 和 j = 2 ：nums[1] 的第一个数字是 5 ，nums[2] 的最后一个数字是 1 。5 和 1 互质，因此 gcd(5,1) == 1 。
i = 1 和 j = 3 ：nums[1] 的第一个数字是 5 ，nums[3] 的最后一个数字是 4 。5 和 4 互质，因此 gcd(5,4) == 1 。
i = 2 和 j = 3 ：nums[2] 的第一个数字是 1 ，nums[3] 的最后一个数字是 4 。1 和 4 互质，因此 gcd(1,4) == 1 。
因此，返回 5 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [11,21,12]
<strong>输出：</strong>2
<strong>解释：</strong>共有 2 组美丽下标对：
i = 0 和 j = 1 ：nums[0] 的第一个数字是 1 ，nums[1] 的最后一个数字是 1 。gcd(1,1) == 1 。
i = 0 和 j = 2 ：nums[0] 的第一个数字是 1 ，nums[2] 的最后一个数字是 2 。gcd(1,2) == 1 。
因此，返回 2 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 100</code></li>
<li><code>1 &lt;= nums[i] &lt;= 9999</code></li>
<li><code>nums[i] % 10 != 0</code></li>
</ul>


## 分析

遍历时维护首位 i 的个数，即可计数。

## 解答


```python
class Solution:
    def countBeautifulPairs(self, nums: List[int]) -> int:
        ct = defaultdict(int)
        res = 0
        for x in nums:
            x = str(x)
            for k in ct:
                if gcd(k,int(x[-1]))==1:
                    res += ct[k]
            ct[int(x[0])]+=1
        return res
```
89 ms

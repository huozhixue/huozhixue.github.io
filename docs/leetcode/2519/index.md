# 2519：统计 K-Big 索引的数量（★★）


> <u>**[力扣第 2519 题](https://leetcode.cn/problems/count-the-number-of-k-big-indices/)**</u>

## 题目

<p>给定一个 <strong>下标从0开始</strong> 的整数数组 <code>nums</code> 和一个正整数 <code>k</code> 。</p>

<p>如果满足以下条件，我们称下标 <code>i</code> 为 <strong>k-big</strong> ：</p>

<ul>
<li>存在至少 <code>k</code> 个不同的索引 <code>idx1</code> ，满足 <code>idx1 &lt; i</code> 且 <code>nums[idx1] &lt; nums[i]</code> 。</li>
<li>存在至少 <code>k</code> 个不同的索引 <code>idx2</code> ，满足 <code>idx2 &gt; i</code> 且 <code>nums[idx2] &lt; nums[i]</code> 。</li>
</ul>

<p>返回 k-big 索引的数量。</p>



<p><strong class="example">示例 1 ：</strong></p>

<pre>
<b>输入：</b>nums = [2,3,6,5,2,3], k = 2
<b>输出：</b>2
<b>解释：</b>在nums中只有两个 2-big 的索引:
- i = 2 --&gt; 有两个有效的 idx1: 0 和 1。有三个有效的 idx2: 2、3 和 4。
- i = 3 --&gt; 有两个有效的 idx1: 0 和 1。有两个有效的 idx2: 3 和 4。</pre>

<p><strong class="example">示例 2 ：</strong></p>

<pre>
<b>输入：</b>nums = [1,1,1], k = 3
<b>输出：</b>0
<b>解释：</b>在 nums 中没有 3-big 的索引
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i], k &lt;= nums.length</code></li>
</ul>


**相似问题：**
- [0315：计算右侧小于当前元素的个数](/leetcode/0315)
- [2420：找到所有好下标（1695 分）](/leetcode/2420)


## 分析

- 有序集合模拟即可

## 解答


```python
from sortedcontainers import SortedList
class Solution:
    def kBigIndices(self, nums: List[int], k: int) -> int:
        L,R = SortedList(),SortedList(nums)
        res = 0
        for i,x in enumerate(nums):
            R.remove(x)
            a = L.bisect_left(x)
            b = R.bisect_left(x)
            res += a>=k and b>=k
            L.add(x)
        return res
```
1040 ms

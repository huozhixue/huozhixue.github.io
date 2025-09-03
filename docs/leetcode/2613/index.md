# 2613：美数对（★★）


> <u>**[力扣第 2613 题](https://leetcode.cn/problems/beautiful-pairs/)**</u>

## 题目

<p>给定两个长度相同的 <strong>下标从 0 开始</strong> 的整数数组 <code>nums1</code> 和 <code>nums2</code> ，如果 <code>|nums1[i] - nums1[j]| + |nums2[i] - nums2[j]|</code> 在所有可能的下标对中是最小的，其中 <code>i &lt; j</code> ，则称下标对 <code>(i,j)</code> 为 <strong>美</strong> 数对，</p>

<p>返回美数对。如果有多个美数对，则返回字典序最小的美数对。</p>

<p>注意：</p>

<ul>
<li><code>|x|</code> 表示 <code>x</code> 的绝对值。</li>
<li>一对索引 <code>(i1, j1)</code> 在字典序意义下小于 <code>(i2, j2)</code> ，当且仅当 <code>i1 &lt; i2</code> 或 <code>i1 == i2</code> 且 <code>j1 &lt; j2</code> 。</li>
</ul>



<p><strong class="example">示例 1 ：</strong></p>

<pre>
<b>输入：</b>nums1 = [1,2,3,2,4], nums2 = [2,3,1,2,3]
<b>输出：</b>[0,3]
<b>解释：</b>取下标为 0 和下标为 3 的数对，计算出 |nums1[0]-nums1[3]| + |nums2[0]-nums2[3]| 的值为 1 ，这是我们能够得到的最小值。
</pre>

<p><strong class="example">示例 2 ：</strong></p>

<pre>
<b>输入：</b>nums1 = [1,2,4,3,2,5], nums2 = [1,4,2,3,5,1]
<b>输出：</b>[1,4]
<b>解释：</b>取下标为 1 和下标为 4 的数对，计算出 |nums1[1]-nums1[4]| + |nums2[1]-nums2[4]| 的值为 1，这是我们可以达到的最小值。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums1.length, nums2.length &lt;= 10<sup>5</sup></code></li>
<li><code>nums1.length == nums2.length</code></li>
<li><code>0 &lt;= nums1<sub>i</sub><sub> </sub>&lt;= nums1.length</code></li>
<li><code>0 &lt;= nums2<sub>i</sub> &lt;= nums2.length</code></li>
</ul>




## 分析

- [平面最近点对-非分治算法](https://oi.wiki/geometry/nearest-points/#%E9%9D%9E%E5%88%86%E6%B2%BB%E7%AE%97%E6%B3%95)

## 解答


```python
from sortedcontainers import SortedList
class Solution:
    def beautifulPair(self, nums1: List[int], nums2: List[int]) -> List[int]:
        n = len(nums1)
        A = [(nums1[i],nums2[i],i) for i in range(n)]
        res = [inf,n,n]
        d = {}
        for a,b,i in A:
            if (a,b) in d:
                res = min(res,[0,d[(a,b)],i])
            d[(a,b)] = i
        if res[0]==0:
            return res[1:]
        A.sort()
        sl = SortedList()
        l = 0
        for x,y,j in A:
            mi = res[0]
            while x-A[l][0]>mi:
                x2,y2,i = A[l]
                sl.remove((y2,x2,i))
                l += 1
            a = sl.bisect_left((y-mi,))
            b = sl.bisect_left((y+mi+1,))
            for y2,x2,i in sl[a:b]:
                w = abs(x2-x)+abs(y2-y)
                res = min(res,[w]+sorted([i,j]))
            sl.add((y,x,j))
        return res[1:]
```
111 ms

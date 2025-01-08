# 0632：最小区间（★★）


> <u>**[力扣第 632 题](https://leetcode.cn/problems/smallest-range-covering-elements-from-k-lists/)**</u>

## 题目

<p>你有 <code>k</code> 个 <strong>非递减排列</strong> 的整数列表。找到一个 <strong>最小 </strong>区间，使得 <code>k</code> 个列表中的每个列表至少有一个数包含在其中。</p>

<p>我们定义如果 <code>b-a &lt; d-c</code> 或者在 <code>b-a == d-c</code> 时 <code>a &lt; c</code>，则区间 <code>[a,b]</code> 比 <code>[c,d]</code> 小。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
<strong>输出：</strong>[20,24]
<strong>解释：</strong>
列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。
列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。
列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [[1,2,3],[1,2,3],[1,2,3]]
<strong>输出：</strong>[1,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>nums.length == k</code></li>
<li><code>1 &lt;= k &lt;= 3500</code></li>
<li><code>1 &lt;= nums[i].length &lt;= 50</code></li>
<li><code>-10<sup>5</sup> &lt;= nums[i][j] &lt;= 10<sup>5</sup></code></li>
<li><code>nums[i]</code> 按非递减顺序排列</li>
</ul>




**相似问题：**
- [0076：最小覆盖子串](/leetcode/0076)


## 分析

枚举每个数作为区间右边界，找最大的左边界，可以用滑动窗口解决。

## 解答


```python
class Solution:
    def smallestRange(self, nums: List[List[int]]) -> List[int]:
        k = len(nums)
        A = sorted((a,x) for x,arr in enumerate(nums) for a in arr)
        res, i = [-inf,inf], 0
        ct = defaultdict(int)
        for a,x in A:
            ct[x]+=1
            while len(ct)==k:
                b, y = A[i]
                if a-b<res[1]-res[0]:
                    res = [b,a]
                ct[y] -= 1
                if not ct[y]:
                    del ct[y]
                i += 1
        return res
```
100 ms

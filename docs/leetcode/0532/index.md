# 0532：数组中的 k-diff 数对（★）


> <u>**[力扣第 532 题](https://leetcode.cn/problems/k-diff-pairs-in-an-array/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code>，请你在数组中找出<strong> 不同的 </strong>k-diff 数对，并返回不同的 <strong>k-diff 数对</strong> 的数目。</p>

<p><strong>k-diff</strong> 数对定义为一个整数对 <code>(nums[i], nums[j])</code><strong> </strong>，并满足下述全部条件：</p>

<ul>
<li><code>0 &lt;= i, j &lt; nums.length</code></li>
<li><code>i != j</code></li>
<li><code>|nums[i] - nums[j]| == k</code></li>
</ul>

<p><strong>注意</strong>，<code>|val|</code> 表示 <code>val</code> 的绝对值。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [3, 1, 4, 1, 5], k = 2
<strong>输出：</strong>2
<strong>解释：</strong>数组中有两个 2-diff 数对, (1, 3) 和 (3, 5)。
尽管数组中有两个 1 ，但我们只应返回不同的数对的数量。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1, 2, 3, 4, 5], k = 1
<strong>输出：</strong>4
<strong>解释：</strong>数组中有四个 1-diff 数对, (1, 2), (2, 3), (3, 4) 和 (4, 5) 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1, 3, 1, 5, 4], k = 0
<strong>输出：</strong>1
<strong>解释：</strong>数组中只有一个 0-diff 数对，(1, 1) 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>7</sup> &lt;= nums[i] &lt;= 10<sup>7</sup></code></li>
<li><code>0 &lt;= k &lt;= 10<sup>7</sup></code></li>
</ul>


**相似问题：**
- [0530：二叉搜索树的最小绝对差](/leetcode/0530)
- [2006：差的绝对值为 K 的数对数目（1271 分）](/leetcode/2006)
- [2040：两个有序数组的第 K 小乘积（2517 分）](/leetcode/2040)
- [2364：统计坏数对的数目（1622 分）](/leetcode/2364)
- [2426：满足不等式的数对数目（2030 分）](/leetcode/2426)
- [2817：限制条件下元素之间的最小绝对差（1889 分）](/leetcode/2817)


## 分析


- 遍历 x，判断 x-k 是否在数组中即可
- 注意 k 为 0 的特殊情况

## 解答


```python
class Solution:
    def findPairs(self, nums: List[int], k: int) -> int:
        ct = Counter(nums)
        if k==0:
            return sum(a>1 for a in ct.values())
        return sum(x-k in ct for x in list(ct))
```
32 ms

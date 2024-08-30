# 3153：所有数对中数位不同之和（1645 分）


> <u>**[力扣第 398 场周赛第 3 题](https://leetcode.cn/problems/sum-of-digit-differences-of-all-pairs/)**</u>

## 题目

<p>你有一个数组 <code>nums</code> ，它只包含 <strong>正</strong> 整数，所有正整数的数位长度都 <strong>相同</strong> 。</p>

<p>两个整数的 <strong>数位不同</strong> 指的是两个整数 <b>相同</b> 位置上不同数字的数目。</p>

<p>请你返回 <code>nums</code> 中 <strong>所有</strong> 整数对里，<strong>数位不同之和。</strong></p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [13,23,12]</span></p>

<p><b>输出：</b>4</p>

<p><strong>解释：</strong><br />
计算过程如下：<br />
- <strong>1</strong>3 和 <strong>2</strong>3 的数位不同为 1 。<br />
- 1<strong>3</strong> 和 1<strong>2</strong> 的数位不同为 1 。<br />
- <strong>23</strong> 和 <strong>12</strong> 的数位不同为 2 。<br />
所以所有整数数对的数位不同之和为 <code>1 + 1 + 2 = 4</code> 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [10,10,10,10]</span></p>

<p><span class="example-io"><b>输出：</b>0</span></p>

<p><strong>解释：</strong><br />
数组中所有整数都相同，所以所有整数数对的数位不同之和为 0 。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt; 10<sup>9</sup></code></li>
<li><code>nums</code> 中的整数都有相同的数位长度。</li>
</ul>


**相似问题：**
- [0477：汉明距离总和](/leetcode/0477)


## 分析

计算每一位的贡献即可。
## 解答


```python
class Solution:
    def sumDigitDifferences(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        for A in zip(*map(str,nums)):
            for a in Counter(A).values():
                res += a*(n-a)
        return res//2
```
298 ms

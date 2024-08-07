# 1979：找出数组的最大公约数（1184 分）


> <u>**[力扣第 255 场周赛第 1 题](https://leetcode.cn/problems/find-greatest-common-divisor-of-array/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，返回数组中最大数和最小数的 <strong>最大公约数</strong> 。</p>

<p>两个数的 <strong>最大公约数</strong> 是能够被两个数整除的最大正整数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [2,5,6,9,10]
<strong>输出：</strong>2
<strong>解释：</strong>
nums 中最小的数是 2
nums 中最大的数是 10
2 和 10 的最大公约数是 2
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [7,5,6,8,3]
<strong>输出：</strong>1
<strong>解释：</strong>
nums 中最小的数是 3
nums 中最大的数是 8
3 和 8 的最大公约数是 1
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>nums = [3,3]
<strong>输出：</strong>3
<strong>解释：</strong>
nums 中最小的数是 3
nums 中最大的数是 3
3 和 3 的最大公约数是 3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 1000</code></li>
<li><code>1 &lt;= nums[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [1071：字符串的最大公因子（1397 分）](/leetcode/1071)
- [1819：序列中不同最大公约数的数目（2539 分）](/leetcode/1819)
- [1952：三除数（1203 分）](/leetcode/1952)
- [2413：最小偶倍数（1144 分）](/leetcode/2413)
- [2447：最大公因数等于 K 的子数组数目（1602 分）](/leetcode/2447)


## 分析

模拟即可

## 解答

```python
def findGCD(self, nums: List[int]) -> int:
    return gcd(max(nums), min(nums))
```
40 ms


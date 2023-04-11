# 0446：等差数列划分 II - 子序列（★★）


> <u>**[力扣第 446 题](https://leetcode.cn/problems/arithmetic-slices-ii-subsequence/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，返回 <code>nums</code> 中所有 <strong>等差子序列</strong> 的数目。</p>

<p>如果一个序列中 <strong>至少有三个元素</strong> ，并且任意两个相邻元素之差相同，则称该序列为等差序列。</p>

<ul>
<li>例如，<code>[1, 3, 5, 7, 9]</code>、<code>[7, 7, 7, 7]</code> 和 <code>[3, -1, -5, -9]</code> 都是等差序列。</li>
<li>再例如，<code>[1, 1, 2, 5, 7]</code> 不是等差序列。</li>
</ul>

<p>数组中的子序列是从数组中删除一些元素（也可能不删除）得到的一个序列。</p>

<ul>
<li>例如，<code>[2,5,10]</code> 是 <code>[1,2,1,<em><strong>2</strong></em>,4,1,<strong><em>5</em></strong>,<em><strong>10</strong></em>]</code> 的一个子序列。</li>
</ul>

<p>题目数据保证答案是一个 <strong>32-bit</strong> 整数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,4,6,8,10]
<strong>输出：</strong>7
<strong>解释：</strong>所有的等差子序列为：
[2,4,6]
[4,6,8]
[6,8,10]
[2,4,6,8]
[4,6,8,10]
[2,4,6,8,10]
[2,6,10]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [7,7,7,7,7]
<strong>输出：</strong>16
<strong>解释：</strong>数组中的任意子序列都是等差子序列。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1  &lt;= nums.length &lt;= 1000</code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

- 考虑求以位置 i 结尾的等差子序列数目
- 遍历 j<i，需要知道位置 j 结尾且差为 nums[i]-nums[j] 的等差子序列数目（长度 2 的也算）
- 因此，令 dp[i][diff] 代表位置 i 结尾且等差 diff 的子序列个数，即可递推
- 递推过程中，将长度 >=3 的等差子序列累加即可

## 解答

```python
def numberOfArithmeticSlices(self, nums: List[int]) -> int:
    res, n = 0, len(nums)
    dp = [defaultdict(int) for _ in range(n)]
    for i in range(n):
        for j in range(i):
            diff = nums[i]-nums[j]
            dp[i][diff] += 1+dp[j][diff]
            res += dp[j][diff]
    return res
```
904 ms



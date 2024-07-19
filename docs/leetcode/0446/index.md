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


**相似问题：**
- [0413：等差数列划分](/leetcode/0413)
- [2453：摧毁一系列目标（1761 分）](/leetcode/2453)
- [2484：统计回文子序列数目（2223 分）](/leetcode/2484)


## 分析

### #1
- 考虑求最后两个数是 x、y 的等差子序列个数（长度 2 也算）
	- 显然只要知道以 x 结尾、等差为 y-x 的子序列个数
	- 因此令 f[i][diff] 保存以 nums[i] 结尾、等差 diff 的子序列个数，即可递推
- 递推过程中，以 x 结尾、等差为 y-x 的子序列再加上 y，长度即 >=3，累加到结果中即可

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        res, n = 0, len(nums)
        f = [defaultdict(int) for _ in range(n)]
        for i in range(n):
            for j in range(i):
                diff = nums[i]-nums[j]
                f[i][diff] += 1+f[j][diff]
                res += f[j][diff]
        return res
```
653 ms

### #2

- 还可以直接令 f[x][diff] 保存以 x 结尾、等差 diff 的子序列个数
- 注意 x 可能有多个，组成的长度 2 的 [x,y] 也有多个，因此要额外保存元素个数 

## 解答

```python
class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        n = len(nums)
        d = defaultdict(lambda:defaultdict(int))
        ct = defaultdict(int)
        res = 0
        for y in nums:
            for x in list(ct):
                diff = y-x
                res += d[x][diff]
                d[y][diff] += d[x][diff]+ct[x]
            ct[y]+=1
        return res
```
826 ms



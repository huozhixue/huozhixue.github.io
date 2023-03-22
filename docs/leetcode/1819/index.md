# 1819：序列中不同最大公约数的数目（★★★）


> <u>**[力扣第 235 场周赛第 4 题](https://leetcode.cn/problems/number-of-different-subsequences-gcds/)**</u>

## 题目

<p>给你一个由正整数组成的数组 <code>nums</code> 。</p>

<p>数字序列的 <strong>最大公约数</strong> 定义为序列中所有整数的共有约数中的最大整数。</p>

<ul>
<li>例如，序列 <code>[4,6,16]</code> 的最大公约数是 <code>2</code> 。</li>
</ul>

<p>数组的一个 <strong>子序列</strong> 本质是一个序列，可以通过删除数组中的某些元素（或者不删除）得到。</p>

<ul>
<li>例如，<code>[2,5,10]</code> 是 <code>[1,2,1,<strong>2</strong>,4,1,<strong>5</strong>,<strong>10</strong>]</code> 的一个子序列。</li>
</ul>

<p>计算并返回 <code>nums</code> 的所有 <strong>非空</strong> 子序列中 <strong>不同</strong> 最大公约数的 <strong>数目</strong> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/04/03/image-1.png" />
<pre>
<strong>输入：</strong>nums = [6,10,3]
<strong>输出：</strong>5
<strong>解释：</strong>上图显示了所有的非空子序列与各自的最大公约数。
不同的最大公约数为 6 、10 、3 、2 和 1 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,15,40,5,6]
<strong>输出：</strong>7
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>1 <= nums[i] <= 2 * 10<sup>5</sup></code></li>
</ul>


## 分析

要递推所有子序列的最大公约数时间复杂度高。注意到最大公约数不会超过 2*10^5，
因此可以反过来，判断每个数是否是某个子序列的最大公约数。

这样总时间不超过 N * 调和级数，时间复杂度 O(N*logN)。

## 解答

```python
def countDifferentSubsequenceGCDs(self, nums: List[int]) -> int:
    res, nums, Max = 0, set(nums), max(nums)
    for x in range(1, Max+1):
        g = None
        for y in range(x, Max+1, x):
            if y in nums:
                g = gcd(g, y) if g else y
                if g == x:
                    res += 1
                    break
    return res
```
2656 ms




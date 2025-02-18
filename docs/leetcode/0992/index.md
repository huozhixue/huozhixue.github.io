# 0992：K 个不同整数的子数组（2210 分）


> <u>**[力扣第 123 场周赛第 4 题](https://leetcode.cn/problems/subarrays-with-k-different-integers/)**</u>

## 题目

<p>给定一个正整数数组 <code>nums</code>和一个整数 <code>k</code>，返回 <code>nums</code> 中 「<strong>好子数组」</strong><em> </em>的数目。</p>

<p>如果 <code>nums</code> 的某个子数组中不同整数的个数恰好为 <code>k</code>，则称 <code>nums</code> 的这个连续、不一定不同的子数组为 <strong>「</strong><strong>好子数组 」</strong>。</p>

<ul>
<li>例如，<code>[1,2,3,1,2]</code> 中有 <code>3</code> 个不同的整数：<code>1</code>，<code>2</code>，以及 <code>3</code>。</li>
</ul>

<p><strong>子数组</strong> 是数组的 <strong>连续</strong> 部分。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,2,3], k = 2
<strong>输出：</strong>7
<strong>解释：</strong>恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,3,4], k = 3
<strong>输出：</strong>3
<strong>解释：</strong>恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i], k &lt;= nums.length</code></li>
</ul>


**相似问题：**
- [0003：无重复字符的最长子串](/leetcode/0003)
- [0159：至多包含两个不同字符的最长子串](/leetcode/0159)
- [0340：至多包含 K 个不同字符的最长子串](/leetcode/0340)
- [2062：统计字符串中的元音子字符串（1458 分）](/leetcode/2062)
- [2107：分享 K 个糖果后独特口味的数量](/leetcode/2107)
- [2261：含最多 K 个可整除元素的子数组（1724 分）](/leetcode/2261)
- [2799：统计完全子数组的数目（1397 分）](/leetcode/2799)


## 分析

- 恰好型窗口计数的一种常用方法是转为两个至多/少型窗口计数的差
- 本题可以求 f(k) 代表最多 k 个不同整数的子数组个数，用滑动窗口容易求解
- 答案即是 f(k)-f(k-1)

## 解答

```python
class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        def cal(k):
            res, i, ct = 0,0, defaultdict(int)
            for j,x in enumerate(nums):
                ct[x] += 1
                while len(ct)>k:
                    ct[nums[i]] -= 1
                    if not ct[nums[i]]:
                        del ct[nums[i]]
                    i += 1
                res += j-i+1
            return res

        return cal(k)-cal(k-1)
```

154 ms

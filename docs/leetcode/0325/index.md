# 0325：和等于 k 的最长子数组长度（★）


> <u>**[力扣第 325 题](https://leetcode.cn/problems/maximum-size-subarray-sum-equals-k/)**</u>

## 题目

<p>给定一个数组 <code><em>nums</em></code> 和一个目标值 <code><em>k</em></code>，找到和等于<em> <code>k</code> </em>的最长连续子数组长度。如果不存在任意一个符合要求的子数组，则返回 <code>0</code>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong><em>nums</em> = <code>[1,-1,5,-2,3]</code>, <em>k</em> = <code>3</code>
<strong>输出: </strong>4
<strong>解释: </strong>子数组 <code>[1, -1, 5, -2]</code> 和等于 3，且长度最长。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong><em>nums</em> = <code>[-2,-1,2,1]</code>, <em>k</em> = <code>1</code>
<strong>输出: </strong>2 <strong>
解释: </strong>子数组<code> [-1, 2]</code> 和等于 1，且长度最长。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= k &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

区间和容易想到前缀和。

先得到前缀和数组 pre，问题转为求 pre 最远的两个元素，其差为 k。

容易想到用哈希表解决。

## 解答

```python
def maxSubArrayLen(self, nums: List[int], k: int) -> int:
    res, d = 0, {}
    for i, x in enumerate(accumulate([0]+nums)):
        res = max(res, i-d.get(x-k, i))
        d.setdefault(x, i)
    return res
```
224 ms




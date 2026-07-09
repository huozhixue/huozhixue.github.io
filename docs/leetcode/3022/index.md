# 3022：给定操作次数内使剩余元素的或值最小（2917 分）


> <u>**[力扣第 382 场周赛第 4 题](https://leetcode.cn/problems/minimize-or-of-remaining-elements-using-operations/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 和一个整数 <code>k</code> 。</p>

<p>一次操作中，你可以选择 <code>nums</code> 中满足 <code>0 &lt;= i &lt; nums.length - 1</code> 的一个下标 <code>i</code> ，并将 <code>nums[i]</code> 和 <code>nums[i + 1]</code> 替换为数字 <code>nums[i] &amp; nums[i + 1]</code> ，其中 <code>&amp;</code> 表示按位 <code>AND</code> 操作。</p>

<p>请你返回 <strong>至多</strong> <code>k</code> 次操作以内，使 <code>nums</code> 中所有剩余元素按位 <code>OR</code> 结果的 <strong>最小值</strong> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [3,5,3,2,7], k = 2
<b>输出：</b>3
<b>解释：</b>执行以下操作：
1. 将 nums[0] 和 nums[1] 替换为 (nums[0] &amp; nums[1]) ，得到 nums 为 [1,3,2,7] 。
2. 将 nums[2] 和 nums[3] 替换为 (nums[2] &amp; nums[3]) ，得到 nums 为 [1,3,2] 。
最终数组的按位或值为 3 。
3 是 k 次操作以内，可以得到的剩余元素的最小按位或值。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [7,3,15,14,2,8], k = 4
<b>输出：</b>2
<b>解释：</b>执行以下操作：
1. 将 nums[0] 和 nums[1] 替换为 (nums[0] &amp; nums[1]) ，得到 nums 为 [3,15,14,2,8] 。
2. 将 nums[0] 和 nums[1] 替换为 (nums[0] &amp; nums[1]) ，得到 nums 为 [3,14,2,8] 。
3. 将 nums[0] 和 nums[1] 替换为 (nums[0] &amp; nums[1]) ，得到 nums 为 [2,2,8] 。
4. 将 nums[1] 和 nums[2] 替换为 (nums[1] &amp; nums[2]) ，得到 nums 为 [2,0] 。
最终数组的按位或值为 2 。
2 是 k 次操作以内，可以得到的剩余元素的最小按位或值。
</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<b>输入：</b>nums = [10,7,10,3,9,14,9,4], k = 1
<b>输出：</b>15
<b>解释：</b>不执行任何操作，nums 的按位或值为 15 。
15 是 k 次操作以内，可以得到的剩余元素的最小按位或值。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums[i] &lt; 2<sup>30</sup></code></li>
<li><code>0 &lt;= k &lt; nums.length</code></li>
</ul>


**相似问题：**
- [2317：操作后的最大异或和（1678 分）](/leetcode/2317)
- [2897：对数组执行操作使平方和最大（2301 分）](/leetcode/2897)


## 分析

- 从高到低遍历二进制位，判断能否使得该位为 0
- 令 msk 代表能变为 0 的二进制位
- 判断 msk 能否得到，可以用贪心：
	- 遍历 nums，不断合并相邻元素直到和 msk 无交集
	- 看合并次数是否<=k 即可

## 解答

```python []
class Solution:
    def minOrAfterOperations(self, nums: List[int], k: int) -> int:
        def check(u):
            res = 0
            s = -1
            for a in nums:
                s &= a
                if s&u==0:
                    s = -1
                else:
                    res += 1
            return res<=k

        n = len(nums)
        L = max(nums).bit_length()
        msk = 0
        for i in range(L-1,-1,-1):
            tmp = msk|1<<i
            if check(tmp):
                msk = tmp
        return (1<<L)-1-msk
```
667 ms




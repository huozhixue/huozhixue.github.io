# 0494：目标和（★）


> <u>**[力扣第 494 题](https://leetcode.cn/problems/target-sum/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>target</code> 。</p>

<p>向数组中的每个整数前添加 <code>'+'</code> 或 <code>'-'</code> ，然后串联起所有整数，可以构造一个 <strong>表达式</strong> ：</p>

<ul>
<li>例如，<code>nums = [2, 1]</code> ，可以在 <code>2</code> 之前添加 <code>'+'</code> ，在 <code>1</code> 之前添加 <code>'-'</code> ，然后串联起来得到表达式 <code>"+2-1"</code> 。</li>
</ul>

<p>返回可以通过上述方法构造的、运算结果等于 <code>target</code> 的不同 <strong>表达式</strong> 的数目。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,1,1,1,1], target = 3
<strong>输出：</strong>5
<strong>解释：</strong>一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1], target = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 20</code></li>
<li><code>0 <= nums[i] <= 1000</code></li>
<li><code>0 <= sum(nums[i]) <= 1000</code></li>
<li><code>-1000 <= target <= 1000</code></li>
</ul>


## 分析
  
注意到 sum(nums)<=1000，因此考虑直接递推表达式的和与对应的个数。

令 dp[i] 代表 nums[:i] 得到的计数器，key 为表达式的和，即可递推。

## 解答

```python
def findTargetSumWays(self, nums: List[int], target: int) -> int:
    ct = Counter({0: 1})
    for num in nums:
        ct2 = Counter()
        for k in ct:
            ct2[k+num] += ct[k]
            ct2[k-num] += ct[k]
        ct = ct2
    return ct[target]
```
260 ms

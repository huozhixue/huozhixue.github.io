# 0494：目标和（★）


> <u>**[力扣第 494 题](https://leetcode.cn/problems/target-sum/)**</u>

## 题目

<p>给你一个非负整数数组 <code>nums</code> 和一个整数 <code>target</code> 。</p>

<p>向数组中的每个整数前添加 <code>'+'</code> 或 <code>'-'</code> ，然后串联起所有整数，可以构造一个 <strong>表达式</strong> ：</p>

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
<li><code>1 &lt;= nums.length &lt;= 20</code></li>
<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>0 &lt;= sum(nums[i]) &lt;= 1000</code></li>
<li><code>-1000 &lt;= target &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0282：给表达式添加运算符](/leetcode/0282)
- [2787：将一个数字表示成幂的和的方案数（1817 分）](/leetcode/2787)


## 分析
  
直接递推表达式的和与对应个数即可。

## 解答

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        f = {0:1}
        for x in nums:
            g = defaultdict(int)
            for y in f:
                g[y+x] += f[y]
                g[y-x] += f[y]
            f = g
        return f[target]
```
162 ms

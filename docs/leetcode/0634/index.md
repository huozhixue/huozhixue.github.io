# 0634：寻找数组的错位排列（★）


> <u>**[力扣第 634 题](https://leetcode.cn/problems/find-the-derangement-of-an-array/)**</u>

## 题目

<p>在组合数学中，如果一个排列中所有元素都不在原先的位置上，那么这个排列就被称为 <strong>错位排列</strong> 。</p>

<p>给定一个从 <code>1</code> 到 <code>n</code> 升序排列的数组，返回 <em><strong>不同的错位排列</strong> 的数量 </em>。由于答案可能非常大，你只需要将答案对 <code>10<sup>9</sup>+7</code> <strong>取余</strong> 输出即可。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = 3
<strong>输出:</strong> 2
<strong>解释:</strong> 原始的数组为 [1,2,3]。两个错位排列的数组为 [2,3,1] 和 [3,1,2]。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 2
<strong>输出:</strong> 1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

## 解答

```python
    def findDerangement(self, n: int) -> int:
        dp, mod = [1] + [0]*n, 10**9+7
        for i in range(2, n+1):
            dp[i] = (i-1)*(dp[i-1]+dp[i-2]) % mod
        return dp[-1]
```

428 ms

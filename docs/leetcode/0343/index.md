# 0343：整数拆分（★）


> <u>**[力扣第 343 题](https://leetcode.cn/problems/integer-break/)**</u>

## 题目

<p>给定一个正整数 <code>n</code> ，将其拆分为 <code>k</code> 个 <strong>正整数</strong> 的和（ <code>k &gt;= 2</code> ），并使这些整数的乘积最大化。</p>

<p>返回 <em>你可以获得的最大乘积</em> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>n = 2
<strong>输出: </strong>1
<strong>解释: </strong>2 = 1 + 1, 1 × 1 = 1。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>n = 10
<strong>输出: </strong>36
<strong>解释: </strong>10 = 3 + 3 + 4, 3 × 3 × 4 = 36。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 58</code></li>
</ul>


## 分析

### #1

可以用 dp，按最后一个拆分的数即可递归。

```python
def integerBreak(self, n: int) -> int:
    dp = [1] * n
    for i in range(2, n):
        dp[i] = max(i, max(dp[j]*dp[i-j] for j in range(1, i)))
    return max(dp[j]*dp[n-j] for j in range(1, n))
```
时间复杂度 O(N^2)，28 ms

### #2

还可以利用数学知识：
- 假如拆分出的某个数 x>=4
	- 那么将 x 拆为 2 和 x-2，2*(x-2)>=x，乘积不变或增大
	- 因此必然存在最佳方案，拆出的数都小于等于 3
- 除了 n=2 或 3 的特殊情况，显然拆出 1 会使乘积减小
	- 因此 n>3 时，必然存在最佳方案，拆出的数都是 2 或 3
- 3 个 2 换成 2 个 3，乘积增大
	- 因此 n>3 时，必然存在最佳方案，拆出 2 的个数 <=2，其它的都是 3。
- 根据 n%3 的值，即可确定一种最佳方案：
	- n%3 == 0 时，全拆为 3 即可
	- n%3 == 1 时，拆为 2 个 2，剩下的都为 3 即可
	- n%3 == 2 时，拆为 1 个 2，剩下的都为 3 即可

## 解答

```python
def integerBreak(self, n: int) -> int:
    if n <= 3:
        return n-1
    q, r = divmod(n, 3)
    return 3**q if r==0 else 3**(q-1)*4 if r==1 else 3**q*2
```
时间复杂度 O(1)，28 ms

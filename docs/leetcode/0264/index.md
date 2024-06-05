# 0264：丑数 II（★）


> <u>**[力扣第 264 题](https://leetcode.cn/problems/ugly-number-ii/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你找出并返回第 <code>n</code> 个 <strong>丑数</strong> 。</p>

<p><strong>丑数 </strong>就是质因子只包含 <code>2</code>、<code>3</code> 和 <code>5</code> 的正整数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 10
<strong>输出：</strong>12
<strong>解释：</strong>[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是由前 10 个丑数组成的序列。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
<strong>解释：</strong>1 通常被视为丑数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1690</code></li>
</ul>


## 分析


### #1

{{< lc "0263" >}} 升级版，可以用前面的丑数递推。

```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        P = [2,3,5]
        f = [1]*n
        for i in range(1,n):
            f[i] = min(f[j]*p for j in range(i) for p in P if f[j]*p>f[i-1])
        return f[-1]
```
9869 ms

### #2

- 递推式中，对于质数 p，需要找到第一个 j 使得 f[j]*p>f[i-1] 
- 显然 j 是随着 i 递增而递增的
- 因此考虑维护 p 对应的 j 即可

## 解答

```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        P = [2,3,5]
        f = [1]*n
        g = defaultdict(int)
        for i in range(1,n):
            f[i] = min(f[g[p]]*p for p in P)
            for p in P:
                if f[g[p]]*p==f[i]:
                    g[p] += 1
        return f[-1]
```
199 ms


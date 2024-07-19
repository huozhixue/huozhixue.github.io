# 0313：超级丑数（★）


> <u>**[力扣第 313 题](https://leetcode.cn/problems/super-ugly-number/)**</u>

## 题目

<p><strong>超级丑数</strong> 是一个正整数，并满足其所有质因数都出现在质数数组 <code>primes</code> 中。</p>

<p>给你一个整数 <code>n</code> 和一个整数数组 <code>primes</code> ，返回第 <code>n</code> 个 <strong>超级丑数</strong> 。</p>

<p>题目数据保证第 <code>n</code> 个 <strong>超级丑数</strong> 在 <strong>32-bit</strong> 带符号整数范围内。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 12, <code>primes</code> = <code>[2,7,13,19]</code>
<strong>输出：</strong>32
<strong>解释：</strong>给定长度为 4 的质数数组 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1, primes = [2,3,5]
<strong>输出：</strong>1
<strong>解释：</strong>1 不含质因数，因此它的所有质因数都在质数数组 primes = [2,3,5] 中。
</pre>


<div class="top-view__1vxA">
<div class="original__bRMd">
<div>
<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= primes.length &lt;= 100</code></li>
<li><code>2 &lt;= primes[i] &lt;= 1000</code></li>
<li>题目数据<strong> 保证</strong> <code>primes[i]</code> 是一个质数</li>
<li><code>primes</code> 中的所有值都 <strong>互不相同</strong> ，且按 <strong>递增顺序</strong> 排列</li>
</ul>
</div>
</div>
</div>


**相似问题：**
- [0264：丑数 II](/leetcode/0264)


## 分析

### #1

 {{< lc "0264" >}} 进阶，可以用同样的方法。

```python
class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        f = [1]*n
        g = defaultdict(int)
        for i in range(1,n):
            f[i] = min(f[g[p]]*p for p in primes)
            for p in primes:
                if f[g[p]]*p==f[i]:
                    g[p] += 1
        return f[-1]
```

1638 ms

### #2

注意到每次要取最小的 f[g[p]]*p，可以用堆来维护 <f[g[p]]*p, g[p], p> 三元组，快速获得最小值。

## 解答

```python
class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        f = [1]*n
        pq = [(p,0,p) for p in primes]
        for i in range(1,n):
            f[i] = pq[0][0]
            while pq[0][0]==f[i]:
                _,j,p = heappop(pq)
                heappush(pq,(f[j+1]*p,j+1,p))
        return f[-1]
```
304 ms


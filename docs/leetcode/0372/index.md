# 0372：超级次方（★）


> <u>**[力扣第 372 题](https://leetcode.cn/problems/super-pow/)**</u>

## 题目

<p>你的任务是计算 <code>a<sup>b</sup></code> 对 <code>1337</code> 取模，<code>a</code> 是一个正整数，<code>b</code> 是一个非常大的正整数且会以数组形式给出。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>a = 2, b = [3]
<strong>输出：</strong>8
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>a = 2, b = [1,0]
<strong>输出：</strong>1024
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>a = 1, b = [4,3,3,8,5,2]
<strong>输出：</strong>1
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>a = 2147483647, b = [2,0,0]
<strong>输出：</strong>1198
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= a <= 2<sup>31</sup> - 1</code></li>
<li><code>1 <= b.length <= 2000</code></li>
<li><code>0 <= b[i] <= 9</code></li>
<li><code>b</code> 不含前导 0</li>
</ul>


## 分析

可以递推。令 dp[i] 代表 $a^{n_i}，n_i$ 是 b[:i+1] 对应的数，那么：
$$ dp[i]=a^{n_i}=a^{n_{i-1}*10+b[i]} = (a^{n_{i-1}})^{10}*a^{b[i]}
=dp[i-1]^{10}*a^{b[i]}$$

再注意取模即可。

## 解答

```python
def superPow(self, a: int, b: List[int]) -> int:
    dp, mod = 1, 1337
    for x in b:
        dp = pow(dp, 10, 1337)*pow(a, x, 1337)%mod
    return dp
```
100 ms


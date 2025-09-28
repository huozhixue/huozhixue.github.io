# 0903：DI 序列的有效排列（2433 分）


> <u>**[力扣第 101 场周赛第 4 题](https://leetcode.cn/problems/valid-permutations-for-di-sequence/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的字符串 <code>s</code> ，其中 <code>s[i]</code> 是:</p>

<ul>
<li><code>“D”</code> 意味着减少，或者</li>
<li><code>“I”</code> 意味着增加</li>
</ul>

<p><strong>有效排列</strong> 是对有 <code>n + 1</code> 个在 <code>[0, n]</code>  范围内的整数的一个排列 <code>perm</code> ，使得对所有的 <code>i</code>：</p>

<ul>
<li>如果 <code>s[i] == 'D'</code>，那么 <code>perm[i] &gt; perm[i+1]</code>，以及；</li>
<li>如果 <code>s[i] == 'I'</code>，那么 <code>perm[i] &lt; perm[i+1]</code>。</li>
</ul>

<p>返回 <em><strong>有效排列 </strong> </em><code>perm</code><em>的数量 </em>。因为答案可能很大，所以请<strong>返回你的答案对</strong> <code>10<sup>9</sup> + 7</code><strong> 取余</strong>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "DID"
<strong>输出：</strong>5
<strong>解释：</strong>
(0, 1, 2, 3) 的五个有效排列是：
(1, 0, 3, 2)
(2, 0, 3, 1)
(2, 1, 3, 0)
(3, 0, 2, 1)
(3, 1, 2, 0)
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s = "D"
<strong>输出:</strong> 1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == s.length</code></li>
<li><code>1 &lt;= n &lt;= 200</code></li>
<li><code>s[i]</code> 不是 <code>'I'</code> 就是 <code>'D'</code></li>
</ul>




## 分析

- 考虑最后一个数选 x
	- 假如 s[-1] 为 'D'，问题转为求剩下 n 个数的排列，最后一个数必须 >x
	- 求 [0,x-1]U[x+1,n] 的排列很麻烦，考虑将其映射为 [0,n-1] 的排列，即 >x 的数都减 1
	- 问题转为求 [0,n-1] 的排列，最后一个数>=x
	- 这就符合 dp 的结构了
	- s[-1] 为 'I' 同理
- 于是令  f[i][j] 代表 [0,i] 的排列，且最后一个数选 j 的数量，有递推式
	- 若 s[i-1] 为 'D'，f[i][j] = sum(f[i-1][k] for k in range(j,i))
	- 若 s[i-1] 为 'I'， f[i][j] = sum(f[i-1][k] for k in range(j))
- 递推式显然可以用前缀和优化

## 解答

```python
class Solution:
    def numPermsDISequence(self, s: str) -> int:
        mod = 10**9+7
        f = [1]
        for c in s:
            if c=='I':
                g = [0]+list(accumulate(f))
            else:
                g = list(accumulate(f[::-1]))[::-1]+[0]
            f = [x%mod for x in g]
        return sum(f)%mod
```
11 ms

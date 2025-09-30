# 1830：使字符串有序的最少操作次数（2620 分）


> <u>**[力扣第 50 场双周赛第 4 题](https://leetcode.cn/problems/minimum-number-of-operations-to-make-string-sorted/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> （<strong>下标从 0 开始</strong>）。你需要对 <code>s</code> 执行以下操作直到它变为一个有序字符串：</p>

<ol>
<li>找到 <strong>最大下标</strong> <code>i</code> ，使得 <code>1 &lt;= i &lt; s.length</code> 且 <code>s[i] &lt; s[i - 1]</code> 。</li>
<li>找到 <strong>最大下标</strong> <code>j</code> ，使得 <code>i &lt;= j &lt; s.length</code> 且对于所有在闭区间 <code>[i, j]</code> 之间的 <code>k</code> 都有 <code>s[k] &lt; s[i - 1]</code> 。</li>
<li>交换下标为 <code>i - 1</code>​​​​ 和 <code>j</code>​​​​ 处的两个字符。</li>
<li>将下标 <code>i</code> 开始的字符串后缀反转。</li>
</ol>

<p>请你返回将字符串变成有序的最少操作次数。由于答案可能会很大，请返回它对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>s = "cba"
<b>输出：</b>5
<b>解释：</b>模拟过程如下所示：
操作 1：i=2，j=2。交换 s[1] 和 s[2] 得到 s="cab" ，然后反转下标从 2 开始的后缀字符串，得到 s="cab" 。
操作 2：i=1，j=2。交换 s[0] 和 s[2] 得到 s="bac" ，然后反转下标从 1 开始的后缀字符串，得到 s="bca" 。
操作 3：i=2，j=2。交换 s[1] 和 s[2] 得到 s="bac" ，然后反转下标从 2 开始的后缀字符串，得到 s="bac" 。
操作 4：i=1，j=1。交换 s[0] 和 s[1] 得到 s="abc" ，然后反转下标从 1 开始的后缀字符串，得到 s="acb" 。
操作 5：i=2，j=2。交换 s[1] 和 s[2] 得到 s="abc" ，然后反转下标从 2 开始的后缀字符串，得到 s="abc" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>s = "aabaa"
<b>输出：</b>2
<b>解释：</b>模拟过程如下所示：
操作 1：i=3，j=4。交换 s[2] 和 s[4] 得到 s="aaaab" ，然后反转下标从 3 开始的后缀字符串，得到 s="aaaba" 。
操作 2：i=4，j=4。交换 s[3] 和 s[4] 得到 s="aaaab" ，然后反转下标从 4 开始的后缀字符串，得到 s="aaaab" 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><b>输入：</b>s = "cdbea"
<b>输出：</b>63</pre>

<p><strong>示例 4：</strong></p>

<pre><b>输入：</b>s = "leetcodeleetcodeleetcode"
<b>输出：</b>982157772
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 3000</code></li>
<li><code>s</code>​ 只包含小写英文字母。</li>
</ul>




## 分析

### #1 统计排列
- 这个过程实际上是变为 s 的上一个排列，因此统计比 s 小的排列个数即可
- 遍历每位 i，统计 s[:i] 不变，s[i] 变小的全排列，再除去重复排列即可
- 除法取模需要用到逆元

```python
mod = 10**9+7
N = 3001
fac,inv = [1]*N,[1]*N
for i in range(2,N):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)
    
class Solution:
    def makeStringSorted(self, s: str) -> int:
        n = len(s)
        A = [ord(c)-ord('a')+1 for c in s]
        res = 0
        ct = [0]*27
        for a in A:
            ct[a] += 1
        for i,a in enumerate(A):
            t = fac[n-1-i]*sum(ct[b] for b in range(a))
            for c in range(1,27):
                t = t*inv[ct[c]]%mod
            res += t
            res %= mod
            ct[a] -= 1
        return res
```
219 ms

### #2 增量优化

- 注意到遍历时，26 个 inv[ct[c]] 只有一项改变了，可以递推维护
- 比 a 小的数量可以用树状数组维护

## 解答


```python
mod = 10**9+7
N = 3001
fac,inv = [1]*N,[1]*N
for i in range(2,N):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)

class BIT:
    def __init__(self, n):
        self.n = n
        self.t = [0]*n

    def update(self, i, x):
        while i<self.n:
            self.t[i] += x
            i += i&-i

    def get(self, i):
        res = 0
        while i:
            res += self.t[i]
            i &= i-1
        return res

class Solution:
    def makeStringSorted(self, s: str) -> int:
        n = len(s)
        A = [ord(c)-ord('a')+1 for c in s]
        ct = [0]*27
        for a in A:
            ct[a] += 1
        t = 1
        bit = BIT(27)
        for a in range(1,27):
            t = t*inv[ct[a]]%mod
            bit.update(a,ct[a])
        res = 0
        for i,a in enumerate(A):
            res += t*fac[n-1-i]*bit.get(a-1)
            res %= mod
            ct[a] -= 1
            t = t*fac[ct[a]+1]*inv[ct[a]]%mod
            bit.update(a,-1)
        return res
```
63 ms

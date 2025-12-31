# 0730：统计不同回文子序列（★★）


> <u>**[力扣第 730 题](https://leetcode.cn/problems/count-different-palindromic-subsequences/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，返回 <code>s</code> 中不同的非空回文子序列个数 。由于答案可能很大，请返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>

<p>字符串的子序列可以经由字符串删除 0 个或多个字符获得。</p>

<p>如果一个序列与它反转后的序列一致，那么它是回文序列。</p>

<p>如果存在某个 <code>i</code> , 满足 <code>a<sub>i</sub> != b<sub>i</sub></code><sub> </sub>，则两个序列 <code>a<sub>1</sub>, a<sub>2</sub>, ...</code> 和 <code>b<sub>1</sub>, b<sub>2</sub>, ...</code> 不同。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = 'bccb'
<strong>输出：</strong>6
<strong>解释：</strong>6 个不同的非空回文子字符序列分别为：'b', 'c', 'bb', 'cc', 'bcb', 'bccb'。
注意：'bcb' 虽然出现两次但仅计数一次。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'
<strong>输出：</strong>104860361
<strong>解释：</strong>共有 3104860382 个不同的非空回文子序列，104860361 是对 10<sup>9</sup> + 7 取余后的值。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s[i]</code> 仅包含 <code>'a'</code>, <code>'b'</code>, <code>'c'</code> 或 <code>'d'</code> </li>
</ul>


**相似问题：**
- [0516：最长回文子序列](/leetcode/0516)
- [2484：统计回文子序列数目（2223 分）](/leetcode/2484)


## 分析

### #1

- 典型的区间 dp 问题，考虑按序列最外层的字符递推
- 假如 s 的首尾都是 'a'
	- 这对 'a' 可以和 s[1:-1] 的每个序列组成新的序列
	- 这对 'a' 自身可以组成 'a' 和 'aa'
	- 注意一样的序列只算一次，要去掉重复的序列
	- s[1:-1] 每个首尾是 'a' 的序列都在新的序列集合中，都是重复的
	- 因此 s 的序列个数=s[1:-1]的序列个数*2+2-s[1:-1] 首尾是 'a' 的序列个数
- 所以考虑将首尾是哪个字符加入状态定义，用 f(i,j,c) 代表 s[i:j+1] 首尾是 c 的序列个数，进行递推
	- 假如 s[i:j+1] 的首尾都是 c
		- f(i,j,c)= sum(f(i+1,j-1,*))+2
		- 其它字符状态和 f(i+1,j-1,*) 一样
	- 否则，假如首尾分别是 a、b
		- f(i,j,a) = f(i,j-1,a)
		- f(i,j,b) = f(i+1,j,b)
		- 其它字符状态和 f(i+1,j-1,*) 一样

```python
class Solution:
    def countPalindromicSubsequences(self, s: str) -> int:
        mod = 10**9+7
        n = len(s)
        A = [ord(c)-ord('a') for c in s]
        f = [[[0]*4 for _ in range(n)] for _ in range(n)]
        for i in range(n-1,-1,-1):
            f[i][i][A[i]] = 1
            for j in range(i+1,n):
                f[i][j] = f[i+1][j-1][:]
                if A[i]==A[j]:
                    f[i][j][A[i]] = (sum(f[i+1][j-1])+2)%mod
                else:
                    f[i][j][A[i]] = f[i][j-1][A[i]]
                    f[i][j][A[j]] = f[i+1][j][A[j]]
        return sum(f[0][-1])%mod
```
2452 ms
### #2

- 还可以优化掉 c 的维度
- 观察最开始的递推式：
	- 当 s 首尾是 c 时，s 的序列个数=s[1:-1]的序列个数*2+2-s[1:-1] 首尾是 c 的序列个数
	- 考虑换种方法计算 s[1:-1] 首尾是 c 的序列个数，即 f(1,-1,c)
	- 找到 s[1:-1] 中最左和最右的 c 位置 l、r，f(1,-1,c) = f(l,r,c)
	- 而 f(l,r,c) = sum(f(l+1,r-1,*)) + 2
- 因此，令 g(i,j) 代表 sum(f(l+1,r-1,*)) ，进行递推
	- 假如 s[i:j+1] 的首尾都是 c
		- g(i,j) = g(i+1,j-1)*2+2-(g(l+1,r-1)+2)
		- 注意 l 和 r 不合法时，f(l,r,c) = 0，l 和 r 相等时，f(l,r,c) = 1，要特殊处理
	- 否则，由容斥可得
		- g(i,j) = g(i,j-1)+g(i+1,j)-g(i+1,j-1)
- 最后，考虑怎么预处理 i、j 对应的 l、r
	- 其实就是保存字符 s[i] 的下/上一个位置
	- 遍历并维护哈希表即可
## 解答

```python
class Solution:
    def countPalindromicSubsequences(self, s: str) -> int:
        mod = 10**9+7
        n = len(s)
        L,R = [-1]*n,[n]*n
        d = {}
        for i,c in enumerate(s):
            if c in d:
                L[i] = d[c]
                R[d[c]] = i
            d[c] = i
        g = [[0]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            g[i][i] = 1
            for j in range(i+1,n):
                if s[i]==s[j]:
                    l,r = R[i],L[j]
                    g[i][j] = g[i+1][j-1]*2+2
                    g[i][j] -= 0 if l>r else 1 if l==r else g[l+1][r-1]+2
                else:
                    g[i][j] = g[i][j-1]+g[i+1][j]-g[i+1][j-1]
                g[i][j] %= mod
        return g[0][-1]
```
570 ms


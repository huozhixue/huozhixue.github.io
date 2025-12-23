# 2472：不重叠回文子字符串的最大数目（2013 分）


> <u>**[力扣第 319 场周赛第 4 题](https://leetcode.cn/problems/maximum-number-of-non-overlapping-palindrome-substrings/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> 和一个 <strong>正</strong> 整数 <code>k</code> 。</p>

<p>从字符串 <code>s</code> 中选出一组满足下述条件且 <strong>不重叠</strong> 的子字符串：</p>

<ul>
<li>每个子字符串的长度 <strong>至少</strong> 为 <code>k</code> 。</li>
<li>每个子字符串是一个 <strong>回文串</strong> 。</li>
</ul>

<p>返回最优方案中能选择的子字符串的 <strong>最大</strong> 数目。</p>

<p><strong>子字符串</strong> 是字符串中一个连续的字符序列。</p>



<p><strong>示例 1 ：</strong></p>

<pre>
<strong>输入：</strong>s = "abaccdbbd", k = 3
<strong>输出：</strong>2
<strong>解释：</strong>可以选择 s = "<em><strong>aba</strong></em>cc<em><strong>dbbd</strong></em>" 中斜体加粗的子字符串。"aba" 和 "dbbd" 都是回文，且长度至少为 k = 3 。
可以证明，无法选出两个以上的有效子字符串。
</pre>

<p><strong>示例 2 ：</strong></p>

<pre>
<strong>输入：</strong>s = "adbcda", k = 2
<strong>输出：</strong>0
<strong>解释：</strong>字符串中不存在长度至少为 2 的回文子字符串。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= s.length &lt;= 2000</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


**相似问题：**
- [0005：最长回文子串](/leetcode/0005)
- [0131：分割回文串](/leetcode/0131)
- [0132：分割回文串 II](/leetcode/0132)
- [1278：分割回文串 III（1979 分）](/leetcode/1278)
- [1520：最多的不重叠子字符串（2362 分）](/leetcode/1520)
- [1745：分割回文串 IV（1924 分）](/leetcode/1745)


## 分析

### #1
- 令 f(i) 代表 s[:i] 的最大数目，容易写出递推式
	- f(i) = max(f(i-1),1+max(f(j) for j in range(i) if i-j>=k and s[j:i] 回文))
- 注意到>=k+2 的子串无意义，只需要枚举 j=i-k 和 j=i-k-1 即可

```python []
class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        n = len(s)
        f = [0]*(n+1)
        for i in range(k,n+1):
            f[i] = f[i-1]
            for j in [i-k,i-k-1]:
                if j>=0 and s[j:i]==s[j:i][::-1] and 1+f[j]>f[i]:
                    f[i] = 1+f[j]
        return f[-1]
```
19 ms

### #2

- 判断区间是否回文还可以用 manacher 预处理

## 解答


```python []
def manacher(s):
	n = len(s)
	A, B = [], [1]*n
	mid, r = 0, 0
	for i in range(n):
		a = min(A[2*mid-i], r-i) if r>i else 0
		while i-a and i+a<n-1 and s[i-a-1]==s[i+a+1]:
			a += 1
			B[i+a] = max(B[i+a],a*2+1)
		A.append(a)
		if i+a>r:
			mid, r = i, i+a
	return A,B       # A[i]:i为中心的臂长,B[i]:i结尾的最大回文子串长度（奇数）

class Solution:
    def maxPalindromes(self, s: str, k: int) -> int:
        def check(l,r):
            return A[l+r+1]>=r-l
        n = len(s)
        A,_ = manacher('#'+'#'.join(s)+'#')
        f = [0]*(n+1)
        for i in range(k,n+1):
            f[i] = f[i-1]
            for j in [i-k,i-k-1]:
                if j>=0 and check(j,i-1) and 1+f[j]>f[i]:
                    f[i] = 1+f[j]
        return f[-1]
```
31 ms

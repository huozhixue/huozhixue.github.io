# 1745：分割回文串 IV（1924 分）


> <u>**[力扣第 226 场周赛第 4 题](https://leetcode.cn/problems/palindrome-partitioning-iv/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，如果可以将它分割成三个 <strong>非空</strong> 回文子字符串，那么返回 <code>true</code> ，否则返回 <code>false</code> 。</p>

<p>当一个字符串正着读和反着读是一模一样的，就称其为 <strong>回文字符串</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>s = "abcbdd"
<b>输出：</b>true
<strong>解释：</strong>"abcbdd" = "a" + "bcb" + "dd"，三个子字符串都是回文的。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>s = "bcbddxy"
<b>输出：</b>false
<strong>解释：</strong>s 没办法被分割成 3 个回文子字符串。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 <= s.length <= 2000</code></li>
<li><code>s</code>​​​​​​ 只包含小写英文字母。</li>
</ul>


**相似问题：**
- [0131：分割回文串](/leetcode/0131)
- [0132：分割回文串 II](/leetcode/0132)
- [1278：分割回文串 III（1979 分）](/leetcode/1278)
- [2472：不重叠回文子字符串的最大数目（2013 分）](/leetcode/2472)


## 分析

### #1

- 用 dp 可以预处理每个区间是否回文
- 遍历两个分割点，判断即可

```python
class Solution:
    def checkPartitioning(self, s: str) -> bool:
        n = len(s)
        f = [[1]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            for j in range(i+1,n):
                f[i][j] = (s[i]==s[j]) and f[i+1][j-1]
        for i in range(n):
            for j in range(i+2,n):
                if f[0][i] and f[i+1][j-1] and f[j][n-1]:
                    return True
        return False
```
1957 ms

### #2

- 利用 [CF1081H 【Palindromic Magic】结论的证明](https://www.luogu.com/article/0lzin0i0) 可以进一步优化
	- 如果存在回文串p和q使得S=pq，那么以下至少一个成立:
		- x是S的最长回文真前缀，S=xa，a是回文串.
		- y是S的最长回文真后缀，S=by，b是回文串.
- 用 manacher 预处理可以得到每个中心的臂长 A、每个下标结尾的最长长度 B
- 预处理前缀回文的结尾下标集合 L，后缀回文的开头下标集合 R
- 枚举 L 中的 l
	- t[l+1:] 的最长回文真后缀即是 R 中 >l+1 的最小值 ，可以通过双指针得到
	- t[l+1:] 的最长回文真前缀，可以 manacher 预处理 t[:-2][: :-1] 得到 B   
	- 剩下的那个区间用预处理出的 A 判断即可


## 解答


```python
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
	return A,B       # B[i]:i结尾的最大回文子串长度（奇数）

class Solution:
    def checkPartitioning(self, s: str) -> bool:
        t = '#'+'#'.join(s)+'#'
        n = len(t)
        A,_ = manacher(t)
        _,B = manacher(t[:-2][::-1])
        B = B[::-1]
        L = [i+A[i] for i in range(1,n) if A[i]==i]
        R = [i-A[i] for i in range(n-1) if A[i]==n-1-i][::-1]

        def check(l,r):
            mid = (l+r)//2
            return A[mid]>=mid-l

        for l in L:
            while R and R[-1]<=l+1:
                R.pop()
            if R and check(l+1,R[-1]-1):
                return True
            if l+1<len(B) and check(l+B[l+1]+1,n-1):
                return True
        return False
```
87 ms

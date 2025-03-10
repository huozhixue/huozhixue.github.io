# 1147：段式回文（1912 分）


> <u>**[力扣第 148 场周赛第 4 题](https://leetcode.cn/problems/longest-chunked-palindrome-decomposition/)**</u>

## 题目

<p>你会得到一个字符串 <code>text</code> 。你应该把它分成 <code>k</code> 个子字符串 <code>(subtext1, subtext2，…， subtextk)</code> ，要求满足:</p>

<ul>
<li><code>subtext<sub>i</sub></code><sub> </sub>是 <strong>非空 </strong>字符串</li>
<li>所有子字符串的连接等于 <code>text</code> ( 即<code>subtext<sub>1</sub> + subtext<sub>2</sub> + ... + subtext<sub>k</sub> == text</code> )</li>
<li>对于所有 <font color="#c7254e"><font face="Menlo, Monaco, Consolas, Courier New, monospace"><span style="font-size:12.6px"><span style="background-color:#f9f2f4">i</span></span></font></font> 的有效值( 即 <code>1 &lt;= i &lt;= k</code> ) ，<code>subtext<sub>i</sub> == subtext<sub>k - i + 1</sub></code> 均成立</li>
</ul>

<p>返回<code>k</code>可能最大值。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>text = "ghiabcdefhelloadamhelloabcdefghi"
<strong>输出：</strong>7
<strong>解释：</strong>我们可以把字符串拆分成 "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)"。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>text = "merchant"
<strong>输出：</strong>1
<strong>解释：</strong>我们可以把字符串拆分成 "(merchant)"。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>text = "antaprezatepzapreanta"
<strong>输出：</strong>11
<strong>解释：</strong>我们可以把字符串拆分成 "(a)(nt)(a)(pre)(za)(tep)(za)(pre)(a)(nt)(a)"。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= text.length &lt;= 1000</code></li>
<li><code>text</code> 仅由小写英文字符组成</li>
</ul>


**相似问题：**
- [2983：回文串重新排列查询（2779 分）](/leetcode/2983)


## 分析

### #1 dp+z函数

- 考虑第一个子字符串的长度
	- 遍历 j，若 text[:j]=text[-j:]，转为递归子问题 text[j:-j]
- 因此，令 f[i] 代表 text[i:-i] 的最多拆分个数，即可递推
- 快速判断子串是否相等，可以用 z 函数

```python
def zfunc(s):
	n = len(s)
	z, l, r = [0]*n, 0, 0
	for i in range(1,n):
		z[i] = max(min(z[i-l],r-i+1), 0)
		while i+z[i]<n and s[z[i]]==s[i+z[i]]:
			l, r = i, i+z[i]
			z[i] += 1
	return z      # z[i]:lcp(后缀i,后缀0) 

class Solution:
    def longestDecomposition(self, text: str) -> int:
        n = len(text)
        m = n//2
        f = [1]*m+[n%2]
        for i in range(m-1,-1,-1):
            s = text[i:n-i]
            z = zfunc(s)
            for j in range(i,m):
                if z[i-j-1]>=j-i+1:
                    f[i] = max(f[i],2+f[j+1])
        return f[0]
```
918 ms

### #2 贪心

- 事实上，只需考虑最短的子字符串，证明见 [【图解】贪心做法，一图秒懂！](https://leetcode.cn/problems/longest-chunked-palindrome-decomposition/solutions/2221544/tu-jie-tan-xin-zuo-fa-yi-tu-miao-dong-py-huik/)
## 解答

```python
class Solution:
    def longestDecomposition(self, text: str) -> int:
        n = len(text)
        res,i = 0,0
        for j in range(n//2):
            if text[i:j+1]==text[n-j-1:n-i]:
                res += 2
                i = j+1
        return res+(i<=n-1-i)
```
0 ms

## *附加

### 后缀数组优化

- 结合后缀数组和 ST 表，可以得到任意两个后缀的 lcp，从而快速判断子串是否相等

```python
def SA(A):
    def SA_IS(A):
        def equal(p1,p2):
            e1,e2 = LMS.find('*',p1+1),LMS.find('*',p2+1)
            return A[p1:e1+1]==A[p2:e2+1]

        def IS(stars):
            sa = [n]+[-1]*n
            tails = list(accumulate(bucket))
            for i in stars[::-1]:
                sa[tails[A[i]]] = i
                tails[A[i]] -= 1
            heads = list(accumulate([1]+bucket[:-1]))
            for i in range(n+1):
                j = sa[i]-1
                if j>=0 and types[j]=='L':
                    sa[heads[A[j]]] = j
                    heads[A[j]] += 1
            tails = list(accumulate(bucket))
            for i in range(n,-1,-1):
                j = sa[i]-1
                if j >= 0 and types[j] == 'S':
                    sa[tails[A[j]]] = j
                    tails[A[j]] -= 1
            return sa[1:]

        n = len(A)
        types = list('0'*(n-1)+'LS')
        for i in range(n-2,-1,-1):
            types[i] = 'S' if A[i]<A[i+1] else 'L' if A[i]>A[i+1] else types[i+1]
        LMS = ''.join('*' if types[i-1:i+1]==['L','S'] else ' ' for i in range(n+1))
        ct = Counter(A)
        bucket = [ct[x] for x in range(max(ct)+1)]
        stars = [i for i in range(n) if LMS[i]=='*']
        sa = IS(stars)
        d, cnt, prev = {}, 0, -1
        for pos in sa:
            if LMS[pos]=='*':
                cnt += prev<0 or not equal(prev,pos)
                d[pos] = cnt
                prev = pos
        B = [d[pos] for pos in stars]
        d1 = {x-1:i for i,x in enumerate(B)}
        sa1 = [d1[x] for x in range(cnt)] if cnt==len(B) else SA_IS(B)
        return IS([stars[pos] for pos in sa1])
	
    def SA_h(A,sa):
        n = len(A)
        rk, height, h = [0]*n,[0]*n,0
        for i in range(n):
            rk[sa[i]] = i
        for i in range(n):
            h = max(0, h-1)
            j = sa[rk[i]-1] if rk[i] else n
            while max(i,j)+h<n and A[i+h]==A[j+h]:
                h += 1
            height[rk[i]] = h
        return rk, height
    sa = SA_IS(A)           # sa[i]:第i小的后缀编号
    rk, height = SA_h(A,sa) # rk[i]:后缀i的排名
    return sa,rk,height     # height[i]:lcp(sa[i],sa[i-1])

class ST:
    def __init__(self,A):
        f = A[:]
        self.st = st = [f]
        j, N = 1, len(f)
        while 2*j<=N:
            f = [min(f[i],f[i+j]) for i in range(N-2*j+1)]
            st.append(f)
            j <<= 1
            
    def query(self,l,r):
        j = (r-l+1).bit_length()-1
        return min(self.st[j][l],self.st[j][r-(1<<j)+1])

class Solution:
    def longestDecomposition(self, text: str) -> int:
        A = [ord(c)-ord('a') for c in text]
        sa,rk,height = SA(A)
        st = ST(height)
        n = len(A)
        res,i = 0,0
        for j in range(n//2):
            l,r = sorted([rk[i],rk[n-j-1]])
            if st.query(l+1,r)>=j-i+1:
                res += 2
                i = j+1
        return res+(i<=n-1-i)
```
47 ms


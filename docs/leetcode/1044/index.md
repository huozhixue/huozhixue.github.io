# 1044：最长重复子串（2428 分）


> <u>**[力扣第 136 场周赛第 4 题](https://leetcode.cn/problems/longest-duplicate-substring/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，考虑其所有 <em>重复子串</em> ：即 <code>s</code> 的（连续）子串，在 <code>s</code> 中出现 2 次或更多次。这些出现之间可能存在重叠。</p>

<p>返回 <strong>任意一个</strong> 可能具有最长长度的重复子串。如果 <code>s</code> 不含重复子串，那么答案为 <code>""</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "banana"
<strong>输出：</strong>"ana"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abcd"
<strong>输出：</strong>""
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>




## 分析

### #1

- 类似 {{< lc "0718" >}}，可以用二分查找+滚动哈希解决
- 元素种数最多 26，用到的窗口种数最多 5*10^5 级别，因此考虑 base 取 29，mod 取 10^11+3

```python
class Solution:
    def longestDupSubstring(self, s: str) -> str:
        def cal(L):
            vis,w = set(),0
            bL = pow(base,L,mod)
            for j,a in enumerate(A):
                w = w*base+a
                if j>=L:
                    w -= A[j-L]*bL
                w %= mod
                if j>=L-1:
                    if w in vis:
                        return False, s[j-L+1:j+1]
                    vis.add(w)
            return True, ''
        
        base, mod = 29, 10**11+3
        n = len(s)
        A = [ord(c)-ord('a') for c in s]
        L = bisect_left(range(n),True,key=lambda L:cal(L)[0])-1
        return cal(L)[1]
```
1211 ms

### #2

- 只要取模就有可能哈希碰撞，更正确的方法是 [后缀数组](https://oi.wiki/string/sa)
- 后缀数组采用 [诱导排序](https://riteme.site/blog/2016-6-19/sais.html) 方法，可以实现 O(N)
- 后缀数组可以得到后缀的排序，以及排序后相邻后缀的 lcp，找最大即可


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

class Solution:
    def longestDupSubstring(self, s: str) -> str:
        A = [ord(c)-ord('a') for c in s]
        sa,rk,height = SA(A)
        i,h = max(enumerate(height),key=lambda p:p[1])
        return s[sa[i]:sa[i]+h]
```
582 ms

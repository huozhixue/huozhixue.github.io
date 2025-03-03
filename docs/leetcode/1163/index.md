# 1163：按字典序排在最后的子串（1864 分）


> <u>**[力扣第 150 场周赛第 4 题](https://leetcode.cn/problems/last-substring-in-lexicographical-order/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，找出它的所有子串并按字典序排列，返回排在最后的那个子串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abab"
<strong>输出：</strong>"bab"
<strong>解释：</strong>我们可以找出 7 个子串 ["a", "ab", "aba", "abab", "b", "ba", "bab"]。按字典序排在最后的子串是 "bab"。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "leetcode"
<strong>输出：</strong>"tcode"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 4 * 10<sup>5</sup></code></li>
<li><code>s</code> 仅含有小写英文字符。</li>
</ul>




## 分析

### #1

找最大的后缀即可

```python
class Solution:
    def lastSubstring(self, s: str) -> str:
        return max(s[i:] for i in range(len(s)))    
```
9522 ms

### #2

用后缀数组可以 O(N) 获得后缀的排序，取最大的即可

```python
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

class Solution:
    def lastSubstring(self, s: str) -> str:
        sa = SA_IS([ord(c)-ord('a') for c in s])           # sa[i]:第i小的后缀编号
        return s[sa[-1]:]  
```
2903 ms

### #3

只要求最值，还有个针对性的 [最小表示法](https://oi.wiki/string/minimal-string/)，本题求最大，改下符号即可

## 解答


```python
class Solution:
    def lastSubstring(self, s: str) -> str:
        n = len(s)
        i,j,a = 0,1,0
        while i+a<n and j+a<n:
            x,y = s[i+a],s[j+a]
            if x==y:
                a += 1
            elif x<y:
                i,j,a = j,max(i+a,j)+1,0
            else:
                j,a = j+a+1,0
        return s[i:]
```
259 ms

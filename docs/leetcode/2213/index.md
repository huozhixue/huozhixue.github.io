# 2213：由单个字符重复的最长子字符串（2628 分）


> <u>**[力扣第 285 场周赛第 4 题](https://leetcode.cn/problems/longest-substring-of-one-repeating-character/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的字符串 <code>s</code> 。另给你一个下标从 <strong>0</strong> 开始、长度为 <code>k</code> 的字符串 <code>queryCharacters</code> ，一个下标从 <code>0</code> 开始、长度也是 <code>k</code> 的整数 <strong>下标</strong> 数组 <code>queryIndices</code> ，这两个都用来描述 <code>k</code> 个查询。</p>

<p>第 <code>i</code> 个查询会将 <code>s</code> 中位于下标 <code>queryIndices[i]</code> 的字符更新为 <code>queryCharacters[i]</code> 。</p>

<p>返回一个长度为 <code>k</code> 的数组 <code>lengths</code> ，其中 <code>lengths[i]</code> 是在执行第 <code>i</code> 个查询 <strong>之后</strong> <code>s</code> 中仅由 <strong>单个字符重复</strong> 组成的 <strong>最长子字符串</strong> 的 <strong>长度</strong> <em>。</em></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
<strong>输出：</strong>[3,3,4]
<strong>解释：</strong>
- 第 1 次查询更新后 s = "<em>b<strong>b</strong>b</em>acc" 。由单个字符重复组成的最长子字符串是 "bbb" ，长度为 3 。
- 第 2 次查询更新后 s = "bbb<em><strong>c</strong>cc</em>" 。由单个字符重复组成的最长子字符串是 "bbb" 或 "ccc"，长度为 3 。
- 第 3 次查询更新后 s = "<em>bbb<strong>b</strong></em>cc" 。由单个字符重复组成的最长子字符串是 "bbbb" ，长度为 4 。
因此，返回 [3,3,4] 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]
<strong>输出：</strong>[2,3]
<strong>解释：</strong>
- 第 1 次查询更新后 s = "ab<strong>a</strong><em>zz</em>" 。由单个字符重复组成的最长子字符串是 "zz" ，长度为 2 。
- 第 2 次查询更新后 s = "<em>a<strong>a</strong>a</em>zz" 。由单个字符重复组成的最长子字符串是 "aaa" ，长度为 3 。
因此，返回 [2,3] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 由小写英文字母组成</li>
<li><code>k == queryCharacters.length == queryIndices.length</code></li>
<li><code>1 &lt;= k &lt;= 10<sup>5</sup></code></li>
<li><code>queryCharacters</code> 由小写英文字母组成</li>
<li><code>0 &lt;= queryIndices[i] &lt; s.length</code></li>
</ul>


**相似问题：**
- [0056：合并区间](/leetcode/0056)
- [0424：替换后的最长重复字符](/leetcode/0424)
- [1446：连续字符（1165 分）](/leetcode/1446)
- [1649：通过指令创建有序数组（2207 分）](/leetcode/1649)
- [2407：最长递增子序列 II（2280 分）](/leetcode/2407)


## 分析

### #1

- 单点更新、区间查询，可以用线段树
- 为了合并，需要区间的最长重复前缀和最长重复后缀

```python
class Seg:
    def __init__(self,n):
        N = 1<<n.bit_length()
        self.t = [[0]*6 for _ in range(N*2)] 
        self.n = n

    def apply(self,o,x):       
        self.t[o] = [1,x,1,x,1,1] # 最长重复前缀及字符，最长重复后缀及字符，区间长度，最长重复子串

    def merge(self,a,b):       
        res = [a[0],a[1],b[2],b[3],a[4]+b[4],max(a[5],b[5])]
        if a[3]==b[1]:
            res[5] = max(res[5],a[2]+b[0])
            if a[0]==a[4]:
                res[0] = a[0]+b[0]
            if b[2]==b[4]:
                res[2] = a[2]+b[2]
        return res

    def build(self,A,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if l==r:
            self.apply(o,A[l])
            return
        m = (l+r)//2
        self.build(A,o*2,l,m)
        self.build(A,o*2+1,m+1,r)
        self.pull(o)

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def modify(self,a,x,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if l==r:
            self.apply(o,x)
            return
        m = (l+r)//2
        if a<=m: self.modify(a,x,o*2,l,m)
        else: self.modify(a,x,o*2+1,m+1,r)
        self.pull(o)
        
    def query(self,a,b,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        res = self.t[0]
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res

class Solution:
    def longestRepeating(self, s: str, queryCharacters: str, queryIndices: List[int]) -> List[int]:
        A = [ord(c)-ord('a') for c in s]
        n = len(A)
        seg = Seg(n)
        seg.build(A)
        res = []
        for i,c in zip(queryIndices,queryCharacters):
            seg.modify(i,ord(c)-ord('a'))
            res.append(seg.t[1][5])
        return res
```
4657 ms

### #2

也可以用珂朵莉树，维护连续区间和长度
## 解答


```python
from sortedcontainers import SortedList
class Solution:
    def longestRepeating(self, s: str, queryCharacters: str, queryIndices: List[int]) -> List[int]:
        def pop(i):
            l,r,v = sl.pop(i)
            ss.remove(r-l+1)
            return l,r,v
        def add(l,r,v):
            sl.add((l,r,v))
            ss.add(r-l+1)
        def split(x):
            i = sl.bisect_left((x,))
            if i<len(sl) and sl[i][0]==x:
                return i
            l,r,v = pop(i-1)
            add(l,x-1,v)
            add(x,r,v)
            return i
        A = [ord(c)-ord('a') for c in s]
        n = len(A)
        sl = SortedList()
        ss = SortedList()
        i = 0
        for c,g in groupby(A):
            k = len(list(g))
            sl.add((i,i+k-1,c))
            ss.add(k)
            i += k
        res = []
        for l,c in zip(queryIndices,queryCharacters):
            c = ord(c)-ord('a')
            if c!=A[l]:
                A[l] = c
                r = l
                i,j = split(l),split(r+1)
                pop(i)
                if i<len(sl) and sl[i][2]==c:
                    r = pop(i)[1]
                if i>0 and sl[i-1][2]==c:
                    l = pop(i-1)[0]
                add(l,r,c)
            res.append(ss[-1])
        return res
```
3701 ms

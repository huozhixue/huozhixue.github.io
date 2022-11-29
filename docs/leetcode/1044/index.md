# 1044：最长重复子串（★★★）


## 题目

给你一个字符串 s ，考虑其所有 重复子串 ：即 s 的（连续）子串，在 s 中出现 2 次或更多次。这些出现之间可能存在重叠。

返回 任意一个 可能具有最长长度的重复子串。如果 s 不含重复子串，那么答案为 "" 。

示例 1：
    
    输入：s = "banana"
    输出："ana"

示例 2：
    
    输入：s = "abcd"
    输出：""

提示：
- 2 <= s.length <= 3 * 10^4
- s 由小写英文字母组成
 
## 分析

类似 {{< lc "0718" >}}，可以用二分查找+滚动哈希解决。

> 元素种数最多 26，用到的窗口种数最多 5*10^5 级别，因此考虑 base 取 29，mod 取 10^11+3

## 解答

```python
def longestDupSubstring(self, s: str) -> str:
    def check(L):
        vis, w, bL = set(), 0, pow(base, L, mod)
        for j, char in enumerate(s):
            w = w*base+ord(char)-ord('a')
            if j>=L:
                w -= (ord(s[j-L])-ord('a'))*bL
            w %= mod
            if j>=L-1:
                if w in vis:
                    return False, s[j-L+1:j+1]
                vis.add(w)
        return True, ''
    
    base, mod = 29, 10**11+3
    self.__class__.__getitem__ = lambda self, L: check(L)
    L = bisect_left(self, (True,), 1, len(s)+1) - 1
    return check(L)[1]
```
时间复杂度 O(N*logN)，2084 ms

## *附加

滚动哈希只要存在 mod，就有针对性的数据使其出错。而后缀数组算法则能保证一定正确。所以本题可以用来练习 后缀数组 算法。

### #1

后缀数组有几种实现方法，最好理解的是 [倍增法](https://oi-wiki.org/string/sa/#_3)。
直接用 sort，时间复杂度 $O(N * log^2N)$，用基数排序，时间复杂度 $O(N * logN)$。

求得后缀数组后，可以在 O(N) 时间得到 [height 数组](https://oi-wiki.org/string/sa/#height)，即可求解。

```python
def longestDupSubstring(self, s: str) -> str:
    def SA(A):
        n, size = len(A), 1
        rk, sa = [0] * n, sorted((A[i], i) for i in range(n))
        while True:
            prev, cnt = None, 0
            for x, i in sa:
                cnt += x != prev
                prev = x
                rk[i] = cnt
            if cnt == n:
                break
            sa = sorted([(rk[i], rk[i+size] if i+size<n else 0), i] for i in range(n))
            size <<= 1
        return [i for _,i in sa]
    
    def SA_h(A, sa):
        n = len(A)
        rk, height, h = [0]*n, [0]*n, 0
        for i in range(n):
            rk[sa[i]] = i
        for i in range(n):
            h = max(0, h-1)
            j = sa[rk[i]-1] if rk[i] else n
            while max(i,j)+h<n and A[i+h]==A[j+h]:
                h += 1
            height[rk[i]] = h
        return height
    
    sa = SA(s)
    height = SA_h(s, sa)
    h, i = max((h, i) for i, h in enumerate(height))
    return s[sa[i]:sa[i]+h]
```
时间复杂度 $O(N * log^2N)$，2008 ms

### #2

最快的实现则是 [诱导排序](https://riteme.site/blog/2016-6-19/sais.html) 方法，但理解难度较大，
最好结合讲解，实际运行每一步，观察每一步的输入输出。

这里给出一种模板（尽量精简了。。。）

```python
def longestDupSubstring(self, s: str) -> str:
    def SA_IS(A):
        def equal(pos1, pos2):
            end1, end2 = LMS.find('*', pos1+1), LMS.find('*', pos2+1)
            return A[pos1:end1+1] == A[pos2:end2+1]

        def IS(stars):
            sa = [n] + [-1] * n
            tails = list(accumulate(bucket))
            for i in stars[::-1]:
                sa[tails[A[i]]] = i
                tails[A[i]] -= 1
            heads = list(accumulate([1] + bucket[:-1]))
            for i in range(n + 1):
                j = sa[i] - 1
                if j >= 0 and types[j] == 'L':
                    sa[heads[A[j]]] = j
                    heads[A[j]] += 1
            tails = list(accumulate(bucket))
            for i in range(n, -1, -1):
                j = sa[i] - 1
                if j >= 0 and types[j] == 'S':
                    sa[tails[A[j]]] = j
                    tails[A[j]] -= 1
            return sa[1:]

        n = len(A)
        types = list('0' * (n - 1) + 'LS')
        for i in range(n - 2, -1, -1):
            types[i] = 'S' if A[i] < A[i + 1] else 'L' if A[i] > A[i + 1] else types[i + 1]
        LMS = ''.join('*' if types[i - 1:i + 1] == ['L', 'S'] else ' ' for i in range(n + 1))
        ct = Counter(A)
        bucket = [ct[x] for x in range(max(ct) + 1)]
        stars = [i for i in range(n) if LMS[i] == '*']
        sa = IS(stars)
        d, cnt, prev = {}, 0, -1
        for pos in sa:
            if LMS[pos] == '*':
                cnt += prev < 0 or not equal(prev, pos)
                d[pos] = cnt
                prev = pos
        B = [d[pos] for pos in stars]
        d1 = {x-1:i for i,x in enumerate(B)}
        sa1 = [d1[x] for x in range(cnt)] if cnt == len(B) else SA_IS(B)
        return IS([stars[pos] for pos in sa1])
    
    def SA_h(A, sa):
        n = len(A)
        rk, height, h = [0]*n, [0]*n, 0
        for i in range(n):
            rk[sa[i]] = i
        for i in range(n):
            h = max(0, h-1)
            j = sa[rk[i]-1] if rk[i] else n
            while max(i,j)+h<n and A[i+h]==A[j+h]:
                h += 1
            height[rk[i]] = h
        return height

    sa = SA_IS([ord(char)-ord('a') for char in s])
    height = SA_h(s, sa)
    h, i = max((h, i) for i, h in enumerate(height))
    return s[sa[i]:sa[i]+h]
```
时间复杂度 O(N)，888 ms

# 1923：最长公共子路径（2661 分）


> <u>**[力扣第 248 场周赛第 4 题](https://leetcode.cn/problems/longest-common-subpath/)**</u>

## 题目

<p>一个国家由 <code>n</code> 个编号为 <code>0</code> 到 <code>n - 1</code> 的城市组成。在这个国家里，<strong>每两个</strong> 城市之间都有一条道路连接。</p>

<p>总共有 <code>m</code> 个编号为 <code>0</code> 到 <code>m - 1</code> 的朋友想在这个国家旅游。他们每一个人的路径都会包含一些城市。每条路径都由一个整数数组表示，每个整数数组表示一个朋友按顺序访问过的城市序列。同一个城市在一条路径中可能 <strong>重复</strong> 出现，但同一个城市在一条路径中不会连续出现。</p>

<p>给你一个整数 <code>n</code> 和二维数组 <code>paths</code> ，其中 <code>paths[i]</code> 是一个整数数组，表示第 <code>i</code> 个朋友走过的路径，请你返回 <strong>每一个</strong> 朋友都走过的 <strong>最长公共子路径</strong> 的长度，如果不存在公共子路径，请你返回 <code>0</code> 。</p>

<p>一个 <strong>子路径</strong> 指的是一条路径中连续的城市序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>n = 5, paths = [[0,1,<strong>2,3</strong>,4],
[<strong>2,3</strong>,4],
[4,0,1,<strong>2,3</strong>]]
<b>输出：</b>2
<b>解释：</b>最长公共子路径为 [2,3] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>n = 3, paths = [[0],[1],[2]]
<b>输出：</b>0
<b>解释：</b>三条路径没有公共子路径。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>n = 5, paths = [[<strong>0</strong>,1,2,3,4],
[4,3,2,1,<strong>0</strong>]]
<b>输出：</b>1
<b>解释：</b>最长公共子路径为 [0]，[1]，[2]，[3] 和 [4] 。它们长度都为 1 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 10<sup>5</sup></code></li>
<li><code>m == paths.length</code></li>
<li><code>2 <= m <= 10<sup>5</sup></code></li>
<li><code>sum(paths[i].length) <= 10<sup>5</sup></code></li>
<li><code>0 <= paths[i][j] < n</code></li>
<li><code>paths[i]</code> 中同一个城市不会连续重复出现。</li>
</ul>


**相似问题：**
- [0332：重新安排行程](/leetcode/0332)
- [0718：最长重复子数组](/leetcode/0718)


## 分析

类似 {{< lc "0718" >}}，只不过从两个数组变成了多个数组。

> 元素种类最多 10^5，用到的窗口种类最多 10^6 级别，因此考虑 base 取 10^5+3，mod 取 10^12+39

## 解答

```python
def longestCommonSubpath(self, n: int, paths: List[List[int]]) -> int:
    def gen(A, L):
        ans, w, bL = set(), 0, pow(base, L, mod)
        for j, a in enumerate(A):
            w = w*base+a
            if j>=L:
                w -= A[j-L]*bL
            w %= mod
            if j>=L-1:
                ans.add(w)
        return ans

    base, mod = 10**5+3, 10**12+39
    self.__class__.__getitem__ = lambda self, L: not reduce(lambda x, y: x&y, [gen(A,L) for A in paths])
    return bisect_left(self, True, 1, min(map(len, paths))+1)-1
```
2092 ms

## *附加

也可以类似 {{< lc "0718" >}}，使用 后缀数组 判断是否存在长为 L 的公共路径

```python
def longestCommonSubpath(self, n: int, paths: List[List[int]]) -> int:
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
    
    def check(L):
        vis = set()
        for i, h in enumerate(height):
            if h<L:
                vis = {belongs[sa[i]]}
            else:
                vis.add(belongs[sa[i]])
                if len(vis)==len(paths):
                    return True
        return False
            
    A, belongs = [], []
    for j, path in enumerate(paths):
        A.extend(path+[10**5+j])
        belongs.extend([j]*(len(path)+1))
    sa = SA_IS(A)
    height = SA_h(A, sa)
    self.__class__.__getitem__ = lambda self, L: not check(L)
    return bisect_left(self, True, 1, min(map(len, paths))+1)-1
```
5184 ms

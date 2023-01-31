# 1923：最长公共子路径（★★★）


> **第 248 场周赛第 4 题**

## 题目

一个国家由 n 个编号为 0 到 n - 1 的城市组成。在这个国家里，每两个 城市之间都有一条道路连接。

总共有 m 个编号为 0 到 m - 1 的朋友想在这个国家旅游。他们每一个人的路径都会包含一些城市。
每条路径都由一个整数数组表示，每个整数数组表示一个朋友按顺序访问过的城市序列。
同一个城市在一条路径中可能 重复 出现，但同一个城市在一条路径中不会连续出现。

给你一个整数 n 和二维数组 paths ，其中 paths[i] 是一个整数数组，表示第 i 个朋友走过的路径，
请你返回 每一个 朋友都走过的 最长公共子路径 的长度，如果不存在公共子路径，请你返回 0 。

一个 子路径 指的是一条路径中连续的城市序列。

示例 1：

    输入：n = 5, paths = [[0,1,2,3,4],
                         [2,3,4],
                         [4,0,1,2,3]]
    输出：2
    解释：最长公共子路径为 [2,3] 。

示例 2：

    输入：n = 3, paths = [[0],[1],[2]]
    输出：0
    解释：三条路径没有公共子路径。

示例 3：

    输入：n = 5, paths = [[0,1,2,3,4],
                         [4,3,2,1,0]]
    输出：1
    解释：最长公共子路径为 [0]，[1]，[2]，[3] 和 [4] 。它们长度都为 1 。
 

提示：
- 1 <= n <= 10^5
- m == paths.length
- 2 <= m <= 10^5
- sum(paths[i].length) <= 10^5
- 0 <= paths[i][j] < n
- paths[i] 中同一个城市不会连续重复出现。


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

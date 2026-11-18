# Educational Codeforces Round 38 (Rated for Div. 2)


> <u>**[Educational Codeforces Round 38 (Rated for Div. 2)](https://codeforces.com/contest/938)**</u>

## F. Erasing Substrings

- 最后剩下的答案长度是固定的
- 遍历答案的前缀 i，令 f[i][u] 代表 i 之前做的删除操作集合为 u 时能否达到最小前缀
- 递推时，f[i+1][u] 由所有合法的 f[i][v](v是u的子集）递推而来，这部分可以采用 sos dp
- 比较所有合法的 f[i+1][u] 得到的第 i+1 个字符，取最小的 c 即为答案的第 i+1 个字符，然后更新 f，能得到 c 的 f[i+1][u] 才为合法

```python []
import sys
from itertools import *
from collections import *
from heapq import *
from bisect import *
input = lambda: sys.stdin.readline().rstrip()
def II(base=10): return int(input(),base)
def LII(): return list(map(int,input().split()))
def LSII(): return [int(x)-1 for x in input().split()]
fmin = lambda x,y: x if x<y else y
fmax = lambda x,y: x if x>y else y

s = [ord(c)-ord('a') for c in input()]
n = len(s)
k = n.bit_length()-1
N = 1<<k
res = []
f = [1]*N
for i in range(n-N+1):
    for u in range(N):
        for j in range(k):
            if u>>j&1:
                f[u] |= f[u^1<<j]
    mi = min(s[i+u] for u in range(N) if f[u])
    res.append(mi)
    f = [f[u] and s[i+u]==mi for u in range(N)]
print(''.join(chr(a+ord('a')) for a in res))
```
750 ms


# now112543f: 这招太狠了烤学妹


> <u>**[now112543f: 这招太狠了烤学妹](https://ac.nowcoder.com/acm/contest/112543/F)**</u>


### 贪心


```python []
import sys
input = lambda: sys.stdin.readline()[:-1]
from itertools import groupby
from heapq import heappush,heappop
 
def II(base=10):
    return int(input(),base)
 
def LI():
    return list(map(int,input()))
 
def LII():
    return list(map(int,input().split()))

def f(a,i):
    q,r = divmod(a-i,i+1)
    return q*(q+1)//2*(i+1)+r*(q+1)

for _ in range(II()):
    n,k = LII()
    s = input()
    A = [len(list(g)) for c,g in groupby(s) if c=='o']
    res = sum(f(a,0) for a in A)
    pq = [(f(a,1)-f(a,0),0,a) for a in A]
    pq.sort()
    while k and pq:
        w,c,a = heappop(pq)
        res += w
        k -= 1
        if c+1<a:
            heappush(pq,(f(a,c+2)-f(a,c+1),c+1,a))
    print(res)
```
1116 ms



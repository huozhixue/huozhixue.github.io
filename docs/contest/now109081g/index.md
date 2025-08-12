# now109081g: k人训练方阵


> <u>**[now109081g: k人训练方阵](https://ac.nowcoder.com/acm/contest/109081/G)**</u>


### 矩阵冪


```python []
from collections import defaultdict
mod = 10**9 + 7

def mul(A,B,k):
    res = [0]*k
    for i in range(k):
        for j in range(k):
            r = (i + j) % k
            res[r] = (res[r] + A[i] * B[j]) % mod
    return res

d = defaultdict(list)
t = int(input())
res = [0]*t
for i in range(t):
    n, k = map(int, input().split())
    if k==1:
        res[i] = pow(2,n,mod)-1
    else:
        d[k].append((n, i))
for k in d:
    base = [None] * 24
    base[0] = [1, 1] + [0] * (k - 2)
    for j in range(23):
        base[j + 1] = mul(base[j], base[j], k)
    f = [1] + [0] * (k - 1)
    pre = 0
    for n,i in sorted(d[k]):
        a = n-pre
        while a:
            j = a.bit_length()-1
            f = mul(f,base[j],k)
            a ^= 1<<j
        res[i] = f[1]
        pre = n
            
for x in res:
    print(x)
```
524 ms



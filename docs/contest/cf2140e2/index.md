# cf2140e2: Prime Gaming (Hard Version)


> <u>**[cf2001d: Longest Max Min Subsequence](https://codeforces.com/problemset/problem/2001/D)**</u>



### 组合计数

- 保底有 1，先都去掉 1，m-=1
- 假如 m=1，可以用状压 dp 递推出每种石堆状态能否取到 1
- 假如 m>1，将生成的石堆中>=m的看作 1，<m 的看作 0，利用状压 dp 的结果即可判断最终取到 >=m 的石堆状态有多少个
- 那么遍历 i 从 1 到 m，统计 >=i 的石堆状态个数，累加即可


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

mod = 10**9+7
M = 10**6+1 
P = [[1]*M for _ in range(21)]
for j in range(2,M):
    for i in range(1,21):
        P[i][j] = P[i-1][j]*j%mod

def main():
    n,m = LII()
    k = II()
    A = LII()
    if m==1:
        print(1)
        return
    f = [[0]*(1<<i) for i in range(n+1)]
    g = [[1]*(1<<i) for i in range(n+1)]
    f[1][1] = 1
    g[1][0] = 0
    for i in range(2,n+1):
        for j in range(1<<i):
            for a in A:
                if a>i:
                    break
                x = j>>a<<(a-1)
                y = j&((1<<(a-1))-1)
                j2 = x|y
                f[i][j] |= g[i-1][j2]
                g[i][j] &= f[i-1][j2]
    ct = [0]*(n+1)
    for j in range(1<<n):
        if f[-1][j]:
            ct[j.bit_count()] += 1
    s = P[n][m]
    for j in range(n+1):
        for i in range(2,m+1):
            s += ct[j]*P[n-j][i-1]%mod*P[j][m-i+1]%mod
            s %= mod
    print(s)

for _ in range(II()):
    main()
```
1202 ms

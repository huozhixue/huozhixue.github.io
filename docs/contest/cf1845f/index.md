# cf1845f: Swimmers in the Pool


> <u>**[cf1845f: Swimmers in the Pool](https://codeforces.com/contest/1845/problem/F)**</u>



### ntt+容斥

```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

mod = 998244353
G = 3

def ntt(A,N,sgn=1):
    L = N.bit_length()-1
    rev = [0]*N
    for i in range(N):
        j = rev[i] = (rev[i >> 1] >> 1) | (i&1)*(N>>1)
        if i<j:
            A[i],A[j] = A[j],A[i]
    for i in range(L):
        a = 1<<i
        step = pow(G,(mod-1)//(a*2)*sgn+mod-1,mod)  
        for j in range(0,N,a*2):
            w = 1
            for k in range(j,j+a):
                x,y = A[k],A[k+a]*w%mod
                A[k],A[k+a] = (x+y)%mod,(x-y)%mod
                w = w*step%mod
    if sgn==-1:
        inv = pow(N,-1,mod)
        for i,x in enumerate(A):
            A[i] = x*inv%mod

l,t = LII()
n = II()
A = LII()
m = max(A)
N = 1<<(m*2+1).bit_length()
B,B2 = [0]*N,[0]*N
for a in A:
    B[a] = 1
    B2[m-a] = 1
ntt(B,N)
ntt(B2,N)
C = [b*b for b in B]
C2 = [b*b2 for b,b2 in zip(B,B2)]
ntt(C,N,-1)
ntt(C2,N,-1)
for a in A:
    C[a*2] -= 1

f = [0]*N
for i in range(N-1,0,-1):
    if C[i] or (i+m<N and C2[i+m]):
        f[i] = 1
    else:
        for j in range(i*2,N,i):
            if f[j]:
                f[i] = 1
                break
mod = 10**9+7
res = 0
g = [0]*N
for i in range(1,N):
    if f[i]:
        g[i] += (t*i)//(2*l)
        for j in range(i*2,N,i):
            if f[j]:
                g[j] -= g[i]
                g[j] %= mod
        res += g[i]
        res %= mod
print(res)
```
905 ms

# abc415g: Get Many Cola


> <u>**[abc415g: Get Many Cola](https://atcoder.jp/contests/abc415/tasks/abc415_g)**</u>



### dp


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

n,m = LII()
A = [0]*301
for _ in range(m):
    a,b = LII()
    A[a] = max(A[a],b)
x,y = 0,1
for a in range(1,301):
    b = A[a]
    if b*y>(a-b)*x:
        x,y = b,a-b
res = n
N = 300*y
if n>N:
    k = (n-N)//y
    res += k*x
    n -= k*y
f = [0]*(n+1)
for i in range(1,n+1):
    f[i] = f[i-1]
    for a in range(min(i,300)+1):
        b = A[a]
        f[i] = max(f[i],f[i-a+b]+b)
print(res+f[-1])
```
132 ms



# now116658f: AND VS MEX


> <u>**[now116658f: AND VS MEX](https://ac.nowcoder.com/acm/contest/116658/F)**</u>


### sosdp

- 从二进制集合考虑
- 假如数 i 存在的所有超集取与后得到 i，则 i 能取到
- 因此从大到小遍历，维护所有超集的与即可

```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

def main():
    n = II()
    A = LII()
    m = max(A).bit_length()
    N = 1<<m
    f = [-1]*N
    for x in A:
        f[x] = x
    for i in range(N-1,0,-1):
        for j in range(m):
            f[i] &= f[i|1<<j]
    for i in range(1,N):
        if f[i]!=i:
            print(i)
            return
    print(N)

for _ in range(II()):
    main()
```
841 ms



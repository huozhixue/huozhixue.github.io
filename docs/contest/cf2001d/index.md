# cf2001d: Longest Max Min Subsequence


> <u>**[cf2001d: Longest Max Min Subsequence](https://codeforces.com/problemset/problem/2001/D)**</u>



### 贪心

类似 {{< lc "0316" >}}

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
    ct = [0]*(n+1)
    for a in A:
        ct[a] += 1
    sk = []
    vis = [0]*(n+1)
    for a in A:
        ct[a] -= 1
        if vis[a]:
            continue
        while sk and ct[sk[-1]]:
            w = len(sk)
            if (w&1 and sk[-1]<a) or (w&1^1 and sk[-1]>a):
                vis[sk.pop()] = 0
            elif w>1 and ct[sk[-2]] and ((w&1 and sk[-2]>a) or (w&1^1 and sk[-2]<a)):
                vis[sk.pop()] = 0
                vis[sk.pop()] = 0
            else:
                break
        sk.append(a)
        vis[a] = 1
    print(len(sk))
    print(*sk)

for _ in range(II()):
    main()
```
905 ms

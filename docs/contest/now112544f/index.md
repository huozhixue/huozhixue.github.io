# now112544f: 汉堡猪猪分糖果


> <u>**[now112544f: 汉堡猪猪分糖果](https://ac.nowcoder.com/acm/contest/112544/F)**</u>


### 贪心


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
    n,m = LII()
    N = n.bit_length()
    res = 0
    for i in range(N-1,-1,-1):
        x = 1<<i
        if x*m<=n:
            res |= x
            n -= x*m
        elif (x-1)*m<n:
            r = n-(x-1)*m
            c = (r-1)//x+1
            n -= c*x
    return res

for _ in range(II()):
    print(main())
```
427 ms



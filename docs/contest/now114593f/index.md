# now114593f: 快乐


> <u>**[now114593f: 快乐](https://ac.nowcoder.com/acm/contest/114593/F)**</u>


### 后缀数组+差分


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

from itertools import accumulate
def SA_IS(A):
    def equal(p1,p2):
        e1,e2 = LMS.find('*',p1+1),LMS.find('*',p2+1)
        return A[p1:e1+1]==A[p2:e2+1]
 
    def IS(stars):
        sa = [n]+[-1]*n
        tails = list(accumulate(bucket))
        for i in stars[::-1]:
            sa[tails[A[i]]] = i
            tails[A[i]] -= 1
        heads = list(accumulate([1]+bucket[:-1]))
        for i in range(n+1):
            j = sa[i]-1
            if j>=0 and types[j]=='L':
                sa[heads[A[j]]] = j
                heads[A[j]] += 1
        tails = list(accumulate(bucket))
        for i in range(n,-1,-1):
            j = sa[i]-1
            if j >= 0 and types[j] == 'S':
                sa[tails[A[j]]] = j
                tails[A[j]] -= 1
        return sa[1:]
 
    n = len(A)
    m = max(A)
    types = list('0'*(n-1)+'LS')
    for i in range(n-2,-1,-1):
        types[i] = 'S' if A[i]<A[i+1] else 'L' if A[i]>A[i+1] else types[i+1]
    LMS = ''.join('*' if types[i-1:i+1]==['L','S'] else ' ' for i in range(n+1))
    bucket = [0]*(m+1)
    for a in A:
        bucket[a] += 1
    stars = [i for i in range(n) if LMS[i]=='*']
    sa = IS(stars)
    d, cnt, prev = {}, 0, -1
    for pos in sa:
        if LMS[pos]=='*':
            cnt += prev<0 or not equal(prev,pos)
            d[pos] = cnt
            prev = pos
    B = [d[pos] for pos in stars]
    d1 = {x-1:i for i,x in enumerate(B)}
    sa1 = [d1[x] for x in range(cnt)] if cnt==len(B) else SA_IS(B)
    return IS([stars[pos] for pos in sa1])

def main():
    def bifind(l,r,j,c):
        res = r+1
        while l<=r:
            mid = (l+r)//2
            if sa[mid]+j<n and A[sa[mid]+j]>=c:
                res = mid
                r = mid-1
            else:
                l = mid+1
        return res
    n,m = LII()
    s = input()
    T = [input() for _ in range(m)]
    A = [ord(c)-ord('a')+1 for c in s]
    sa = SA_IS(A)
    diff = [0]*(n+1)
    for t in T:
        l,r = 0,n-1
        for j,c in enumerate(t):
            c = ord(c)-ord('a')+1
            l = bifind(l,r,j,c)
            r = bifind(l,r,j,c+1)-1
            if l>r:
                break
            diff[l] += 1
            diff[r+1] -= 1
    for i in range(1,n+1):
        diff[i] += diff[i-1]
    return max(diff)

for _ in range(II()):
    print(main())
```
721 ms



# cf1030f: Putting Boxes Together


> <u>**[cf1030f: Putting Boxes Together](https://codeforces.com/problemset/problem/1030/F)**</u>



### #1 树状数组

{{< lc "2448" >}} 进阶版

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

class BIT:
    def __init__(self, n):
        self.n = n
        self.t = [0]*n
        self.L = n.bit_length()

    def update(self, i, x):
        while i<self.n:
            self.t[i] += x
            i += i&-i

    def get(self, i):
        res = 0
        while i:
            res += self.t[i]
            i &= i-1
        return res
    
    def query(self,l,r):
        return self.get(r)-self.get(l-1)
    
    def kth(self, k):
        x = 0
        for i in range(self.L-1,-1,-1):
            y = x|1<<i
            if y<self.n and self.t[y]<k:
                x = y
                k -= self.t[y]
        return x+1
    
def main():
    n,q = LII()
    A = LII()
    W = LII()
    A = [a-i for i,a in enumerate(A)]
    bit,bit2 = BIT(n+1),BIT(n+1)
    for i,x in enumerate(W):
        bit.update(i+1,x)
        bit2.update(i+1,x*A[i])
    for _ in range(q):
        x,y = LII()
        if x<0:
            add = y-W[-x-1]
            W[-x-1] = y
            bit.update(-x,add)
            bit2.update(-x,add*A[-x-1])
        else:
            k = (bit.get(y)+bit.get(x-1)+1)//2
            mid = bit.kth(k)
            a = A[mid-1]*bit.query(x,mid)%mod-bit2.query(x,mid)
            b = bit2.query(mid,y)-A[mid-1]*bit.query(mid,y)%mod
            print((a+b)%mod)

for _ in range(1):
    main()

```
1890 ms


### #2 线段树

更通用

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

class Seg:
    def __init__(self,N):  
        self.N = N           
        self.t = [0]*N*2

    def merge(self,a,b):                # 区间信息怎么合并的   
        return a+b
    
    def up(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def build(self,A):
        self.t[self.N+1:self.N+1+len(A)] = A
        for o in range(self.N-1,0,-1):
            self.up(o)

    def update(self,a,x):
        a += self.N
        self.t[a] = x
        while a>>1:
            a >>= 1
            self.up(a)

    def query(self,a,b):
        a,b = a+self.N-1,b+self.N+1
        lres,rres = 0,0
        while a^b^1:  
            if not a&1: lres = self.merge(lres,self.t[a^1])  
            if b&1: rres = self.merge(self.t[b^1],rres)  
            a,b = a>>1,b>>1  
        return self.merge(lres,rres)  
    
    def find_right(self,a,func):
        a += self.N
        lres = 0
        while True:
            while not a&1:
                a >>= 1
            tmp = self.merge(lres,self.t[a])
            if func(tmp):
                while a<self.N:
                    a <<= 1
                    tmp2 = self.merge(lres,self.t[a])
                    if not func(tmp2):
                        lres = tmp2
                        a += 1
                return a-self.N
            if a&(a+1)==0:
                return self.N
            lres = tmp
            a += 1

def main():
    n,q = LII()
    A = LII()
    W = LII()
    A = [a-i for i,a in enumerate(A)]
    N = 1<<(n+1).bit_length()
    seg,seg2 = Seg(N),Seg(N)
    seg.build(W)
    seg2.build([a*b for a,b in zip(A,W)])
    for _ in range(q):
        x,y = LII()
        if x<0:
            seg.update(-x,y)
            seg2.update(-x,y*A[-x-1])
        else:
            s = (seg.query(x,y)+1)//2
            mid = seg.find_right(x,lambda t:t>=s)
            a = A[mid-1]*seg.query(x,mid)%mod-seg2.query(x,mid)
            b = seg2.query(mid,y)-A[mid-1]*seg.query(mid,y)%mod
            print((a+b)%mod)

for _ in range(1):
    main()
```
2218 ms

# 树模板：st表

## ST 表（静态区间最值）

```python
class ST:
    def __init__(self,A,func=max):
        dp = A[:]
        self.st = st = [dp]
        j, N = 1, len(dp)
        while 2*j<=N:
            dp = [func(dp[i],dp[i+j]) for i in range(N-2*j+1)]
            st.append(dp)
            j <<= 1
        self.func = func
            
    def query(self,l,r):
        j = (r-l+1).bit_length()-1
        return self.func(self.st[j][l],self.st[j][r-(1<<j)+1])
```


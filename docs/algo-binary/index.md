# 算法（二）：二分与倍增

统计二分
- {{< lc "3261" >}} [统计满足 K 约束的子字符串数量 II](https://leetcode.cn/contest/weekly-contest-411/problems/count-substrings-that-satisfy-k-constraint-ii/) （2659 分）

答案二分

## 倍增

```python
class ST:
    def __init__(self,A,func=max):
        f = A[:]
        self.st = st = [f]
        j, N = 1, len(f)
        while 2*j<=N:
            f = [func(f[i],f[i+j]) for i in range(N-2*j+1)]
            st.append(f)
            j <<= 1
        self.func = func
            
    def query(self,l,r):
        j = (r-l+1).bit_length()-1
        return self.func(self.st[j][l],self.st[j][r-(1<<j)+1])
```

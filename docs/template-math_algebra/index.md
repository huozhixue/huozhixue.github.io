# 数学模板：线性代数


##  矩阵快速幂

```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat, n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res
    
f = [[],[]]
A = [[],[]]
f = mul(mpow(A,n),f)
```

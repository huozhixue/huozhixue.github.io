# 字符串模板：字符串匹配


## 1 kmp

- [前缀函数与 KMP 算法](https://oi.wiki/string/kmp/)

```python
def kmp(s):
    n = len(s)
    pi,j = [0]*n,0
    for i in range(1,n):
        while j>0 and s[i]!=s[j]:
            j = pi[j-1]
        j += s[i]==s[j]
        pi[i] = j
    return pi              # pi[i]:i结尾的最大真前缀长度
```

## 2 manacher

- [Manacher](https://oi.wiki/string/manacher/)

```python
def manacher(s):
	n = len(s)
	A, B = [], [1]*n
	mid, r = 0, 0
	for i in range(n):
		a = min(A[2*mid-i], r-i) if r>i else 0
		while i-a and i+a<n-1 and s[i-a-1]==s[i+a+1]:
			a += 1
			B[i+a] = max(B[i+a],a*2+1)
		A.append(a)
		if i+a>r:
			mid, r = i, i+a
	return B       # B[i]:i结尾的最大回文子串长度（奇数）
```

## 3 z 函数

- [Z 函数（扩展 KMP）](https://oi.wiki/string/z-func/)

```python
def zfunc(s):
	n = len(s)
	z, l, r = [0]*n, 0, 0
	for i in range(1,n):
		z[i] = max(min(z[i-l],r-i+1), 0)
		while i+z[i]<n and s[z[i]]==s[i+z[i]]:
			l, r = i, i+z[i]
			z[i] += 1
	return z      # z[i]:lcp(后缀i,后缀0) 
```

## 4 滚动哈希

- [字符串哈希](https://oi.wiki/string/hash/)

```python
## 滚动哈希
base, mod = 29, 10**11+13
B = [1]
for _ in range(3*10**4):
    B.append(B[-1]*base%mod)
def gen(A):
    return list(accumulate([0]+A,lambda a,b:(a*base+b)%mod))
def cal(pre,i,j):
    return (pre[j+1]-pre[i]*B[j-i+1])%mod
```


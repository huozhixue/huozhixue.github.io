# 字符串模板：最小表示法

- [最小表示法](https://oi.wiki/string/minimal-string)

```python []
def minimal(s):
    n = len(s)
    i,j,a = 0,1,0
    while i<n and j<n and a<n:
        x,y = s[(i+a)%n],s[(j+a)%n]
        if x==y:
            a += 1
        elif x>y:
            i,j,a = j,max(i+a,j)+1,0
        else:
            j,a = j+a+1,0
    return s[i:]+s[:i]
```

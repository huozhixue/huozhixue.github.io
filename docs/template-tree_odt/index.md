# 树模板：珂朵莉树

##  珂朵莉树

```python
class ODT:
    def __init__(self,):
        from sortedcontainers import SortedList
        self.sl = SortedList()
    
    def update(self,l,r,x):
        s, e = l, r
        pos = self.sl.bisect_right((r+2,))-1
        while pos>=0 and self.sl[pos][1]>=l-1:
            a, b, y = self.sl.pop(pos)
            if y==x:
                s, e = min(s, a), max(e, b)
            else:
                if b>r:
                    self.sl.add((r+1,b,y))
                if a<l:
                    self.sl.add((a,l-1,y))
            pos -= 1
        self.sl.add((s, e, x))
```


# 几何模板



## 1 圆

```python []
def in_circle(x,y,r,x1,y1):                     # 点 (x1,y1) 是否在园内 
    return (x1-x)*(x1-x)+(y1-y)*(y1-y)<=r*r

def cross_v(x,y,r,x1,y1,y2):                    # 线段 (x1,y1)-(x1,y2) 是否与圆（内）相交
    if y<y1:
        return in_circle(x,y,r,x1,y1)
    if y>y2:
        return in_circle(x,y,r,x1,y2)
    return abs(x1-x)<=r

def cross_h(x,y,r,x1,y1,x2):                   # 线段 (x1,y1)-(x2,y1) 是否与圆（内）相交
    if x<x1:
        return in_circle(x,y,r,x1,y1)
    if x>x2:
        return in_circle(x,y,r,x2,y1)
    return abs(y1-y)<=r
```



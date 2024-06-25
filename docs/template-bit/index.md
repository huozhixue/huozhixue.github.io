# 位运算模版

## 遍历子集

```python
y = st                 # 生成 st 的所有子集
while y:
    # 处理子集 y
    y = (y-1)&st
```

## Gosper's Hack

-  [算法学习笔记(75): Gosper's Hack](https://zhuanlan.zhihu.com/p/360512296)


```python   
st,ma = (1<<k)-1, 1<<n                   # 生成 n 元集合所有 k 元子集
while st<ma:
    # 处理子集 st
	lb = st&-st
	r = st+lb
	st = (r^st)>>(lb.bit_length()+1)|r
	if st==0:
		break
```



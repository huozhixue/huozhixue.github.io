# 链表模版

##  计算器

```python
def cal(s: str) -> int:
	func = {'+':int.__add__,'-':int.__sub__,'*':int.__mul__,'/':lambda x,y:x//y}
	pro = dict(zip('+-*/(','11223'))
	sk,ops = [],[]
	for x,op in re.findall('(\d+)|([-+*/()])',s+'+'):
		if x:
			sk.append(int(x))
		elif op=='(':
			ops.append(op)
		elif op==')':
			while ops[-1] != '(':
				b,a = sk.pop(),sk.pop()
				sk.append(func[ops.pop()](a,b))
			ops.pop()
		else:
			while ops and pro[ops[-1]]<=pro[op]:
				b,a = sk.pop(),sk.pop()
				sk.append(func[ops.pop()](a,b))
			ops.append(op)
	return sk.pop()
```



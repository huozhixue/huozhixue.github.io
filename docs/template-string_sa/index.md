# 字符串模板：后缀数组

##  后缀数组

```python
def SA(A):
	def SA_IS(A):
		def equal(pos1, pos2):
			end1, end2 = LMS.find('*', pos1+1), LMS.find('*', pos2+1)
			return A[pos1:end1+1] == A[pos2:end2+1]

		def IS(stars):
			sa = [n] + [-1] * n
			tails = list(accumulate(bucket))
			for i in stars[::-1]:
				sa[tails[A[i]]] = i
				tails[A[i]] -= 1
			heads = list(accumulate([1] + bucket[:-1]))
			for i in range(n + 1):
				j = sa[i] - 1
				if j >= 0 and types[j] == 'L':
					sa[heads[A[j]]] = j
					heads[A[j]] += 1
			tails = list(accumulate(bucket))
			for i in range(n, -1, -1):
				j = sa[i] - 1
				if j >= 0 and types[j] == 'S':
					sa[tails[A[j]]] = j
					tails[A[j]] -= 1
			return sa[1:]
		n = len(A)
		types = list('0' * (n - 1) + 'LS')
		for i in range(n - 2, -1, -1):
			types[i] = 'S' if A[i] < A[i + 1] else 'L' if A[i] > A[i + 1] else types[i + 1]
		LMS = ''.join('*' if types[i - 1:i + 1] == ['L', 'S'] else ' ' for i in range(n + 1))
		ct = Counter(A)
		bucket = [ct[x] for x in range(max(ct) + 1)]
		stars = [i for i in range(n) if LMS[i] == '*']
		sa = IS(stars)
		d, cnt, prev = {}, 0, -1
		for pos in sa:
			if LMS[pos] == '*':
				cnt += prev < 0 or not equal(prev, pos)
				d[pos] = cnt
				prev = pos
		B = [d[pos] for pos in stars]
		d1 = {x-1:i for i,x in enumerate(B)}
		sa1 = [d1[x] for x in range(cnt)] if cnt == len(B) else SA_IS(B)
		return IS([stars[pos] for pos in sa1])
	
	def SA_h(A,sa):
		n = len(A)
		rk, height, h = [0]*n,[0]*n,0
		for i in range(n):
			rk[sa[i]] = i
		for i in range(n):
			h = max(0, h-1)
			j = sa[rk[i]-1] if rk[i] else n
			while max(i,j)+h<n and A[i+h]==A[j+h]:
				h += 1
			height[rk[i]] = h
		return rk, height
	sa = SA_IS(A)           # sa[i]:第i小的后缀编号
	rk, height = SA_h(A,sa) # rk[i]:后缀i的排名
	return sa,rk,height     # height[i]:lcp(sa[i],sa[i-1])
```



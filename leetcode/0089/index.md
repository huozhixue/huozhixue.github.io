# 0089：格雷编码（★★）


## 题目

格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。

格雷编码序列必须以 0 开头。

<!--more--> 

示例 1:

	输入: 2
	输出: [0,1,3,2]
	解释:
	00 - 0
	01 - 1
	11 - 3
	10 - 2

	对于给定的 n，其格雷编码序列并不唯一。
	例如，[0,2,3,1] 也是一个有效的格雷编码序列。

	00 - 0
	10 - 2
	11 - 3
	01 - 1
	
示例 2:

	输入: 0
	输出: [0]
	解释: 我们定义格雷编码序列必须以 0 开头。
	     给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
	     因此，当 n = 0 时，其格雷编码序列为 [0]。
	 


## 分析

直接构造比较困难，找下规律。

发现可以先把第一位固定为 0，后面跟 n-1 位的格雷编码，然后把第一位变为 1，后面跟 n-1 位的格雷编码的反序即可。

## 解答

```python
def grayCode(self, n: int) -> List[int]:
	res = [0]
	for i in range(n):
		res += [(1<<i)+num for num in res[::-1]]
	return res
```

44 ms

## *附加

格雷码的生成有个公式，可以直接套用，即遍历 num 从 0 到 $2^n-1$，格雷码等于 num^(num >> 1)

```python
def grayCode(self, n: int) -> List[int]:
	return [num^(num>>1) for num in range(1<<n)]
```

56 ms

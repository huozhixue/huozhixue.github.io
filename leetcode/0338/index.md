# 0338：比特位计数（★★）


## 题目

给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

给出时间复杂度为 O(n*sizeof(integer)) 的解答非常容易。但你可以在线性时间 O(n) 内用一趟扫描做到吗？

<!--more--> 

示例 1:

	输入: 2
	输出: [0,1,1]
	
示例 2:

	输入: 5
	输出: [0,1,1,2,1,2]


## 分析

### #1

每个数字的计算即是问题 0191 ，可以遍历求解：

```python
def countBits(self, num: int) -> List[int]:
	return (bin(i).count('1') for i in range(num+1))
```

104 ms


### #2

要求线性时间完成，考虑能否递推。

令 res[i] 代表 i 的二进制数中 1 的个数。由 0191 可知 j=i&(i-1) 等价于 i 的最后一个 1 变为 0，所以 res[i]=res[j]+1。

再考虑初始条件 res[0] = 0 即可。

## 解答

```python
def countBits(self, num: int) -> List[int]:
	res = [0]
	for i in range(1, num+1):
		res.append(res[i&(i-1)]+1)
	return res
```

96 ms


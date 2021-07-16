# 1054：距离相等的条形码（★）




## 题目

在一个仓库里，有一排条形码，其中第 i 个条形码为 barcodes[i]。

请你重新排列这些条形码，使其中两个相邻的条形码 不能 相等。 你可以返回任何满足该要求的答案，此题保证存在答案。

提示：

- 1 <= barcodes.length <= 10000
- 1 <= barcodes[i] <= 10000


 <!--more--> 
 
示例 1：

	输入：[1,1,1,2,2,2]
	输出：[2,1,2,1,2,1]

示例 2：

	输入：[1,1,1,1,2,2,3,3]
	输出：[1,3,1,3,2,1,2,1]


## 分析

与 {{< lc "0767" >}} 非常相似，贪心即可。


## 解答

```python
def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
	n, ct = len(barcodes), Counter(barcodes)
	res, cur = [0] * n, 1
	for num, freq in ct.items():
		if freq == (n+1) // 2 and not res[0]:
			res[0::2] = [num] * freq
		else:
			for _ in range(freq):
				res[cur] = num
				cur = cur + 2 if cur + 2 < n else 0
	return res
```

96 ms


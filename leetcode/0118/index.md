# 0118：杨辉三角


## 题目

给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

在杨辉三角中，每个数是它左上方和右上方的数的和。

<!--more--> 

示例:

	输入: 5
	输出:
	[
		 [1],
		[1,1],
	   [1,2,1],
	  [1,3,3,1],
	 [1,4,6,4,1]
	]


## 分析

每层迭代即可。

## 解答

```python
def generate(self, numRows: int) -> List[List[int]]:
    res = [[1]] if numRows else []
    for _ in range(numRows-1):
        res.append([a+b for a, b in zip([0]+res[-1], res[-1]+[0])])
    return res
```

28 ms


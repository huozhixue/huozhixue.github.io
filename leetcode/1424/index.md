# 1424：对角线遍历 II（★★）




## 题目

给你一个列表 nums ，里面每一个元素都是一个整数列表。请你依照下面各图的规则，按顺序返回 nums 中对角线上的整数。

<!--more--> 

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/23/sample_1_1784.png)

	输入：nums = [[1,2,3],[4,5,6],[7,8,9]]
	输出：[1,4,2,7,5,3,8,6,9]

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/23/sample_2_1784.png)

	输入：nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
	输出：[1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]

示例 3：

	输入：nums = [[1,2,3],[4],[5,6,7],[8],[9,10,11]]
	输出：[1,4,2,5,3,8,6,9,7,10,11]

示例 4：

	输入：nums = [[1,2,3,4,5,6]]
	输出：[1,2,3,4,5,6]




## 分析

### #1

类似 0498 ，可以先保存每一条对角线的列表，然后再拼接。

一开始遍历 nums 可以反向遍历行，最终拼接时就无需再反转了。

```python
def findDiagonalOrder(self, nums: List[List[int]]) -> List[int]:
	m, n = len(nums), len(nums) and max(map(len, nums))
	tmp = [[] for _ in range(m+n-1)]
	for i in range(m-1, -1, -1):
		for j in range(len(nums[i])):
			tmp[i+j].append(nums[i][j])
	res = []
	for i, diag in enumerate(tmp):
		res.extend(diag)
	return res
```

180 ms

### #2

还有种巧妙的方法，将所有元素按 (i+j, j) 排序即可。


## 解答

```python
def findDiagonalOrder(self, nums: List[List[int]]) -> List[int]:
	return [t[-1] for t in sorted((i+j, j, num) for i, row in enumerate(nums) for j, num in enumerate(row))]
```

184 ms



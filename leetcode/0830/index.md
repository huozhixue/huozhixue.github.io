# 0830：较大分组的位置


第 83 场周赛第 1 题

## 题目

在一个由小写字母构成的字符串 s 中，包含由一些连续的相同字符所构成的分组。

例如，在字符串 s = "abbxxxxzyy" 中，就含有 "a", "bb", "xxxx", "z" 和 "yy" 这样的一些分组。

分组可以用区间 [start, end] 表示，其中 start 和 end 分别表示该分组的起始和终止位置的下标。上例中的 "xxxx" 分组用区间表示为 [3,6] 。

我们称所有包含大于或等于三个连续字符的分组为 较大分组 。

找到每一个 较大分组 的区间，按起始位置下标递增顺序排序后，返回结果。

 <!--more--> 
 
示例 1：

	输入：s = "abbxxxxzzy"
	输出：[[3,6]]
	解释："xxxx" 是一个起始于 3 且终止于 6 的较大分组。

示例 2：

	输入：s = "abc"
	输出：[]
	解释："a","b" 和 "c" 均不是符合要求的较大分组。
	
示例 3：

	输入：s = "abcdddeeeeaabbbcd"
	输出：[[3,5],[6,9],[12,14]]
	解释：较大分组为 "ddd", "eeee" 和 "bbb"
	
示例 4：

	输入：s = "aba"
	输出：[]


 
## 分析

直接遍历，不连续了就计算上一段长度，决定是否添加。


## 解答

```python
def largeGroupPositions(self, s: str) -> List[List[int]]:
	res, i = [], 0
	for j in range(len(s)):
		if j == len(s)-1 or s[j] != s[j+1]:
			if j - i >= 2:
				res.append([i, j])
			i = j+1
	return res
```

时间复杂度 O(N)，40 ms


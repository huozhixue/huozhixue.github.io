# 0014：最长公共前缀


## 题目

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

strs[i] 仅由小写英文字母组成

<!--more--> 


示例 1：

	输入：strs = ["flower","flow","flight"]
	输出："fl"

示例 2：

	输入：strs = ["dog","racecar","car"]
	输出：""
	解释：输入不存在公共前缀。


## 分析

直接遍历每个位置，不全相等就中止，得到公共前缀。

## 解答

```python
def longestCommonPrefix(self, strs: List[str]) -> str:
	res = ''
	for col in zip(*strs):
		if len(set(col)) != 1:
			break
		res += col[0]
	return res
```
36 ms

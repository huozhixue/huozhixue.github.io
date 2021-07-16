# 1081：不同字符的最小子序列（★★）




## 题目

返回 s 字典序最小的子序列，该子序列包含 s 的所有不同字符，且只包含一次。


 <!--more--> 
 
示例 1：

	输入：s = "bcabc"
	输出："abc"
	
示例 2：

	输入：s = "cbacdcbc"
	输出："acdb"


## 分析


与 0316 完全相同。


## 解答

```python
def smallestSubsequence(self, s: str) -> str:
	tmp = ''
	for i, char in enumerate(s):
		if char not in tmp:
			while tmp and tmp[-1]>char and s.find(tmp[-1], i)!=-1:
				tmp = tmp[:-1]
			tmp += char
	return tmp
```

40 ms


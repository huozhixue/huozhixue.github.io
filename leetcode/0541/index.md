# 0541：反转字符串 II


## 题目

给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。

- 如果剩余字符少于 k 个，则将剩余字符全部反转。
- 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。


 <!--more--> 
 
示例:

	输入: s = "abcdefg", k = 2
	输出: "bacdfeg"
	
## 分析

按 2k 长度分段进行操作即可。

## 解答

```python
def reverseStr(self, s: str, k: int) -> str:
	return ''.join(s[i:i+k][::-1] + s[i+k:i+2*k] for i in range(0, len(s), 2*k))
```

40 ms

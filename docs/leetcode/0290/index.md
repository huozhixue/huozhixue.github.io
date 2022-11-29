# 0290：单词规律（★）


## 题目

给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。

这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的
每个非空单词之间存在着双向连接的对应规律。

 
示例1:

	输入: pattern = "abba", str = "dog cat cat dog"
	输出: true

示例 2:

	输入:pattern = "abba", str = "dog cat cat fish"
	输出: false

示例 3:

	输入: pattern = "aaaa", str = "dog cat cat dog"
	输出: false
	 

提示:
- 1 <= pattern.length <= 300
- pattern 只包含小写英文字母
- 1 <= s.length <= 3000
- s 只包含小写英文字母和 ' '
- s 不包含 任何前导或尾随对空格
- s 中每个单词都被 单个空格 分隔



## 分析

类似 {{< lc "0205" >}}，注意先判断 s 的单词数和 pattern 长度是否相同即可。

## 解答

```python
def wordPattern(self, pattern: str, s: str) -> bool:
    A, B =  pattern, s.split()
    return len(A)==len(B) and len(set(A))==len(set(B))==len(set(zip(A, B)))
```
32 ms


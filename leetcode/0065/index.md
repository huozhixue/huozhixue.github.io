# 0065：有效数字（★★★）


## 题目

有效数字（按顺序）可以分成以下几个部分：

- 一个 小数 或者 整数
- （可选）一个 'e' 或 'E' ，后面跟着一个 整数

小数（按顺序）可以分成以下几个部分：

- （可选）一个符号字符（'+' 或 '-'）
- 下述格式之一：
	- 至少一位数字，后面跟着一个点 '.'
	- 至少一位数字，后面跟着一个点 '.' ，后面再跟着至少一位数字
	- 一个点 '.' ，后面跟着至少一位数字

整数（按顺序）可以分成以下几个部分：

- （可选）一个符号字符（'+' 或 '-'）
- 至少一位数字

部分有效数字列举如下：

	["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]

部分无效数字列举如下：

	["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]

给你一个字符串 s ，如果 s 是一个 有效数字 ，请返回 true 。

s 仅含英文字母（大写和小写），数字（0-9），加号 '+' ，减号 '-' ，或者点 '.' 。

<!--more--> 

示例 1：

	输入：s = "0"
	输出：true
	
示例 2：

	输入：s = "e"
	输出：false
	
示例 3：

	输入：s = "."
	输出：false
	
示例 4：

	输入：s = ".1"
	输出：true
	 

## 分析

### #1

首先想到用正则：

	有效整数很简单:									"[+-]?\d+"

	有效小数基于有效整数，考虑两种格式:
	'.' 之前至少一位数字 							"[+-]?\d+\.\d*"
	'.' 之前没有数字，之后至少一位 					"[+-]?\.\d+"
	
	有效数字基于有效整数和小数，考虑两种格式:
	不存在 "eE", 就是一个小数或整数					"[+-]?(\d+(\.\d*)?|\.\d+)"
	存在一个 "eE", 前面是小数或整数, 后面是整数		"[+-]?(\d+(\.\d*)?|\.\d+)[eE][+-]?\d+"

整合一下即得最终表达式。

```python
def isNumber(self, s: str) -> bool:
	return bool(re.match(r"[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$", s))
```

40 ms

### #2

不用正则的话，可以参考表达式发现，有效数字等价于满足以下条件：

- "+-" 只能出现在开头和 'eE' 后面
- '.' 只能出现在 'eE' 之前，且只能出现一次
- 'eE' 只能出现一次
- 若没有 'eE'，至少应出现一位数字，若有 'eE'，前后都至少一位数字
- 其它字母不能出现


## 解答

```python
def isNumber(self, s: str) -> bool:
	flag_e = flag_dot = num_before_e = num_after_e = False
	for i, char in enumerate(s):
		if char in '+-':
			if i > 0 and s[i-1] not in 'eE':
				return False
		elif char == '.':
			if flag_e or flag_dot:
				return False
			flag_dot = True
		elif char in 'eE':
			if flag_e:
				return False
			flag_e = True
		elif char in '0123456789':
			if flag_e:
				num_after_e = True
			else:
				num_before_e = True
		else:
			return False
	return num_before_e and (flag_e == num_after_e)
```

44 ms

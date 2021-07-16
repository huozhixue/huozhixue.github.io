# 0647：回文子串（★★）


## 题目

给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。


 <!--more--> 
 
 示例 1：

	输入："abc"
	输出：3
	解释：三个回文子串: "a", "b", "c"

示例 2：

	输入："aaa"
	输出：6
	解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 
## 分析

### #1

做过 0005 的话，容易想到用同样的方法，暴力法、动态规划、中心扩展法。
这里用中心扩展法。

```python
def countSubstrings(self, s: str) -> int:
	def expand(s, left, right):
		while left > 0 and right < len(s)-1 and s[left-1] == s[right+1]:
			left -= 1
			right += 1
			self.res += 1
			
	self.res = len(s)
	for i in range(len(s)):
		expand(s, i, i)
		expand(s, i+1, i)
	return self.res
```

时间复杂度 O(N^2)，208 ms

### #2

还可以尝试经典的 Manacher 算法。

## 解答

```python
def countSubstrings(self, s: str) -> int:
	def expand(s, left, right):
		while left > 0 and right < len(s)-1 and s[left-1] == s[right+1]:
			left -= 1
			right += 1
		return (right - left) // 2

	def manacher(s):
		s = '#' + '#'.join(list(s)) + '#'
		arm_len, center, right = [], 0, 0
		for i in range(len(s)):
			if right > i:
				i_sym = 2 * center - i
				min_arm_len = min(arm_len[i_sym], right - i)
				cur_arm_len = expand(s, i - min_arm_len, i + min_arm_len)
			else:
				cur_arm_len = expand(s, i, i)
			arm_len.append(cur_arm_len)
			if i + cur_arm_len > right:
				center, right = i, i + cur_arm_len
			self.res += cur_arm_len // 2

	self.res = len(s)
	manacher(s)
	return self.res
```

时间复杂度 O(N)，52 ms


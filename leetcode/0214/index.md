# 0214：最短回文串（★★★）


## 题目

给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。


<!--more--> 

示例 1：

	输入：s = "aacecaaa"
	输出："aaacecaaa"

示例 2：

	输入：s = "abcd"
	输出："dcbabcd"


## 分析

### #1

观察可知问题等价于找到 s 最长的前缀回文子串 s[:i]，然后在前面添加 s 剩下部分的反序 s[:i-1:-1] 即可

```python
def shortestPalindrome(self, s: str) -> str:
	for i in range(len(s), -1, -1):
		tmp = s[:i]
		if tmp == tmp[::-1]:
			break
	return s[:i-1:-1] + s 
```

时间复杂度 $O(N^2)$，496 ms，勉强 AC

### #2

跟回文子串相关，试试经典的 Manacher 算法

Manacher 算法可以在 O(N) 时间获得每个位置 i 的臂长，显然臂长等于 i 的话就得到一个前缀回文子串，找出最长的即可

显然满足条件的位置 i 不可能超过中心位置，所以可以节省一半的遍历时间

## 解答

```python
def shortestPalindrome(self, s: str) -> str:
	def expand(s, left, right):
		while left > 0 and right < len(s)-1 and s[left-1] == s[right+1]:
			left -= 1
			right += 1
		return (right - left) // 2

	def manacher(s):
		s = '#' + '#'.join(list(s)) + '#'
		arm_len, center, right = [], 0, 0
		for i in range(len(s)//2+1):
			if right > i:
				i_sym = 2 * center - i
				min_arm_len = min(arm_len[i_sym], right - i)
				cur_arm_len = expand(s, i - min_arm_len, i + min_arm_len)
			else:
				cur_arm_len = expand(s, i, i)
			arm_len.append(cur_arm_len)
			if i + cur_arm_len > right:
				center, right = i, i + cur_arm_len
			if cur_arm_len == i:
				self.maxi = i
				
	self.maxi = 0
	manacher(s)
	return s[:self.maxi-1:-1] + s
```

时间复杂度 O(N)，76 ms

## *附加

还有个很巧妙的 KMP 解法

注意到对于 s 的反序 t，若 s[:i] 是回文子串，那么 t[-i:] 也是回文子串

如果用 KMP 算法将 s 作为模式串在 t 中匹配，遍历到 t 末尾时，s[:j] 是已经匹配的部分，即为 s 的最长前缀回文子串

```python
def shortestPalindrome(self, s: str) -> str:
	nxt, j, n = [-1], -1, len(s)
	for i in range(n):
		while j >= 0 and s[i] != s[j]:
			j = nxt[j]
		j += 1
		nxt.append(j)
	t, j = s[::-1], 0
	for i in range(n):
		while j >= 0 and t[i] != s[j]:
			j = nxt[j]
		j += 1
	return s[:j-1:-1] + s
```

时间复杂度 O(N)，60 ms



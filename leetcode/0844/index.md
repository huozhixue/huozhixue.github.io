# 0844：比较含退格的字符串（★）



## 题目

给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。

你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？ 

 <!--more--> 
 
示例 1：

	输入：S = "ab#c", T = "ad#c"
	输出：true
	解释：S 和 T 都会变成 “ac”。

示例 2：

	输入：S = "ab##", T = "c#d#"
	输出：true
	解释：S 和 T 都会变成 “”。

示例 3：

	输入：S = "a##c", T = "#a#c"
	输出：true
	解释：S 和 T 都会变成 “c”。

示例 4：

	输入：S = "a#c", T = "b"
	输出：false
	解释：S 会变成 “c”，但 T 仍然是 “b”。

 
## 分析

### #1

最简单的就是用栈模拟，然后比较即可。

```python
def backspaceCompare(self, s: str, t: str) -> bool:
	def help(s):
		stack = []
		for char in s:
			if char != '#':
				stack.append(char)
			elif stack:
				stack.pop()
		return stack
	return help(s) == help(t)
```

52 ms

### #2

题目要求空间复杂度 O(1)。考虑用双指针反向遍历，遇到 '#' 时用 cnt 记录，并跳过相应个数的普通字符，找到下一个有效字符，再进行比较即可。

具体实现时，用辅助函数 nxt(i, s) 表示从当前的有效字符位置 i，反向遍历找到 s 中的下一个有效字符位置。那么初始令 i=len(s), j=len(t),
然后不断调用 nxt(i, s) 和 nxt(j, t) 并比较即可。


## 解答

```python
def backspaceCompare(self, s: str, t: str) -> bool:
	def nxt(i, s):
		i, cnt = i-1, 0
		while i >= 0:
			if s[i] != '#' and cnt == 0:
				break
			cnt += 1 if s[i] == '#' else -1
			i -= 1
		return i

	i, j = len(s), len(t)
	while i >= 0 and j >= 0:
		i, j = nxt(i, s), nxt(j, t)
		if not (i >= 0 and j >= 0 and s[i] == t[j] or (i == j == -1)):
			return False
	return True
```

32 ms


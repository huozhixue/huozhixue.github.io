# 0767：重构字符串（★）


## 题目

给定一个字符串S，检查是否能重新排布其中的字母，使得两相邻的字符不同。

若可行，输出任意可行的结果。若不可行，返回空字符串。

注意:

- S 只包含小写字母并且长度在[1, 500]区间内。


 <!--more--> 
 
示例 1:

	输入: S = "aab"
	输出: "aba"

示例 2:

	输入: S = "aaab"
	输出: ""


## 分析

### #1

先用 Counter 计数，然后最大频数 maxFreq 大于 (len(S)+1) // 2，则该字母必然有两个相邻，不可行。

反之，则存在可行的贪心方案。按频数从大到小遍历字符，先从 0 开始在偶数位置上依此放字符，如果越界了就从 1 开始在奇数位置上依次放字符。
显然，放某个字符 char 时，因为频数小于 (len(S)+1) // 2，必然不会相邻。

```python
def reorganizeString(self, S: str) -> str:
	n, ct = len(S), Counter(S)
	if max(ct.values()) > (n+1) // 2:
		return ''
	res, cur = [''] * n, 0
	for char in sorted(ct, key=ct.get, reverse=True):
		for _ in range(ct[char]):
			res[cur] = char
			cur = cur + 2 if cur + 2 < n else 1
	return ''.join(res)
```

40 ms

### #2

观察发现其实排序只有当 maxFreq == (len(S)+1) // 2 是必要的，此时若不排序，贪心策略可能会让该频数的字符相邻。

有个巧妙的方法来解决，先占奇数位置，遇到第一个 freq == (len(S)+1) // 2 时，让其占偶数位置即可。

## 解答

```python
def reorganizeString(self, S: str) -> str:
	n, ct = len(S), Counter(S)
	if max(ct.values()) > (n+1) // 2:
		return ''
	res, cur = [''] * n, 1
	for char, freq in ct.items():
		if freq == (n+1) // 2 and not res[0]:
			res[0::2] = [char] * freq
		else:
			for _ in range(freq):
				res[cur] = char
				cur = cur + 2 if cur + 2 < n else 0
	return ''.join(res)
```

36 ms



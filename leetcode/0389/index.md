# 0389：找不同


第 2 场周赛第 1 题

## 题目

给定两个字符串 s 和 t，它们只包含小写字母。

字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。

请找出在 t 中被添加的字母。

 <!--more--> 
 
示例 1：

	输入：s = "abcd", t = "abcde"
	输出："e"
	解释：'e' 是那个被添加的字母。
	
示例 2：

	输入：s = "", t = "y"
	输出："y"
	
示例 3：

	输入：s = "a", t = "aa"
	输出："a"
	
示例 4：

	输入：s = "ae", t = "aea"
	输出："a"


## 分析

### #1

最直接的就是记录每个字符的个数，看哪个字符在 t 中比 s 多一个

```python
def findTheDifference(self, s: str, t: str) -> str:
	return (Counter(t) - Counter(s)).popitem()[0]
```

时间复杂度 O(N)，24 ms

### #2

有个巧妙的想法，将字符转为数字，然后 t 的和比 s 的和多的就是添加字母对应的数字

## 解答

```python
def findTheDifference(self, s: str, t: str) -> str:
	return chr(sum(map(ord, t)) - sum(map(ord, s)))
```

时间复杂度 O(N)，32 ms



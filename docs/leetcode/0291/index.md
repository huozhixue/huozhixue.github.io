# 0291：单词规律 II（★★）


## 题目

给你一种规律 pattern 和一个字符串 s，请你判断 s 是否和 pattern 的规律相匹配。

如果存在单个字符到字符串的 双射映射 ，那么字符串 s 匹配 pattern ，即：
如果pattern 中的每个字符都被它映射到的字符串替换，那么最终的字符串则为 s 。
双射 意味着映射双方一一对应，不会存在两个字符映射到同一个字符串，
也不会存在一个字符分别映射到两个不同的字符串。

示例 1：

	输入：pattern = "abab", s = "redblueredblue"
	输出：true
	解释：一种可能的映射如下：
	'a' -> "red"
	'b' -> "blue"

示例 2：

	输入：pattern = "aaaa", s = "asdasdasdasd"
	输出：true
	解释：一种可能的映射如下：
	'a' -> "asd"

示例 3：

	输入：pattern = "aabb", s = "xyzabcxzyabc"
	输出：false
 

提示：
- 1 <= pattern.length, s.length <= 20
- pattern 和 s 由小写英文字母组成


## 分析

典型的回溯，尝试用 s 的不同前缀来匹配，如果映射冲突就返回上一步。

注意回溯时维护两个方向的映射即可。

## 解答

```python
def wordPatternMatch(self, pattern: str, s: str) -> bool:
    def dfs(p, s):
        if not p and not s:
            return True
        if not p or not s:
            return False
        x = p[0]
        if x in d1:
            y = d1[x]
            return s[:len(y)]==y and dfs(p[1:], s[len(y):])
        for i in range(len(s)):
            y = s[:i+1]
            if y not in d2:
                d1[x], d2[y] = y, x
                if dfs(p[1:], s[i+1:]):
                    return True
                del d1[x], d2[y]
        return False
    
    d1, d2 = {}, {}
    return dfs(pattern, s)
```
36 ms

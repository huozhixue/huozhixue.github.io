# 0044：通配符匹配（★★★）


## 题目

给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。
- '?' 可以匹配任何单个字符。
- '*' 可以匹配任意字符串（包括空字符串）。

两个字符串完全匹配才算匹配成功。

说明:
- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。

示例 1:

	输入:
	s = "aa"
	p = "a"
	输出: false
	解释: "a" 无法匹配 "aa" 整个字符串。

示例 2:

	输入:
	s = "aa"
	p = "*"
	输出: true
	解释: '*' 可以匹配任意字符串。

示例 3:

	输入:
	s = "cb"
	p = "?a"
	输出: false
	解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。

示例 4:

	输入:
	s = "adceb"
	p = "*a*b"
	输出: true
	解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".

示例 5:

	输入:
	s = "acdcb"
	p = "a*c?b"
	输出: false

	
## 分析

类似 {{< lc "0010" >}}，区别在于星号和前一个字符无关了。

    
## 解答

```python
def isMatch(self, s: str, p: str) -> bool:
    @lru_cache(None)
    def dfs(s, p):
        if not p:
            return not s
        if p[-1] == '*':
            return dfs(s, p[:-1]) or (bool(s) and dfs(s[:-1], p))
        return bool(s) and p[-1] in [s[-1], '?'] and dfs(s[:-1], p[:-1])
    return dfs(s, p)
```
1032 ms


## *附加

本题也可以用正则解决。

观察发现，将 p 按星号分割为一些子串，问题就等价于在 s 中依次搜索这些子串。

注意第一个子串要和 s 开头匹配，最后一个子串要和 s 末尾匹配。

```python
def isMatch(self, s: str, p: str) -> bool:
    subs, pos = re.split(r'\*+', p.replace('?', '.')), 0
    for i, sub in enumerate(subs):
        tmp = re.compile('^'*(i==0)+sub+'$'*(i==len(subs)-1)).search(s, pos)
        if not tmp:
            return False
        pos = tmp.end()
    return True
```
44 ms

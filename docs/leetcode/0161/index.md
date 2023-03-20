# 0161：相隔为 1 的编辑距离（★）


## 题目

给定两个字符串 s 和 t ，如果它们的编辑距离为 1 ，则返回 true ，否则返回 false 。

字符串 s 和字符串 t 之间满足编辑距离等于 1 有三种可能的情形：
- 往 s 中插入 恰好一个 字符得到 t
- 从 s 中删除 恰好一个 字符得到 t
- 在 s 中用 一个不同的字符 替换 恰好一个 字符得到 t
 

示例 1：

	输入: s = "ab", t = "acb"
	输出: true
	解释: 可以将 'c' 插入字符串 s 来得到 t。

示例 2:

	输入: s = "cab", t = "ad"
	输出: false
	解释: 无法通过 1 步操作使 s 变为 t。
	 

提示:
- 0 <= s.length, t.length <= 10^4
- s 和 t 由小写字母，大写字母和数字组成


## 分析

分类讨论，设 s/t 长度分别为 m/n：
- 若 m==n，则有且仅有一个位置上不同
- 若 m==n+1，则 s 删掉一个后相同
- 若 m==n-1，则 t 删掉一个后相同
- 其它情况不可能


## 解答

```python
def isOneEditDistance(self, s: str, t: str) -> bool:
    m, n = len(s), len(t)
    if m==n:
        return sum(a!=b for a,b in zip(s,t))==1
    if m==n+1:
        return any(s[:i]+s[i+1:]==t for i in range(m))
    if m==n-1:
        return any(t[:i]+t[i+1:]==s for i in range(n))
    return False
```
36 ms



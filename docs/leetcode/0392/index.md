# 0392：判断子序列（★）


> **第 3 场周赛第 1 题**

## 题目

给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。
（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

进阶：

如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。
在这种情况下，你会怎样改变代码？

提示：
- 0 <= s.length <= 100
- 0 <= t.length <= 10^4
- 两个字符串都只由小写字符组成

示例 1：

    输入：s = "abc", t = "ahbgdc"
    输出：true

示例 2：

    输入：s = "axc", t = "ahbgdc"
    输出：false
 

## 分析

### #1

遍历 s 的每个字符，在剩下的 t 中找第一个位置即可。

```python
def isSubsequence(self, s: str, t: str) -> bool:
    pos = 0
    for char in s:
        pos = t.find(char, pos) + 1
        if not pos:
            return False
    return True
```
24 ms

### #2

也可以遍历 t，逐步匹配 s。

```python
def isSubsequence(self, s: str, t: str) -> bool:
    i, n = 0, len(s)
    for char in t:
        if i<n and char == s[i]:
            i += 1
    return i==n
```
40 ms

### #3

还有种简单的迭代器写法。

## 解答

```python
def isSubsequence(self, s: str, t: str) -> bool:
    it = iter(t)
    return all(c in it for c in s)
```
40 ms

## *附加

如果有大量的 s，考虑保存 t 中字符 x 对应的下标列表，遍历 s 时从下标列表中二分查询即可。





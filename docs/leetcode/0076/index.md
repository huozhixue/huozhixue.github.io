# 0076：最小覆盖子串（★★★）


## 题目

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。


注意：
- 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
- 如果 s 中存在这样的子串，我们保证它是唯一的答案。

示例 1：

	输入：s = "ADOBECODEBANC", t = "ABC"
	输出："BANC"

示例 2：

	输入：s = "a", t = "a"
	输出："a"

示例 3:

	输入: s = "a", t = "aa"
	输出: ""
	解释: t 中两个字符 'a' 均应包含在 s 的子串中，
	因此没有符合条件的子字符串，返回空字符串。
 

提示：
- 1 <= s.length, t.length <= 10^5
- s 和 t 由英文字母组成
 
 

## 分析

### #1

{{< lc "0209" >}} 升级版，遍历每个位置 j 作为结尾，找符合条件的最短子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口，可以用 Counter 来判断是否符合。

```python
def minWindow(self, s: str, t: str) -> str:
    ct, ct2 = Counter(t), Counter()
    res, i = s+' ',  0
    for j, char in enumerate(s):
        ct2[char] += 1
        while not ct-ct2:
            res = res if len(res)<=(j-i+1) else s[i:j+1] 
            ct2[s[i]] -= 1
            i += 1
    return res if len(res) <= len(s) else ''
```
1040 ms

### #2

显然每次用 ct-ct2 来判断是否符合比较耗时。
有个巧妙的方法是新加一个变量 valid 维护有用字符的个数。
- 移动 j 时，如果 ct2[s[j]] < ct[s[j]]，s[j] 就是有用的，cnt 增 1
- 移动 i 时，如果 ct2[s[i]] > ct[s[i]]，s[i] 就是无用的，可以移动

## 解答

```python
def minWindow(self, s: str, t: str) -> str:
    ct, ct2 = Counter(t), Counter()
    res, i, valid = s+' ',  0, 0
    for j, char in enumerate(s):
        if ct2[char] < ct[char]:
            valid += 1
        ct2[char] += 1
        if valid == len(t):
            while ct2[s[i]]>ct[s[i]]:
                ct2[s[i]] -= 1
                i += 1
            res = res if len(res)<=(j-i+1) else s[i:j+1]
    return res if len(res) <= len(s) else ''
```
120 ms

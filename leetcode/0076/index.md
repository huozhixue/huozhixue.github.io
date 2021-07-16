# 0076：最小覆盖子串（★★★）


## 题目

给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：如果 s 中存在这样的子串，我们保证它是唯一的答案。

提示：

- 1 <= s.length, t.length <= 10^5
- s 和 t 由英文字母组成
 
<!--more--> 

示例 1：

    输入：s = "ADOBECODEBANC", t = "ABC"
    输出："BANC"

示例 2：

    输入：s = "a", t = "a"
    输出："a"
 

## 分析

### #1

{{< lc "0209" >}} 的升级版，遍历每个位置 j 作为结尾，找符合条件的最短子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。
可以用 Counter() 来判断是否符合。

```python
def minWindow(self, s: str, t: str) -> str:
    span, i = (0, len(s)), 0
    ct, ct0 = Counter(), Counter(t)
    for j, char in enumerate(s):
        ct[char] += 1
        while not ct0-ct:
            span = (i, j) if j-i < span[1]-span[0] else span
            ct[s[i]] -= 1
            i += 1
    return s[span[0]:span[1]+1] if span[1] < len(s) else ''
```

1204 ms

### #2

显然每次用 ct0-ct 来判断是否符合比较耗时。
有个巧妙的方法是新加一个变量 cnt 维护有用字符的个数。
    
    移动 j 时，如果 ct[s[j]] < ct0[s[j]]，s[j] 就是有用的，cnt 增 1
    移动 i 时，如果 ct[s[i]] <= ct0[s[i]]，s[i] 就是有用的，cnt 减 1
    cnt==len(t) 即代表符合要求

## 解答

```python
def minWindow(self, s: str, t: str) -> str:
    span, i = (0, len(s)), 0
    ct, ct0, cnt = Counter(), Counter(t), 0
    for j, char in enumerate(s):
        if ct[char] < ct0[char]:
            cnt += 1
        ct[char] += 1
        while cnt == len(t):
            span = (i, j) if j-i < span[1]-span[0] else span
            if ct[s[i]] <= ct0[s[i]]:
                cnt -= 1
            ct[s[i]] -= 1
            i += 1
    return s[span[0]:span[1]+1] if span[1] < len(s) else ''
```

140 ms

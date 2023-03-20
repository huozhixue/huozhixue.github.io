# 0159：至多包含两个不同字符的最长子串（★★）


## 题目

给定一个字符串 s ，找出 至多 包含两个不同字符的最长子串 t ，并返回该子串的长度。

示例 1:

	输入: "eceba"
	输出: 3
	解释: t 是 "ece"，长度为3。

示例 2:

	输入: "ccaabbb"
	输出: 5
	解释: t 是 "aabbb"，长度为5。


## 分析

典型的滑动窗口问题，维护至多 2 个不同字符的窗口，找最大窗口即可。

## 解答

```python
def lengthOfLongestSubstringTwoDistinct(self, s: str) -> int:
    res, d, i = 0, defaultdict(int), 0
    for j, c in enumerate(s):
        d[c] += 1
        while len(d)>2:
            d[s[i]]-=1
            if d[s[i]] == 0:
                del d[s[i]]
            i += 1
        res = max(res, j-i+1)
    return res
```
352 ms



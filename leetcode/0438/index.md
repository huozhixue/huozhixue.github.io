# 0438：找到字符串中所有字母异位词（★★）


## 题目

给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

不考虑答案输出的顺序。

<!--more--> 

示例 1:

	输入:
	s: "cbaebabacd" p: "abc"

	输出:
	[0, 6]

	解释:
	起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
	起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
	
 示例 2:

	输入:
	s: "abab" p: "ab"

	输出:
	[0, 1, 2]

	解释:
	起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
	起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
	起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。


## 分析

遍历每个窗口，判断是否符合即可。

判断是否异位词可以用排序，也可以用 Counter()。
发现用 Counter() 的话，相邻窗口可以递推，故采用 Counter()。

## 解答

```python
def findAnagrams(self, s: str, p: str) -> List[int]:
    res, k = [], len(p)
    ct, ct0 = Counter(), Counter(p)
    for j, char in enumerate(s):
        ct[char] += 1
        if j >= k:
            ct[s[j-k]] -= 1
            if ct[s[j-k]] == 0:
                del ct[s[j-k]]
        if j >= k-1 and ct == ct0:
            res.append(j-k+1)
    return res
```

156 ms

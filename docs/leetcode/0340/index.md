# 0340：至多包含 K 个不同字符的最长子串（★★）


## 题目

给定一个字符串 s ，找出 至多 包含 k 个不同字符的最长子串 T。

示例 1:

	输入: s = "eceba", k = 2
	输出: 3
	解释: 则 T 为 "ece"，所以长度为 3。

示例 2:

	输入: s = "aa", k = 1
	输出: 2
	解释: 则 T 为 "aa"，所以长度为 2。
	 

提示：
- 1 <= s.length <= 5 * 10^4
- 0 <= k <= 50



## 分析

典型的滑动窗口。

## 解答

```python
def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
    res, i, d = 0, 0, defaultdict(int)
    for j, c in enumerate(s):
        d[c] += 1
        while len(d)>k:
            d[s[i]] -= 1
            if not d[s[i]]:
                del d[s[i]]
            i += 1
        res = max(res, j-i+1)
    return res
```
88 ms




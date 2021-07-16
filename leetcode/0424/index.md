# 0424：替换后的最长重复字符（★★）


## 题目

给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。
在执行上述操作后，找到包含重复字母的最长子串的长度。

注意：字符串长度 和 k 不会超过 10^4。


<!--more--> 

示例 1：

    输入：s = "ABAB", k = 2
    输出：4
    解释：用两个'A'替换为两个'B',反之亦然。

示例 2：

    输入：s = "AABABBA", k = 1
    输出：4
    解释：
    将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
    子串 "BBBB" 有最长重复字母, 答案为 4。

## 分析


遍历每个位置 j 作为结尾，找符合条件的最长子串 [i, j] 即可。

发现遍历中 i 必然是不动或向右移的，因此是滑动窗口。

为了判断是否符合条件，可以维护一个计数器，如果除了频数最大的字符以外的个数不超过 k，就符合。

## 解答

```python
def characterReplacement(self, s: str, k: int) -> int:
    res, i, ct = 0, 0, Counter()
    for j, char in enumerate(s):
        ct[char] += 1
        while j-i+1-max(ct.values())>k:
            ct[s[i]] -= 1
            i += 1
        res = max(res, j-i+1)
    return res
```
224 ms

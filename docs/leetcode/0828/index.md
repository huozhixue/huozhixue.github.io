# 0828：统计子串中的唯一字符（★★）


> **第 83 场周赛第 4 题**

## 题目

我们定义了一个函数 countUniqueChars(s) 来统计字符串 s 中的唯一字符，并返回唯一字符的个数。

例如：s = "LEETCODE" ，则其中 "L", "T","C","O","D" 都是唯一字符，因为它们只出现一次，
所以 countUniqueChars(s) = 5 。

本题将会给你一个字符串 s ，我们需要返回 countUniqueChars(t) 的总和，其中 t 是 s 的子字符串。
注意，某些子字符串可能是重复的，但你统计时也必须算上这些重复的子字符串
（也就是说，你必须统计 s 的所有子字符串中的唯一字符）。

由于答案可能非常大，请将结果 mod 10 ^ 9 + 7 后再返回。

提示：
- 0 <= s.length <= 10^4
- s 只包含大写英文字符


示例 1：

    输入: s = "ABC"
    输出: 10
    解释: 所有可能的子串为："A","B","C","AB","BC" 和 "ABC"。
         其中，每一个子串都由独特字符构成。
         所以其长度总和为：1 + 1 + 1 + 2 + 2 + 3 = 10

示例 2：

    输入: s = "ABA"
    输出: 8
    解释: 除了 countUniqueChars("ABA") = 1 之外，其余与示例 1 相同。

示例 3：

    输入：s = "LEETCODE"
    输出：92
 

## 分析

可以对每个字符统计其作为唯一字符的次数。

令 left[i] 代表 s[i] 上一次出现的位置，right[i] 代表 s[i] 下一次出现的位置。
显然对于 [left[i], right[i]] 范围内包含 s[i] 的子串，s[i] 都是唯一字符。
这样的子串个数即为 (i-left[i])*(right[i]-i)。

借助哈希表可以一趟得到所有的 left[i] 和 right[i]。

## 解答

```python
def uniqueLetterString(self, s: str) -> int:
    n = len(s)
    left, right = [-1]*n, [n]*n
    d = {}
    for i, char in enumerate(s):
        if char in d:
            j = d[char]
            left[i] = j
            right[j] = i
        d[char] = i
    res, mod = 0, 10**9+7
    for i in range(n):
        res += (i-left[i])*(right[i]-i)
        res %= mod
    return res
```
236 ms


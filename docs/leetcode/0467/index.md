# 0467：环绕字符串中唯一的子字符串（★★）


## 题目

把字符串 s 看作是 “abcdefghijklmnopqrstuvwxyz” 的无限环绕字符串，所以 s 看起来是这样的：

"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...." . 
现在给定另一个字符串 p 。返回 s 中 唯一 的 p 的 非空子串 的数量 。 

 

示例 1:

    输入: p = "a"
    输出: 1
    解释: 字符串 s 中只有一个"a"子字符。
示例 2:

    输入: p = "cac"
    输出: 2
    解释: 字符串 s 中的字符串“cac”只有两个子串“a”、“c”。.
示例 3:

    输入: p = "zab"
    输出: 6
    解释: 在字符串 s 中有六个子串“z”、“a”、“b”、“za”、“ab”、“zab”。
 

提示:
- 1 <= p.length <= 10^5
- p 由小写英文字母构成


## 分析

容易想到用 dp[i] 代表以 p[i] 结尾的在 s 中的子串数量，即可递推。

但这样存在重复计算的问题，比如 'cac' 中 'c' 会被计算两次。
一个巧妙的想法是只需要找到以 'c' 结尾的最长的在 s 中的子串，只统计这一个 'c' 即可。

因此令 dp[x] 代表以 x 结尾的在 s 中的最长子串长度，最后 sum(dp[x]) 即为所求。

```python
def findSubstringInWraproundString(self, p: str) -> int:
    dp, cnt = defaultdict(int), 0
    for i, x in enumerate(p):
        cnt = cnt+1 if i and (ord(x)-ord(p[i-1]))%26==1 else 1
        dp[x] = max(dp[x], cnt)
    return sum(dp.values())
```
84 ms



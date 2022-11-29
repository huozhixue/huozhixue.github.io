# 0686：重复叠加字符串匹配（★★）


## 题目

给定两个字符串 a 和 b，寻找重复叠加字符串 a 的最小次数，使得字符串 b 成为叠加后的字符串 a 的子串，如果不存在则返回 -1。

注意：字符串 "abc" 重复叠加 0 次是 ""，重复叠加 1 次是 "abc"，重复叠加 2 次是 "abcabc"。

 

示例 1：

    输入：a = "abcd", b = "cdabcdab"
    输出：3
    解释：a 重复叠加三遍后为 "abcdabcdabcd", 此时 b 是其子串。
示例 2：

    输入：a = "a", b = "aa"
    输出：2
示例 3：

    输入：a = "a", b = "a"
    输出：1
示例 4：

    输入：a = "abc", b = "wxyz"
    输出：-1
 

提示：
- 1 <= a.length <= 104
- 1 <= b.length <= 104
- a 和 b 由小写英文字母组成

	 
 
## 分析

假设 b 是叠加 a 的子串，且 b[0] 匹配 a[i]，
那么根据 i 的范围可知 a 叠加后的长度最少 len(b)，最多 len(a)-1+len(b)。

因此令 k=len(b)//len(a)，那么 a 最少叠加 k 次，最多叠加 k+2 次，逐个判断即可。

## 解答

```python
def repeatedStringMatch(self, a: str, b: str) -> int:
    m, n = len(a), len(b)
    for x in range(n//m, n//m+3):
        if b in a*x:
            return x
    return -1
```
36 ms




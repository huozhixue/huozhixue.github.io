# 1316：不同的循环子字符串（★★★）


> **第 17 场双周赛第 4 题**

## 题目

给你一个字符串 text ，请你返回满足下述条件的 不同 非空子字符串的数目：

可以写成某个字符串与其自身相连接的形式（即，可以写为 a + a，其中 a 是某个字符串）。
例如，abcabc 就是 abc 和它自身连接形成的。

 

示例 1：
    
    输入：text = "abcabcabc"
    输出：3
    解释：3 个子字符串分别为 "abcabc"，"bcabca" 和 "cabcab" 。
示例 2：

    输入：text = "leetcodeleetcode"
    输出：2
    解释：2 个子字符串为 "ee" 和 "leetcodeleetcode" 。
 

提示：
- 1 <= text.length <= 2000
- text 只包含小写英文字母。


## 分析

暴力法就是直接遍历 i 和 L 判断 text[i:i+L] 和 text[i+L:i+2*L] 是否相等。

要优化判断子串相等的时间，容易想到用滚动哈希。

可以先求出 text 所有前缀的哈希值，然后类似前缀和，可以快速得到任一子串的哈希值。 

> 元素种类最多 26，窗口种类最多 2*10^6 级别，因此考虑 base 取 31，mod 取 10^13+37

## 解答

```python
def distinctEchoSubstrings(self, text: str) -> int:
    base, mod = 31, 10**13+37
    pre = [0]
    for char in text:
        w = pre[-1]*base+ord(char)-ord('a')+1
        pre.append(w % mod)
    res, n = set(), len(text)
    for L in range(1, n//2+1):
        bL = pow(base, L, mod)
        for i in range(n-2*L+1):
            w1 = (pre[i+L]-pre[i]*bL)%mod
            w2 = (pre[i+2*L]-pre[i+L]*bL)%mod
            if w1 == w2:
                res.add(w1)
    return len(res)
```
2760 ms



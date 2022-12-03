# 0459：重复的子字符串（★★）


> **第  场周赛第  题**

## 题目

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

 

示例 1:

    输入: s = "abab"
    输出: true
    解释: 可由子串 "ab" 重复两次构成。
示例 2:

    输入: s = "aba"
    输出: false
示例 3:
    
    输入: s = "abcabcabcabc"
    输出: true
    解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
     

提示：
- 1 <= s.length <= 10^4
- s 由小写英文字母组成



## 分析

### #1

假如长为 n 的 s 能由长 m 的子串 ss 组成，那么显然 n 是 m 的倍数。

因此考虑遍历所有 n 的因数（不包括 n）m，判断 s 是否由 s[:m] 重复构成即可。

```python
def repeatedSubstringPattern(self, s: str) -> bool:
    n = len(s)
    for i in range(1, int(sqrt(n))+1):
        if n%i==0:
            for j in [i, n//i]:
                if j<n and s[:j]*(n//j)==s:
                    return True
    return False
```
时间复杂度 $O(N*\sqrt N)$，32 ms

### #2

还有个巧妙的方法，s 由子串 ss 重复组成等价于 ss 是 s[1:]+s[:-1] 的子串。

这也是一个经典的方法：[证明](https://leetcode-cn.com/problems/repeated-substring-pattern/solution/zhong-fu-de-zi-zi-fu-chuan-by-leetcode-solution/)

## 解答

```python
def repeatedSubstringPattern(self, s: str) -> bool:
    return s in (s+s)[1:-1]
```
48 ms
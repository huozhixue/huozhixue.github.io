# 0459：重复的子字符串


> <u>**[力扣第 459 题](https://leetcode.cn/problems/repeated-substring-pattern/)**</u>

## 题目

<p>给定一个非空的字符串<meta charset="UTF-8" /> <code>s</code> ，检查是否可以通过由它的一个子串重复多次构成。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> s = "abab"
<strong>输出:</strong> true
<strong>解释:</strong> 可由子串 "ab" 重复两次构成。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s = "aba"
<strong>输出:</strong> false
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> s = "abcabcabcabc"
<strong>输出:</strong> true
<strong>解释:</strong> 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
</pre>



<p><b>提示：</b></p>

<p><meta charset="UTF-8" /></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>


**相似问题：**
- [0028：找出字符串中第一个匹配项的下标](/leetcode/0028)
- [0686：重复叠加字符串匹配](/leetcode/0686)


## 分析

### #1

- 假如长为 n 的 s 能由长 m 的子串 sub 组成，显然 n 是 m 的倍数
- 因此考虑遍历 n 的因数 m，判断 s 是否由 s[:m] 重复构成即可

```python
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        n = len(s)
        for i in range(1,isqrt(n)+1):
            if n%i==0:
                for j in [i,n//i]:
                    if j<n and s[:j]*(n//j)==s:
                        return True
        return False
```
时间复杂度 $O(N*\sqrt N)$，39 ms

### #2

还有个经典的 [方法](https://leetcode-cn.com/problems/repeated-substring-pattern/solution/zhong-fu-de-zi-zi-fu-chuan-by-leetcode-solution/)，s 由子串 sub 重复组成等价于 s 是 s[1:]+s[:-1] 的子串。


## 解答

```python
class Solution:
    def repeatedSubstringPattern(self, s: str) -> bool:
        return s in (s+s)[1:-1]
```
42 ms

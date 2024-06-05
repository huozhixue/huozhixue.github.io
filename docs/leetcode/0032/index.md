# 0032：最长有效括号（★★）


> <u>**[力扣第 32 题](https://leetcode.cn/problems/longest-valid-parentheses/)**</u>

## 题目

<p>给你一个只包含 <code>'('</code> 和 <code>')'</code> 的字符串，找出最长有效（格式正确且连续）括号<span data-keyword="substring">子串</span>的长度。</p>



<div class="original__bRMd">
<div>
<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "(()"
<strong>输出：</strong>2
<strong>解释：</strong>最长有效括号子串是 "()"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = ")()())"
<strong>输出：</strong>4
<strong>解释：</strong>最长有效括号子串是 "()()"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = ""
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>s[i]</code> 为 <code>'('</code> 或 <code>')'</code></li>
</ul>
</div>
</div>


## 分析 


类似 {{< lc "1249" >}} ，可以先模拟匹配得到有效括号的位置，找出最长连续段即可。

## 解答

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        A = [0]*len(s)
        sk = []
        for i,c in enumerate(s):
            if c=='(':
                sk.append(i)
            elif sk:
                A[i] = A[sk.pop()] = 1
        return max([len(list(g)) for c,g in groupby(A) if c==1], default=0)
```
30 ms

### *附加

还可以用 dp 解决：
- 令 dp[i] 代表下标 i 结尾的最长有效长度，
	- 假如 i 是右括号，对应的左括号下标为 j，dp[i]=j-i+1+dp[j-1]
	- 其它情况下，dp[i]=0



```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        dp = [0]*len(s)
        sk = []
        for i,c in enumerate(s):
            if c=='(':
                sk.append(i)
            elif sk:
                j = sk.pop()
                dp[i] = i-j+1+(dp[j-1] if j else 0)
        return max(dp,default=0)
```
48 ms

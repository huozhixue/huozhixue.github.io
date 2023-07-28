# 0032：最长有效括号（★★）


> <u>**[力扣第 32 题](https://leetcode.cn/problems/longest-valid-parentheses/)**</u>

## 题目

<p>给你一个只包含 <code>'('</code> 和 <code>')'</code> 的字符串，找出最长有效（格式正确且连续）括号子串的长度。</p>



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
<li><code>0 <= s.length <= 3 * 10<sup>4</sup></code></li>
<li><code>s[i]</code> 为 <code>'('</code> 或 <code>')'</code></li>
</ul>
</div>
</div>


## 分析 

### #1 栈

基于 {{< lc "1249" >}} ，可以得到不属于有效子串的括号的位置，找出最大的间隔即可。

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        sk, A = [], []
        for i, c in enumerate(s):
            if c == '(':
                sk.append(i)
            elif sk:
                sk.pop()
            else:
                A.append(i)
        A = [-1] + A + sk + [len(s)]
        return max(b-a-1 for a,b in pairwise(A))
```
时间 O(N)，48 ms

### #2 栈+dp

也可以用动态规划解决：
- 令 dp[r] 代表右括号 r 结尾的最长有效子串长度，并假设 r 所对应的是左括号 l
- 如果 l-1 是左括号， dp[r] = r-l+1
- 如果 l-1 是右括号， dp[r] = r-l+1+dp[l-1]
- max(dp) 即为所求。

## 解答

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        sk, d = [], {}
        res = 0
        for j,c in enumerate(s):
            if c=='(':
                sk.append(j)
            elif sk:
                i = sk.pop()
                d[j] = d.get(i-1,i)
                res = max(res,j-d[j]+1)
        return res
```
时间 O(N)，48 ms

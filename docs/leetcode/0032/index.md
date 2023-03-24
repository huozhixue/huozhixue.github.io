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

### #1

基于 {{< lc "1249" >}} ，可以得到不属于有效子串的括号的位置，找出最大的间隔即可。

```python
def longestValidParentheses(self, s: str) -> int:
    stack, invalid = [], []
    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        elif stack:
            stack.pop()
        else:
            invalid.append(i)
    invalid = [-1] + invalid + stack + [len(s)]
    return max(invalid[i + 1] - invalid[i] - 1 for i in range(len(invalid) - 1))
```
时间 O(N)，32 ms

### #2

也可以用动态规划解决：
- 令 dp[r] 代表右括号 r 结尾的最长有效子串长度，并假设 r 所对应的是左括号 l
- 如果 l-1 是左括号， dp[r] = r-l+1
- 如果 l-1 是右括号， dp[r] = r-l+1+dp[l-1]
- max(dp) 即为所求。

## 解答

```python
def longestValidParentheses(self, s: str) -> int:
    stack, dp = [], {}
    for j, char in enumerate(s):
        if char == '(':
            stack.append(j)
        elif stack:
            i = stack.pop()
            dp[j] = j - i + 1 + dp.get(i-1, 0)
    return max(dp.values(), default=0)
```
时间 O(N)，28 ms

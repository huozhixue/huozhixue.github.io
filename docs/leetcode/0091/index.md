# 0091：解码方法（★）


> <u>**[力扣第 91 题](https://leetcode.cn/problems/decode-ways/)**</u>

## 题目

<p>一条包含字母 <code>A-Z</code> 的消息通过以下映射进行了 <strong>编码</strong> ：</p>

<pre>
'A' -&gt; "1"
'B' -&gt; "2"
...
'Z' -&gt; "26"</pre>

<p>要 <strong>解码</strong> 已编码的消息，所有数字必须基于上述映射的方法，反向映射回字母（可能有多种方法）。例如，<code>"11106"</code> 可以映射为：</p>

<ul>
<li><code>"AAJF"</code> ，将消息分组为 <code>(1 1 10 6)</code></li>
<li><code>"KJF"</code> ，将消息分组为 <code>(11 10 6)</code></li>
</ul>

<p>注意，消息不能分组为  <code>(1 11 06)</code> ，因为 <code>"06"</code> 不能映射为 <code>"F"</code> ，这是由于 <code>"6"</code> 和 <code>"06"</code> 在映射中并不等价。</p>

<p>给你一个只含数字的 <strong>非空 </strong>字符串 <code>s</code> ，请计算并返回 <strong>解码</strong> 方法的 <strong>总数</strong> 。</p>

<p>题目数据保证答案肯定是一个 <strong>32 位</strong> 的整数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "12"
<strong>输出：</strong>2
<strong>解释：</strong>它可以解码为 "AB"（1 2）或者 "L"（12）。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "226"
<strong>输出：</strong>3
<strong>解释：</strong>它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "06"
<strong>输出：</strong>0
<strong>解释：</strong>"06" 无法映射到 "F" ，因为存在前导零（"6" 和 "06" 并不等价）。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 100</code></li>
<li><code>s</code> 只包含数字，并且可能包含前导零。</li>
</ul>


## 分析

### #1

典型的线性 dp 问题，令 dp[i] 代表 s[:i] 的解码总数，按 s[i-1] 和 s[i-2:i] 是否有效即可递推。

```python
def numDecodings(self, s: str) -> int:
    n = len(s)
    dp = [1]+[0]*n
    for i in range(1, n+1):
        if s[i-1]!='0':
            dp[i] += dp[i-1]
        if i>=2 and 10<=int(s[i-2:i])<=26:
            dp[i] += dp[i-2]
    return dp[-1]
```
40 ms

### #2 

递推过程只和前两个状态有关，可以优化为两个变量。

## 解答

```python
def numDecodings(self, s: str) -> int:
    a, b = 0, 1
    for i in range(len(s)):
        a, b = b, b*(s[i]!='0')+a*(i and 10<=int(s[i-1:i+1])<=26)
    return b
```
40 ms



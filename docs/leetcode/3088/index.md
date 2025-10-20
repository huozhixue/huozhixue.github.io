# 3088：使字符串反回文（★★）


> <u>**[力扣第 3088 题](https://leetcode.cn/problems/make-string-anti-palindrome/)**</u>

## 题目

<p>我们称一个长度为偶数的字符串 <code>s</code> 为 <strong>反回文</strong> 的，如果对于每一个下标 <code>0 &lt;= i &lt; n</code> ，<code>s[i] != s[n - i - 1]</code>。</p>

<p>给定一个字符串 <code>s</code>，你需要进行 <strong>任意</strong> 次（包括 0）操作使 <code>s</code> 成为 <strong>反回文。</strong></p>

<p>在一次操作中，你可以选择 <code>s</code> 中的两个字符并且交换它们。</p>

<p>返回结果字符串。如果有多个字符串符合条件，返回 <span data-keyword="lexicographically-smaller-string">字典序最小</span> 的那个。如果它不能成为一个反回文，返回 <code>"-1"</code>。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "abca"</span></p>

<p><strong>输出：</strong><span class="example-io">"aabc"</span></p>

<p><strong>解释：</strong></p>

<p><code>"aabc"</code> 是一个反回文字符串，因为 <code>s[0] != s[3]</code> 并且 <code>s[1] != s[2]</code>。同时，它也是 <code>"abca"</code> 的一个重排。</p>
</div>

<p><strong class="example">示例 2:</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "abba"</span></p>

<p><b>输出：</b><span class="example-io">"aabb"</span></p>

<p><b>解释：</b></p>

<p><code>"aabb"</code> 是一个反回文字符串，因为 <code>s[0] != s[3]</code> 并且 <code>s[1] != s[2]</code>。同时，它也是 <code>"abba"</code> 的一个重排。</p>
</div>

<p><strong class="example">示例 3:</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">s = "cccd"</span></p>

<p><strong>输出：</strong><span class="example-io">"-1"</span></p>

<p><strong>解释：</strong></p>

<p>你可以发现无论你如何重排 <code>"cccd"</code> 的字符，都有 <code>s[0] == s[3]</code> 或 <code>s[1] == s[2]</code>。所以它不能形成一个反回文字符串。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s.length % 2 == 0</code></li>
<li><code>s</code> 只包含小写英文字母。</li>
</ul>




## 分析

- 假如有个字符次数>n//2，显然无解
- 否则显然有解，考虑贪心构造
	- 先排序得到最小的序列
	- 从中间 [n//2-1,n//2] 开始枚举，假如相等，向右找到第一个不等于 nums[n//2] 的下标，交换即可

## 解答


```python
class Solution:
    def makeAntiPalindrome(self, s: str) -> str:
        n = len(s)
        ct = Counter(s)
        if max(ct.values())>n//2:
            return "-1"
        A = list(s)
        A.sort()
        i = j = n//2
        if A[i-1]!=A[i]:
            return ''.join(A) 
        while A[j]==A[i]:
            j += 1
        while A[i]==A[n-1-i]:
            A[i],A[j] = A[j],A[i]
            i += 1
            j += 1
        return ''.join(A)
```
443 ms

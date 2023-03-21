# 0316：去除重复字母（★）


> <u>**[力扣第 316 题](https://leetcode.cn/problems/remove-duplicate-letters/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 <strong>返回结果的字典序最小</strong>（要求不能打乱其他字符的相对位置）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong><code>s = "bcabc"</code>
<strong>输出<code>：</code></strong><code>"abc"</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong><code>s = "cbacdcbc"</code>
<strong>输出：</strong><code>"acdb"</code></pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>



<p><strong>注意：</strong>该题与 1081 <a href="https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters">https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters</a> 相同</p>


## 分析

{{< lc "0402" >}} 的进阶版。如果没有每个字母出现一次的限制，保持字符串升序即可。

为了保证每个字母出现一次:
- 若某个字母已经在栈中，应该跳过它
- 若某个字母后面不再出现，就不能去掉它

	
## 解答

```python
def removeDuplicateLetters(self, s: str) -> str:
    stack, vis, ct = [], set(), Counter(s)
    for c in s:
        ct[c] -= 1
        if c not in vis:
            while stack and stack[-1]>c and ct[stack[-1]]:
                vis.remove(stack.pop())
            stack.append(c)
            vis.add(c)
    return ''.join(stack)
```
32 ms

# 1316：不同的循环子字符串（1836 分）


> <u>**[力扣第 17 场双周赛第 4 题](https://leetcode.cn/problems/distinct-echo-substrings/)**</u>

## 题目

<p>给你一个字符串 <code>text</code> ，请你返回满足下述条件的 <strong>不同</strong> 非空子字符串的数目：</p>

<ul>
<li>可以写成某个字符串与其自身相连接的形式（即，可以写为 <code>a + a</code>，其中 <code>a</code> 是某个字符串）。</li>
</ul>

<p>例如，<code>abcabc</code> 就是 <code>abc</code> 和它自身连接形成的。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>text = &quot;abcabcabc&quot;
<strong>输出：</strong>3
<strong>解释：</strong>3 个子字符串分别为 &quot;abcabc&quot;，&quot;bcabca&quot; 和 &quot;cabcab&quot; 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>text = &quot;leetcodeleetcode&quot;
<strong>输出：</strong>2
<strong>解释：</strong>2 个子字符串为 &quot;ee&quot; 和 &quot;leetcodeleetcode&quot; 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= text.length &lt;= 2000</code></li>
<li><code>text</code> 只包含小写英文字母。</li>
</ul>


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



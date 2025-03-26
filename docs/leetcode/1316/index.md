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


**相似问题：**
- [2156：查找给定哈希值的子串（2062 分）](/leetcode/2156)


## 分析

- 遍历子串，判断是否符合，并用哈希表去重即可
- 判断符合可以用 lcp 

## 解答

```python
class Solution:
    def distinctEchoSubstrings(self, text: str) -> int:
        n = len(text)
        f = [[0]*(n+1) for _ in range(n)]
        res = set()
        for i in range(n-2,-1,-1):
            for j in range(i+1,n):
                f[i][j] = 0 if text[i]!=text[j] else 1+f[i+1][j+1] 
                if f[i][j]>=j-i:
                    res.add(text[i:j])
        return len(res)
```
1295 ms



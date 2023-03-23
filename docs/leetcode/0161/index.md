# 0161：相隔为 1 的编辑距离（★）


> <u>**[力扣第 161 题](https://leetcode.cn/problems/one-edit-distance/)**</u>

## 题目

<p>给定两个字符串 <code>s</code> 和 <code>t</code> ，如果它们的编辑距离为 <code>1</code> ，则返回 <code>true</code> ，否则返回 <code>false</code> 。</p>

<p>字符串 <code>s</code> 和字符串 <code>t</code> 之间满足编辑距离等于 1 有三种可能的情形：</p>

<ul>
<li>往 <code>s</code> 中插入 <strong>恰好一个</strong> 字符得到 <code>t</code></li>
<li>从 <code>s</code> 中删除 <strong>恰好一个</strong> 字符得到 <code>t</code></li>
<li>在 <code>s</code> 中用 <strong>一个不同的字符</strong> 替换 <strong>恰好一个</strong> 字符得到 <code>t</code></li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入: </strong><strong><em>s</em></strong> = "ab", <strong><em>t</em></strong> = "acb"
<strong>输出: </strong>true
<strong>解释: </strong>可以将 'c' 插入字符串 <strong><em>s</em></strong> 来得到 <em><strong>t</strong></em>。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong><strong><em>s</em></strong> = "cab", <strong><em>t</em></strong> = "ad"
<strong>输出: </strong>false
<strong>解释: </strong>无法通过 1 步操作使 <em><strong>s</strong></em> 变为 <em><strong>t</strong></em>。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>0 &lt;= s.length, t.length &lt;= 10<sup>4</sup></code></li>
<li><code>s</code> 和 <code>t</code> 由小写字母，大写字母和数字组成</li>
</ul>


## 分析

分类讨论，设 s/t 长度分别为 m/n：
- 若 m==n，则有且仅有一个位置上不同
- 若 m==n+1，则 s 删掉一个后相同
- 若 m==n-1，则 t 删掉一个后相同
- 其它情况不可能


## 解答

```python
def isOneEditDistance(self, s: str, t: str) -> bool:
    m, n = len(s), len(t)
    if m==n:
        return sum(a!=b for a,b in zip(s,t))==1
    if m==n+1:
        return any(s[:i]+s[i+1:]==t for i in range(m))
    if m==n-1:
        return any(t[:i]+t[i+1:]==s for i in range(n))
    return False
```
36 ms



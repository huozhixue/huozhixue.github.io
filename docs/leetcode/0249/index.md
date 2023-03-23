# 0249：移位字符串分组（★）


> <u>**[力扣第 249 题](https://leetcode.cn/problems/group-shifted-strings/)**</u>

## 题目

<p>给定一个字符串，对该字符串可以进行 &ldquo;移位&rdquo; 的操作，也就是将字符串中每个字母都变为其在字母表中后续的字母，比如：<code>&quot;abc&quot; -&gt; &quot;bcd&quot;</code>。这样，我们可以持续进行 &ldquo;移位&rdquo; 操作，从而生成如下移位序列：</p>

<pre>&quot;abc&quot; -&gt; &quot;bcd&quot; -&gt; ... -&gt; &quot;xyz&quot;</pre>

<p>给定一个包含仅小写字母字符串的列表，将该列表中所有满足 &ldquo;移位&rdquo; 操作规律的组合进行分组并返回。</p>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong><code>[&quot;abc&quot;, &quot;bcd&quot;, &quot;acef&quot;, &quot;xyz&quot;, &quot;az&quot;, &quot;ba&quot;, &quot;a&quot;, &quot;z&quot;]</code>
<strong>输出：</strong>
[
[&quot;abc&quot;,&quot;bcd&quot;,&quot;xyz&quot;],
[&quot;az&quot;,&quot;ba&quot;],
[&quot;acef&quot;],
[&quot;a&quot;,&quot;z&quot;]
]
<strong>解释：</strong>可以认为字母表首尾相接，所以 &#39;z&#39; 的后续为 &#39;a&#39;，所以 [&quot;az&quot;,&quot;ba&quot;] 也满足 &ldquo;移位&rdquo; 操作规律。</pre>


## 分析

典型的哈希表，按特征分组。

这里共同的特征是相邻字母的偏移量相同，因此转为字符串作为键值即可。

## 解答

```python
def groupStrings(self, strings: List[str]) -> List[List[str]]:
    d = defaultdict(list)
    for w in strings:
        key = ''.join(chr((ord(b)-ord(a))%26) for a,b in pairwise(w))
        d[key].append(w)
    return list(d.values())
```
40 ms

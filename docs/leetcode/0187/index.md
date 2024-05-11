# 0187：重复的DNA序列（★）


> <u>**[力扣第 187 题](https://leetcode.cn/problems/repeated-dna-sequences/)**</u>

## 题目

<p><strong>DNA序列</strong> 由一系列核苷酸组成，缩写为<meta charset="UTF-8" /> <code>'A'</code>, <code>'C'</code>, <code>'G'</code> 和<meta charset="UTF-8" /> <code>'T'</code>.。</p>

<ul>
<li>例如，<meta charset="UTF-8" /><code>"ACGAATTCCG"</code> 是一个 <strong>DNA序列</strong> 。</li>
</ul>

<p>在研究 <strong>DNA</strong> 时，识别 DNA 中的重复序列非常有用。</p>

<p>给定一个表示 <strong>DNA序列</strong> 的字符串 <code>s</code> ，返回所有在 DNA 分子中出现不止一次的 <strong>长度为 <code>10</code></strong> 的序列(子字符串)。你可以按 <strong>任意顺序</strong> 返回答案。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
<strong>输出：</strong>["AAAAACCCCC","CCCCCAAAAA"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "AAAAAAAAAAAAA"
<strong>输出：</strong>["AAAAAAAAAA"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s[i]</code><code>==</code><code>'A'</code>、<code>'C'</code>、<code>'G'</code> or <code>'T'</code></li>
</ul>


## 分析

### #1

最简单的就是哈希表。	

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        ct = Counter(s[i:i+10] for i in range(len(s)-9))
        return [k for k,v in ct.items() if v>1]
```
51 ms

### #2

当子串长度较大时，朴素哈希比较耗时，可以用滚动哈希。

## 解答

```python
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        d = dict(zip('ACGT',range(4)))
        A = [d[c] for c in s]
        base,L = 4,10
        bL = base**L
        d = defaultdict(int)
        res,w = [],0
        for j,a in enumerate(A):
            w = w*base+a
            if j>=L:
                w -= A[j-L]*bL
            if j>=L-1:
                if d[w]==1:
                    res.append(s[j-L+1:j+1])
                d[w] += 1
        return res
```
72 ms



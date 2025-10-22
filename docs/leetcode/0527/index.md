# 0527：单词缩写（★★）


> <u>**[力扣第 527 题](https://leetcode.cn/problems/word-abbreviation/)**</u>

## 题目

<p>给你一个字符串数组 <code>words</code> ，该数组由 <strong>互不相同</strong> 的若干字符串组成，请你找出并返回每个单词的 <strong>最小缩写</strong> 。</p>

<p>生成缩写的规则如下<strong>：</strong></p>

<ol>
<li>初始缩写由起始字母+省略字母的数量+结尾字母组成。</li>
<li>若存在冲突，亦即多于一个单词有同样的缩写，则使用更长的前缀代替首字母，直到从单词到缩写的映射唯一。换而言之，最终的缩写必须只能映射到一个单词。</li>
<li>若缩写并不比原单词更短，则保留原样。</li>
</ol>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> words = ["like", "god", "internal", "me", "internet", "interval", "intension", "face", "intrusion"]
<strong>输出:</strong> ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["aa","aaa"]
<strong>输出：</strong>["aa","aaa"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 400</code></li>
<li><code>2 &lt;= words[i].length &lt;= 400</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
<li><code>words</code> 中的所有字符串 <strong>互不相同</strong></li>
</ul>


## 分析

### #1 哈希

最简单的就是统计每种缩写的个数，然后遍历找唯一即可。

```python
class Solution:
    def wordsAbbreviation(self, words: List[str]) -> List[str]:
        d = defaultdict(int)
        for w in words:
            for i in range(len(w)-1):
                key = w[:i]+str(len(w)-i-1)+w[-1]
                d[key] += 1
        res = []
        for w in words:
            for i in range(1,len(w)-2):
                key = w[:i]+str(len(w)-i-1)+w[-1]
                if d[key]==1:
                    res.append(key)
                    break
            else:
                res.append(w)
        return res
```
512  ms

### #2 排序+lcp

一个字符串常用的性质是：相同前缀越长，两个单词的字典序越接近。

因此考虑先将单词按初始缩写分组，然后同一组的排序，与相邻单词比较即可。

## 解答

```python
class Solution:
    def wordsAbbreviation(self, words: List[str]) -> List[str]:
        def cal(w1,w2):
            for i, (a, b) in enumerate(zip(w1, w2)):
                if a != b:
                    return i

        d = defaultdict(list)
        for w in words:
            key = w[0]+str(len(w)-2)+w[-1] if len(w)>3 else w
            d[key].append(w)
        res = {}
        for A in d.values():
            A.sort()
            for i,w in enumerate(A):
                L = max([cal(w,A[j]) for j in [i-1,i+1] if 0<=j<len(A)],default=0)
                res[w] = w[:L+1]+str(len(w)-L-2)+w[-1] if len(w)>L+3 else w
        return [res[w] for w in words]
```
68 ms

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

## 解答

```python
    def wordsAbbreviation(self, words: List[str]) -> List[str]:
        def cal(w1, w2):
            for i, (a, b) in enumerate(zip(w1, w2)):
                if a != b:
                    return i
            return i+1
        
        def gen(word, x):
            n = len(word)
            return word[:x+1]+str(n-x-2)+word[-1] if x < n-3 else word

        
        d = defaultdict(list)
        for word in words:
            d[(word[0],word[-1], len(word))].append(word)
        lcp = defaultdict(int)
        for group in d.values():
            group.sort()
            for i in range(len(group)-1):
                w1, w2 =group[i], group[i+1]
                x = cal(w1, w2)
                lcp[w1] = max(lcp[w1], x)
                lcp[w2] = max(lcp[w2], x)
        return [gen(word, lcp[word]) for word in words]
```

52 ms

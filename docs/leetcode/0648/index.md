# 0648：单词替换（★）


> <u>**[力扣第 648 题](https://leetcode.cn/problems/replace-words/)**</u>

## 题目

<p>在英语中，我们有一个叫做 <strong>词根</strong>(root) 的概念，可以词根 <strong>后面 </strong>添加其他一些词组成另一个较长的单词——我们称这个词为 <strong>继承词</strong> (successor)。例如，词根 <code>help</code>，跟随着 <strong>继承</strong>词 <code>"ful"</code>，可以形成新的单词 <code>"helpful"</code>。</p>

<p>现在，给定一个由许多 <strong>词根 </strong>组成的词典 <code>dictionary</code> 和一个用空格分隔单词形成的句子 <code>sentence</code>。你需要将句子中的所有 <strong>继承词 </strong>用 <strong>词根 </strong>替换掉。如果 <strong>继承词 </strong>有许多可以形成它的 <strong>词根</strong>，则用 <strong>最短 </strong>的 <strong>词根</strong> 替换它。</p>

<p>你需要输出替换之后的句子。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
<strong>输出：</strong>"the cat was rat by the bat"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
<strong>输出：</strong>"a a b c"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= dictionary.length &lt;= 1000</code></li>
<li><code>1 &lt;= dictionary[i].length &lt;= 100</code></li>
<li><code>dictionary[i]</code> 仅由小写字母组成。</li>
<li><code>1 &lt;= sentence.length &lt;= 10<sup>6</sup></code></li>
<li><code>sentence</code> 仅由小写字母和空格组成。</li>
<li><code>sentence</code> 中单词的总量在范围 <code>[1, 1000]</code> 内。</li>
<li><code>sentence</code> 中每个单词的长度在范围 <code>[1, 1000]</code> 内。</li>
<li><code>sentence</code> 中单词之间由一个空格隔开。</li>
<li><code>sentence</code> 没有前导或尾随空格。</li>
</ul>




## 分析

容易想到用前缀树，先将词根插入，并在末尾用 '#' 标记。
再对句子的每个单词搜索最短词根，遍历前缀树找到第一个 '#' 标记即可。

## 解答

```python
def replaceWords(self, dictionary: List[str], sentence: str) -> str:
    def find(word):
        p = trie
        for i, char in enumerate(word):
            if char not in p:
                return word
            p = p[char]
            if '#' in p:
                return word[:i+1]
        return word

    T = lambda: defaultdict(T)
    trie = T()
    for prefix in dictionary:
        reduce(dict.__getitem__, prefix, trie)['#'] = {}
    return ' '.join(find(word) for word in sentence.split())
```

72 ms


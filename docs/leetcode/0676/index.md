# 0676：实现一个魔法字典（★）


> <u>**[力扣第 676 题](https://leetcode.cn/problems/implement-magic-dictionary/)**</u>

## 题目

<p>设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 <strong>互不相同</strong> 。 如果给出一个单词，请判定能否只将这个单词中<strong>一个</strong>字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。</p>

<p>实现 <code>MagicDictionary</code> 类：</p>

<ul>
<li><code>MagicDictionary()</code> 初始化对象</li>
<li><code>void buildDict(String[] dictionary)</code> 使用字符串数组 <code>dictionary</code> 设定该数据结构，<code>dictionary</code> 中的字符串互不相同</li>
<li><code>bool search(String searchWord)</code> 给定一个字符串 <code>searchWord</code> ，判定能否只将字符串中<strong> 一个 </strong>字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 <code>true</code> ；否则，返回 <code>false</code> 。</li>
</ul>



<div class="top-view__1vxA">
<div class="original__bRMd">
<div>
<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
<strong>输出</strong>
[null, null, false, true, false, false]

<strong>解释</strong>
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // 返回 False
magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
magicDictionary.search("hell"); // 返回 False
magicDictionary.search("leetcoded"); // 返回 False
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= dictionary.length <= 100</code></li>
<li><code>1 <= dictionary[i].length <= 100</code></li>
<li><code>dictionary[i]</code> 仅由小写英文字母组成</li>
<li><code>dictionary</code> 中的所有字符串 <strong>互不相同</strong></li>
<li><code>1 <= searchWord.length <= 100</code></li>
<li><code>searchWord</code> 仅由小写英文字母组成</li>
<li><code>buildDict</code> 仅在 <code>search</code> 之前调用一次</li>
<li>最多调用 <code>100</code> 次 <code>search</code></li>
</ul>
</div>
</div>
</div>


**相似问题：**
- [0208：实现 Trie (前缀树)](/leetcode/0208)
- [0720：词典中最长的单词](/leetcode/0720)


## 分析

### #1

可以直接模拟。

```python
class MagicDictionary:

    def __init__(self):
        self.A = []

    def buildDict(self, dictionary: List[str]) -> None:
        self.A = dictionary

    def search(self, searchWord: str) -> bool:
        for a in self.A:
            if len(a)==len(searchWord):
                if sum(x!=y for x,y in zip(a,searchWord))==1:
                    return True
        return False
```
141 ms
### #2

还可以用字典树优化查找。

## 解答

```python
class MagicDictionary:

    def __init__(self):
        T = lambda: defaultdict(T)
        self.trie = T()

    def buildDict(self, dictionary: List[str]) -> None:
        for w in dictionary:
            p = self.trie
            for c in w:
                p = p[c]
            p['#'] = ''

    def search(self, searchWord: str) -> bool:
        def dfs(i,p,k):
            if i==len(searchWord):
                return k==1 and '#' in p
            for c in p:
                k2 = k+(c!=searchWord[i])
                if k2<=1 and dfs(i+1,p[c],k2):
                    return True
            return False
        return dfs(0,self.trie,0)
```
158 ms

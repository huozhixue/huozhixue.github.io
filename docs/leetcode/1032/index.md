# 1032：字符流（1970 分）


> <u>**[力扣第 133 场周赛第 4 题](https://leetcode.cn/problems/stream-of-characters/)**</u>

## 题目

<p>设计一个算法：接收一个字符流，并检查这些字符的后缀是否是字符串数组 <code>words</code> 中的一个字符串。</p>

<p>例如，<code>words = ["abc", "xyz"]</code> 且字符流中逐个依次加入 4 个字符 <code>'a'</code>、<code>'x'</code>、<code>'y'</code> 和 <code>'z'</code> ，你所设计的算法应当可以检测到 <code>"axyz"</code> 的后缀 <code>"xyz"</code> 与 <code>words</code> 中的字符串 <code>"xyz"</code> 匹配。</p>

<p>按下述要求实现 <code>StreamChecker</code> 类：</p>

<ul>
<li><code>StreamChecker(String[] words)</code> ：构造函数，用字符串数组 <code>words</code> 初始化数据结构。</li>
<li><code>boolean query(char letter)</code>：从字符流中接收一个新字符，如果字符流中的任一非空后缀能匹配 <code>words</code> 中的某一字符串，返回 <code>true</code> ；否则，返回 <code>false</code>。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["StreamChecker", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query", "query"]
[[["cd", "f", "kl"]], ["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"], ["i"], ["j"], ["k"], ["l"]]
<strong>输出：</strong>
[null, false, false, false, true, false, true, false, false, false, false, false, true]

<strong>解释：</strong>
StreamChecker streamChecker = new StreamChecker(["cd", "f", "kl"]);
streamChecker.query("a"); // 返回 False
streamChecker.query("b"); // 返回 False
streamChecker.query("c"); // 返回n False
streamChecker.query("d"); // 返回 True ，因为 'cd' 在 words 中
streamChecker.query("e"); // 返回 False
streamChecker.query("f"); // 返回 True ，因为 'f' 在 words 中
streamChecker.query("g"); // 返回 False
streamChecker.query("h"); // 返回 False
streamChecker.query("i"); // 返回 False
streamChecker.query("j"); // 返回 False
streamChecker.query("k"); // 返回 False
streamChecker.query("l"); // 返回 True ，因为 'kl' 在 words 中
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 2000</code></li>
<li><code>1 &lt;= words[i].length &lt;= 200</code></li>
<li><code>words[i]</code> 由小写英文字母组成</li>
<li><code>letter</code> 是一个小写英文字母</li>
<li>最多调用查询 <code>4 * 10<sup>4</sup></code> 次</li>
</ul>




## 分析

### #1

- 由于单词长度最多 200，所以每次调用时可以直接遍历检查
- 可以将所有单词反向插入字典树，节省遍历检查的时间

```python
class StreamChecker:

    def __init__(self, words: List[str]):
        T = lambda: defaultdict(T)
        self.trie = T()
        for w in words:
            p = self.trie
            for c in w[::-1]:
                p = p[c]
            p['#'] = ''
        self.Q = deque()

    def query(self, letter: str) -> bool:
        p,Q = self.trie,self.Q
        Q.appendleft(letter)
        for c in Q:
            if c not in p:
                return False
            p = p[c]
            if '#' in p:
                return True
        return False
```
149 ms

### #2

- 更通用的方法是 AC 自动机，专门匹配输入流的最大后缀

## 解答


```python
class Node:
    __slots__ = 'son', 'fail', 'end'
    
    def __init__(self):
        self.son = [None]*26
        self.fail = None
        self.end = False

class AC:
    def __init__(self):
        self.root,dum = Node(),Node()
        dum.son = [self.root]*26
        self.root.fail = dum

    def add(self,s):
        p = self.root
        for c in s:
            c = ord(c)-ord('a')
            if not p.son[c]:
                p.son[c] = Node()
            p = p.son[c]
        p.end = True

    def build(self):
        Q = deque([self.root])
        while Q:
            u = Q.popleft()
            u.end |= u.fail.end
            for c in range(26):
                if u.son[c]:
                    u.son[c].fail = u.fail.son[c]
                    Q.append(u.son[c])
                else:
                    u.son[c] = u.fail.son[c]

class StreamChecker:

    def __init__(self, words: List[str]):
        ac = AC()
        for w in words:
            ac.add(w)
        ac.build()
        self.p = ac.root
        
    def query(self, letter: str) -> bool:
        self.p = self.p.son[ord(letter)-ord('a')]
        return self.p.end
```
134 ms

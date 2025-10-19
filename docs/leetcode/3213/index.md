# 3213：最小代价构造字符串（2170 分）


> <u>**[力扣第 405 场周赛第 4 题](https://leetcode.cn/problems/construct-string-with-minimum-cost/)**</u>

## 题目

<p>给你一个字符串 <code>target</code>、一个字符串数组 <code>words</code> 以及一个整数数组 <code>costs</code>，这两个数组长度相同。</p>

<p>设想一个空字符串 <code>s</code>。</p>

<p>你可以执行以下操作任意次数（包括 <strong>零 </strong>次）：</p>

<ul>
<li>选择一个在范围  <code>[0, words.length - 1]</code> 的索引 <code>i</code>。</li>
<li>将 <code>words[i]</code> 追加到 <code>s</code>。</li>
<li>该操作的成本是 <code>costs[i]</code>。</li>
</ul>

<p>返回使 <code>s</code> 等于 <code>target</code> 的 <strong>最小</strong> 成本。如果不可能，返回 <code>-1</code>。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">target = "abcdef", words = ["abdef","abc","d","def","ef"], costs = [100,1,1,10,5]</span></p>

<p><strong>输出：</strong> <span class="example-io">7</span></p>

<p><strong>解释：</strong></p>

<ul>
<li>选择索引 1 并以成本 1 将 <code>"abc"</code> 追加到 <code>s</code>，得到 <code>s = "abc"</code>。</li>
<li>选择索引 2 并以成本 1 将 <code>"d"</code> 追加到 <code>s</code>，得到 <code>s = "abcd"</code>。</li>
<li>选择索引 4 并以成本 5 将 <code>"ef"</code> 追加到 <code>s</code>，得到 <code>s = "abcdef"</code>。</li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong> <span class="example-io">target = "aaaa", words = ["z","zz","zzz"], costs = [1,10,100]</span></p>

<p><strong>输出：</strong> <span class="example-io">-1</span></p>

<p><strong>解释：</strong></p>

<p>无法使 <code>s</code> 等于 <code>target</code>，因此返回 -1。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= target.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= words.length == costs.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= words[i].length &lt;= target.length</code></li>
<li>所有 <code>words[i].length</code> 的总和小于或等于 <code>5 * 10<sup>4</sup></code></li>
<li><code>target</code> 和 <code>words[i]</code> 仅由小写英文字母组成。</li>
<li><code>1 &lt;= costs[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [3292：形成目标字符串需要的最少字符串数 II（2661 分）](/leetcode/3292)
- [3291：形成目标字符串需要的最少字符串数 I（2081 分）](/leetcode/3291)


## 分析

- 要用后缀匹配单词，是典型的 AC 自动机问题
## 解答


```python
class Node:
    __slots__ = 'son', 'fail', 'last', 'sz', 'w'

    def __init__(self):
        self.son = [None] * 26
        self.fail = None  # u 的 fail 指向 v，v 是树中 u 的最长后缀
        self.last = None  # u 的 last 指向 v，v 是树中 u 的最长后缀且是某个单词的结尾
        self.sz = 0       # 假如 u 是某个单词的结尾，sz 即是单词长度
        self.w = inf      # 假如 u 是某个单词的结尾，w 即是单词成本

class AC:
    def __init__(self):
        self.root = p = Node()
        dum = Node()              # 哑节点，方便后续 build
        dum.son, p.fail, p.last = [p]*26, dum, p

    def add(self,s,w):
        p = self.root
        for c in s: 
            c = ord(c) - ord('a')
            if not p.son[c]:
                p.son[c] = Node()
            p = p.son[c]
        p.sz = len(s)
        p.w = min(p.w,w)

    def build(self):
        Q = deque([self.root])
        while Q:
            u = Q.popleft()
            for c,son in enumerate(u.son):
                if son:
                    son.fail = u.fail.son[c]
                    son.last = son.fail if son.fail.sz else son.fail.last
                    Q.append(son)
                else: #  虚拟子节点，失配时直接跳到下一个匹配位置
                    u.son[c] = u.fail.son[c]

class Solution:
    def minimumCost(self, target: str, words: List[str], costs: List[int]) -> int:
        ac = AC()
        for s,w in zip(words,costs):
            ac.add(s,w)
        ac.build()
        n = len(target)
        f = [0]+[inf]*n
        p = root = ac.root
        for i in range(1,n+1):
            c = ord(target[i-1])-ord('a')
            p = p.son[c]
            if p.sz:  
                f[i] = min(f[i],f[i-p.sz]+p.w)
            u = p.last
            while u!=root:
                tmp = f[i-u.sz]+u.w
                if tmp<f[i]:
                    f[i] = tmp
                u = u.last
        return f[-1] if f[-1]<inf else -1
```
6650 ms

## *附加

- AC 自动机还可以用数组形式
- py 用 [n] * 26 的数组比 [26] * n 的数组快很多，所以要绕一些


```python
class AC:
    def __init__(self,n):                     # 总长度 n-1 的字符串
        self.son = [[0]*n for _ in range(26)]
        self.fail = [0]*n
        self.last = [0]*n
        self.sz = [0]*n
        self.w = [inf]*n
        self.i = 0

    def add(self,s,w):
        p = 0
        for c in s:
            c = ord(c)-ord('a')
            if not self.son[c][p]:
                self.son[c][p] = self.i = self.i+1
            p = self.son[c][p]
        self.sz[p] = len(s)
        self.w[p] = min(self.w[p],w)

    def build(self):
        Q = deque(A[0] for A in self.son if A[0])
        while Q:
            u = Q.popleft()
            for A in self.son:
                if A[u]:
                    v = self.fail[A[u]] = A[self.fail[u]]
                    self.last[A[u]] = v if self.sz[v] else self.last[v]
                    Q.append(A[u])
                else:    # 虚拟子节点，失配时直接跳到下一个匹配位置
                    A[u] = A[self.fail[u]]


class Solution:
    def minimumCost(self, target: str, words: List[str], costs: List[int]) -> int:
        ac = AC(sum(len(s) for s in words)+1)
        for s,w in zip(words,costs):
            ac.add(s,w)
        ac.build()
        n = len(target)
        f = [0]+[inf]*n
        p = 0
        for i in range(1,n+1):
            c = ord(target[i-1])-ord('a')
            p = ac.son[c][p]
            if ac.sz[p]:  
                f[i] = min(f[i],f[i-ac.sz[p]]+ac.w[p])
            u = ac.last[p]
            while u:
                tmp = f[i-ac.sz[u]]+ac.w[u]
                if tmp<f[i]:
                    f[i] = tmp
                u = ac.last[u]
        return f[-1] if f[-1]<inf else -1
```
5657 ms


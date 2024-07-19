# 2707：字符串中的额外字符（1735 分）


> <u>**[力扣第 105 场双周赛第 2 题](https://leetcode.cn/problems/extra-characters-in-a-string/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始的字符串 <code>s</code> 和一个单词字典 <code>dictionary</code> 。你需要将 <code>s</code> 分割成若干个 <strong>互不重叠</strong> 的子字符串，每个子字符串都在 <code>dictionary</code> 中出现过。<code>s</code> 中可能会有一些 <strong>额外的字符</strong> 不在任何子字符串中。</p>

<p>请你采取最优策略分割 <code>s</code> ，使剩下的字符 <strong>最少</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>s = "leetscode", dictionary = ["leet","code","leetcode"]
<b>输出：</b>1
<b>解释：</b>将 s 分成两个子字符串：下标从 0 到 3 的 "leet" 和下标从 5 到 8 的 "code" 。只有 1 个字符没有使用（下标为 4），所以我们返回 1 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>s = "sayhelloworld", dictionary = ["hello","world"]
<b>输出：</b>3
<b>解释：</b>将 s 分成两个子字符串：下标从 3 到 7 的 "hello" 和下标从 8 到 12 的 "world" 。下标为 0 ，1 和 2 的字符没有使用，所以我们返回 3 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 50</code></li>
<li><code>1 &lt;= dictionary.length &lt;= 50</code></li>
<li><code>1 &lt;= dictionary[i].length &lt;= 50</code></li>
<li><code>dictionary[i]</code> 和 <code>s</code> 只包含小写英文字母。</li>
<li><code>dictionary</code> 中的单词互不相同。</li>
</ul>


**相似问题：**
- [0139：单词拆分](/leetcode/0139)


## 分析

### #1

按选不选最后一个字符，递推即可。

```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        vis = set(dictionary)
        n = len(s)
        f = [0]*(n+1)
        for i in range(1,n+1):
            f[i]=1+f[i-1]
            for j in range(i):
                if s[j:i] in vis:
                    f[i]=min(f[i],f[j])
        return f[-1]
```
130 ms

### #2

可以用字典树优化查询过程。

## 解答


```python
class Solution:
    def minExtraChar(self, s: str, dictionary: List[str]) -> int:
        T = lambda: defaultdict(T)
        trie = T()
        for w in dictionary:
            p = trie
            for c in w[::-1]:
                p = p[c]
            p['#'] = ''
        n = len(s)
        f = [0]*(n+1)
        for i in range(1,n+1):
            f[i]=1+f[i-1]
            p = trie
            for j in range(i-1,-1,-1):
                if s[j] not in p:
                    break
                p = p[s[j]]
                if '#' in p:
                    f[i]=min(f[i],f[j])
        return f[-1]
```
106 ms

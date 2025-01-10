# 0691：贴纸拼词（★★）


> <u>**[力扣第 691 题](https://leetcode.cn/problems/stickers-to-spell-word/)**</u>

## 题目

<p>我们有 <code>n</code> 种不同的贴纸。每个贴纸上都有一个小写的英文单词。</p>

<p>您想要拼写出给定的字符串 <code>target</code> ，方法是从收集的贴纸中切割单个字母并重新排列它们。如果你愿意，你可以多次使用每个贴纸，每个贴纸的数量是无限的。</p>

<p>返回你需要拼出 <code>target</code> 的最小贴纸数量。如果任务不可能，则返回 <code>-1</code> 。</p>

<p><strong>注意：</strong>在所有的测试用例中，所有的单词都是从 <code>1000</code> 个最常见的美国英语单词中随机选择的，并且 <code>target</code> 被选择为两个随机单词的连接。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong> stickers = ["with","example","science"], target = "thehat"
<b>输出：</b>3
<strong>解释：
</strong>我们可以使用 2 个 "with" 贴纸，和 1 个 "example" 贴纸。
把贴纸上的字母剪下来并重新排列后，就可以形成目标 “thehat“ 了。
此外，这是形成目标字符串所需的最小贴纸数量。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>stickers = ["notice","possible"], target = "basicbasic"
<b>输出：</b>-1
<strong>解释：</strong>我们不能通过剪切给定贴纸的字母来形成目标“basicbasic”。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == stickers.length</code></li>
<li><code>1 &lt;= n &lt;= 50</code></li>
<li><code>1 &lt;= stickers[i].length &lt;= 10</code></li>
<li><code>1 &lt;= target.length &lt;= 15</code></li>
<li><code>stickers[i]</code> 和 <code>target</code> 由小写英文单词组成</li>
</ul>


**相似问题：**
- [0383：赎金信](/leetcode/0383)


## 分析

### #1

按 target[0] 选哪个贴纸即可递归，本质上是完全背包问题


```python
class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        @cache
        def dfs(t):
            if not t:
                return 0
            res = inf
            for ct in A:
                if t[0] in ct:
                    s = t
                    for k,v in ct.items():
                        s = s.replace(k,'',v)
                    res = min(res,1+dfs(s))
            return res
        A = [Counter(s) for s in stickers]
        res = dfs(''.join(sorted(target)))
        return res if res<inf else -1
```
76 ms


### #2

更通用的做法是存储字符数量的元组，递归过程类似，只是字符串删除变成元组相减。

## 解答

```python
class Solution:
    def minStickers(self, stickers: List[str], target: str) -> int:
        @cache
        def dfs(A):
            if sum(A)==0:
                return 0
            res = inf
            i = min(i for i,a in enumerate(A) if a>0)
            for B in S:
                if B[i]>0:
                    C = tuple(max(0,a-b) for a,b in zip(A,B))
                    res = min(res,1+dfs(C))
            return res
        ct0 = Counter(target)
        T = sorted(set(target))
        A = tuple(ct0[a] for a in T)
        S = []
        for s in stickers:
            ct = Counter(s)
            S.append([ct[a] for a in T])
        res = dfs(A)
        return res if res<inf else -1
```
189 ms

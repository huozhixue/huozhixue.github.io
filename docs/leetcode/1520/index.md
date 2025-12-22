# 1520：最多的不重叠子字符串（2362 分）


> <u>**[力扣第 198 场周赛第 3 题](https://leetcode.cn/problems/maximum-number-of-non-overlapping-substrings/)**</u>

## 题目

<p>给你一个只包含小写字母的字符串 <code>s</code> ，你需要找到 <code>s</code> 中最多数目的非空子字符串，满足如下条件：</p>

<ol>
<li>这些字符串之间互不重叠，也就是说对于任意两个子字符串 <code>s[i..j]</code> 和 <code>s[x..y]</code> ，要么 <code>j &lt; x</code> 要么 <code>i &gt; y</code> 。</li>
<li>如果一个子字符串包含字符 <code>char</code> ，那么 <code>s</code> 中所有 <code>char</code> 字符都应该在这个子字符串中。</li>
</ol>

<p>请你找到满足上述条件的最多子字符串数目。如果有多个解法有相同的子字符串数目，请返回这些子字符串总长度最小的一个解。可以证明最小总长度解是唯一的。</p>

<p>请注意，你可以以 <strong>任意</strong> 顺序返回最优解的子字符串。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "adefaddaccc"
<strong>输出：</strong>["e","f","ccc"]
<strong>解释：</strong>下面为所有满足第二个条件的子字符串：
[
"adefaddaccc"
"adefadda",
"ef",
"e",
"f",
"ccc",
]
如果我们选择第一个字符串，那么我们无法再选择其他任何字符串，所以答案为 1 。如果我们选择 "adefadda" ，剩下子字符串中我们只可以选择 "ccc" ，它是唯一不重叠的子字符串，所以答案为 2 。同时我们可以发现，选择 "ef" 不是最优的，因为它可以被拆分成 2 个子字符串。所以最优解是选择 ["e","f","ccc"] ，答案为 3 。不存在别的相同数目子字符串解。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abbaccd"
<strong>输出：</strong>["d","bb","cc"]
<strong>解释：</strong>注意到解 ["d","abba","cc"] 答案也为 3 ，但它不是最优解，因为它的总长度更长。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10^5</code></li>
<li><code>s</code> 只包含小写英文字母。</li>
</ul>


**相似问题：**
- [2472：不重叠回文子字符串的最大数目（2013 分）](/leetcode/2472)


## 分析

- 先得到每个字母的下标列表
- 根据不同字母的区间包含关系，可以建有向图
- 有向图中，从某个字母出发能访问的所有字母的区间的并即是一个有效的子串区间
- 从至多26个有效区间中选最多的不重叠个数，即是问题 {{< lc "0435" >}}

## 解答


```python []
class Solution:
    def maxNumOfSubstrings(self, s: str) -> List[str]:
        d = defaultdict(list)
        for i,c in enumerate(s):
            d[c].append(i)
        g = defaultdict(list)
        for u in d:
            l,r = d[u][0], d[u][-1]
            for v,A in d.items():
                if v!=u:
                    i = bisect_left(A,l)
                    if i<len(A) and A[i]<=r:
                        g[u].append(v)
        def bfs(c):
            l,r = inf,-inf
            dq = deque([c])
            vis = {c}
            while dq:
                u = dq.popleft()
                l = min(l,d[u][0])
                r = max(r,d[u][-1])
                for v in g[u]:
                    if v not in vis:
                        vis.add(v)
                        dq.append(v)
            return l,r

        ans = [bfs(u) for u in d]
        ans.sort(key=lambda x: x[1])
        res = []
        pre = -1
        for l, r in ans:
            if l>pre:
                res.append(s[l:r+1])
                pre = r
        return res
```
111 ms

# 0839：相似字符串组（2053 分）


> <u>**[力扣第 85 场周赛第 4 题](https://leetcode.cn/problems/similar-string-groups/)**</u>

## 题目

<p>如果交换字符串 <code>X</code> 中的两个不同位置的字母，使得它和字符串 <code>Y</code> 相等，那么称 <code>X</code> 和 <code>Y</code> 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。</p>

<p>例如，<code>"tars"</code> 和 <code>"rats"</code> 是相似的 (交换 <code>0</code> 与 <code>2</code> 的位置)； <code>"rats"</code> 和 <code>"arts"</code> 也是相似的，但是 <code>"star"</code> 不与 <code>"tars"</code>，<code>"rats"</code>，或 <code>"arts"</code> 相似。</p>

<p>总之，它们通过相似性形成了两个关联组：<code>{"tars", "rats", "arts"}</code> 和 <code>{"star"}</code>。注意，<code>"tars"</code> 和 <code>"arts"</code> 是在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。</p>

<p>给你一个字符串列表 <code>strs</code>。列表中的每个字符串都是 <code>strs</code> 中其它所有字符串的一个字母异位词。请问 <code>strs</code> 中有多少个相似字符串组？</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>strs = ["tars","rats","arts","star"]
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>strs = ["omv","ovm"]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= strs.length &lt;= 300</code></li>
<li><code>1 &lt;= strs[i].length &lt;= 300</code></li>
<li><code>strs[i]</code> 只包含小写字母。</li>
<li><code>strs</code> 中的所有单词都具有相同的长度，且是彼此的字母异位词。</li>
</ul>


**相似问题：**
- [2157：字符串分组（2499 分）](/leetcode/2157)


## 分析

典型的并查集应用。将相似的字符串连通，分到一组，最后统计有多少组即可。

## 解答

```python
class Solution:
    def numSimilarGroups(self, strs: List[str]) -> int:
        def find(x):
            if f[x]!=x:
                f[x] = find(f[x])
            return f[x]

        def union(x,y):
            f[find(x)] = find(y)

        def check(s1,s2):
            w = 0
            for x,y in zip(s1,s2):
                w += (x!=y)
                if w>2:
                    return False
            return True

        n = len(strs)
        f = list(range(n))
        for i in range(n):
            for j in range(i+1,n):
                if check(strs[i],strs[j]):
                    union(i,j)
        return sum(find(i)==i for i in range(n))
```
155 ms


# 0425：单词方块（★★）


> <u>**[力扣第 425 题](https://leetcode.cn/problems/word-squares/)**</u>

## 题目

<p>给定一个单词集合 <code>words</code> <strong>（没有重复）</strong>，找出并返回其中所有的 <a href="https://en.wikipedia.org/wiki/Word_square">单词方块</a><strong> </strong>。 <code>words</code> 中的同一个单词可以被 <strong>多次</strong> 使用。你可以按 <strong>任意顺序</strong> 返回答案。</p>

<p>一个单词序列形成了一个有效的 <strong>单词方块</strong> 的意思是指从第 <code>k</code> 行和第 <code>k</code> 列  <code>0 &lt;= k &lt; max(numRows, numColumns)</code> 来看都是相同的字符串。</p>

<ul>
<li>例如，单词序列 <code>["ball","area","lead","lady"]</code> 形成了一个单词方块，因为每个单词从水平方向看和从竖直方向看都是相同的。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>words = ["area","lead","wall","lady","ball"]
<strong>输出:</strong> [["ball","area","lead","lady"],
["wall","area","lead","lady"]]
<strong>解释：</strong>
输出包含两个单词方块，输出的顺序不重要，只需要保证每个单词方块内的单词顺序正确即可。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>words = ["abat","baba","atan","atal"]
<strong>输出：</strong>[["baba","abat","baba","atal"],
["baba","abat","baba","atan"]]
<strong>解释：</strong>
输出包含两个单词方块，输出的顺序不重要，只需要保证每个单词方块内的单词顺序正确即可。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= words.length &lt;= 1000</code></li>
<li><code>1 &lt;= words[i].length &lt;= 4</code></li>
<li><code>words[i]</code> 长度相同</li>
<li><code>words[i]</code> 只由小写英文字母组成</li>
<li><code>words[i]</code> 都 <strong>各不相同</strong></li>
</ul>


## 分析

假设某个有效的单词方块 A：
- 根据要求，第 i 个单词要满足 A[i][j]=A[j][i] ，对于 0<=j<=i-1
- 换句话说，根据前 i-1 个单词可以确定第 i 个单词的 i 位前缀
- 因此考虑提前将所有前缀存在哈希表中，即可加速回溯法的查找

## 解答

```python
class Solution:
    def wordSquares(self, words: List[str]) -> List[List[str]]:
        d = defaultdict(list)
        for w in words:
            for i in range(len(w)):
                d[w[:i]].append(w)
        res, path = [], []
        def dfs(i):
            if i==len(words[0]):
                res.append(path[:])
                return
            pre = ''.join(a[i] for a in path)
            for w in d[pre]:
                path.append(w)
                dfs(i+1)
                path.pop()
        dfs(0)
        return res
```

268 ms

# 1307：口算难题（2250 分）


> <u>**[力扣第 169 场周赛第 4 题](https://leetcode.cn/problems/verbal-arithmetic-puzzle/)**</u>

## 题目

<p>给你一个方程，左边用 <code>words</code> 表示，右边用 <code>result</code> 表示。</p>

<p>你需要根据以下规则检查方程是否可解：</p>

<ul>
<li>每个字符都会被解码成一位数字（0 - 9）。</li>
<li>每对不同的字符必须映射到不同的数字。</li>
<li>每个 <code>words[i]</code> 和 <code>result</code> 都会被解码成一个没有前导零的数字。</li>
<li>左侧数字之和（<code>words</code>）等于右侧数字（<code>result</code>）。 </li>
</ul>

<p>如果方程可解，返回 <code>True</code>，否则返回 <code>False</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>words = [&quot;SEND&quot;,&quot;MORE&quot;], result = &quot;MONEY&quot;
<strong>输出：</strong>true
<strong>解释：</strong>映射 &#39;S&#39;-&gt; 9, &#39;E&#39;-&gt;5, &#39;N&#39;-&gt;6, &#39;D&#39;-&gt;7, &#39;M&#39;-&gt;1, &#39;O&#39;-&gt;0, &#39;R&#39;-&gt;8, &#39;Y&#39;-&gt;&#39;2&#39;
所以 &quot;SEND&quot; + &quot;MORE&quot; = &quot;MONEY&quot; ,  9567 + 1085 = 10652</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>words = [&quot;SIX&quot;,&quot;SEVEN&quot;,&quot;SEVEN&quot;], result = &quot;TWENTY&quot;
<strong>输出：</strong>true
<strong>解释：</strong>映射 &#39;S&#39;-&gt; 6, &#39;I&#39;-&gt;5, &#39;X&#39;-&gt;0, &#39;E&#39;-&gt;8, &#39;V&#39;-&gt;7, &#39;N&#39;-&gt;2, &#39;T&#39;-&gt;1, &#39;W&#39;-&gt;&#39;3&#39;, &#39;Y&#39;-&gt;4
所以 &quot;SIX&quot; + &quot;SEVEN&quot; + &quot;SEVEN&quot; = &quot;TWENTY&quot; ,  650 + 68782 + 68782 = 138214</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>words = [&quot;THIS&quot;,&quot;IS&quot;,&quot;TOO&quot;], result = &quot;FUNNY&quot;
<strong>输出：</strong>true
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>words = [&quot;LEET&quot;,&quot;CODE&quot;], result = &quot;POINT&quot;
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= words.length &lt;= 5</code></li>
<li><code>1 &lt;= words[i].length, results.length &lt;= 7</code></li>
<li><code>words[i], result</code> 只含有大写英文字母</li>
<li>表达式中使用的不同字符数最大为 10</li>
</ul>




## 分析


### #1

回溯即可，可以从低到高试填

```python
class Solution:
    def isSolvable(self, words: List[str], result: str) -> bool:
        def dfs(i,c):
            if i==len(result):
                return c==0
            todo = sorted({w[i] for w in words+[result] if i<len(w) and w[i] not in d})
            cands = set(range(10))-set(d.values())
            for sub in permutations(cands,len(todo)):
                d.update(dict(zip(todo,sub)))
                if all(i!=len(w)-1 or len(w)==1 or d[w[i]]!=0 for w in words+[result]):
                    s = sum(d[w[i]] for w in words if i<len(w))
                    c2,s = divmod(s+c,10)
                    if s==d[result[i]] and dfs(i+1,c2):
                        return True
                [d.pop(c) for c in todo]
            return False

        if any(len(w)>len(result) for w in words):
            return False
        words = [w[::-1] for w in words]
        result = result[::-1]
        d = {}
        return dfs(0,0)
```
1199 ms

### #2

还可以从高到低考虑，思路详见 [力扣官解](https://leetcode.cn/problems/verbal-arithmetic-puzzle/solutions/101799/suan-nan-ti-by-leetcode-solution/)
- 权值合并后，先试填权重绝对值高的字母
- 对待定项，按权重正负分别赋值 9 和 0，即可估算出上下界

## 解答


```python
class Solution:
    def isSolvable(self, words: List[str], result: str) -> bool:
        d = defaultdict(int)
        for w in words:
            if len(w)>len(result):
                return False
            for i,c in enumerate(w[::-1]):
                d[c] += 10**i
        for i,c in enumerate(result[::-1]):
            d[c] -= 10**i
        bd = defaultdict(int)
        for w in words+[result]:
            if len(w)>1:
                bd[w[0]] = 1
        A = sorted(d.items(),key=lambda p:abs(p[1]))
        n = len(A)
        ma,mi = [0]*n,[0]*n
        for i,(c,w) in enumerate(A):
            ma[i] = ma[i-1]+w*(9 if w>0 else bd[c])
            mi[i] = mi[i-1]+w*(9 if w<0 else bd[c])
        vis = [0]*10
        
        def dfs(i,s):
            if i<0:
                return s==0
            if s+mi[i]<=0<=s+ma[i]:
                c,w = A[i]
                for j in range(bd[c],10):
                    if not vis[j]:
                        vis[j] = 1
                        if dfs(i-1,s+w*j):
                            return True
                        vis[j] = 0
            return False
        return dfs(len(A)-1,0)
```
5 ms

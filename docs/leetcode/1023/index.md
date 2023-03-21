# 1023：驼峰式匹配（★）


> <u>**[力扣第 131 场周赛第 3 题](https://leetcode.cn/problems/camelcase-matching/)**</u>

## 题目

<p>如果我们可以将<strong>小写字母</strong>插入模式串 <code>pattern</code> 得到待查询项 <code>query</code>，那么待查询项与给定模式串匹配。（我们可以在任何位置插入每个字符，也可以插入 0 个字符。）</p>

<p>给定待查询列表 <code>queries</code>，和模式串 <code>pattern</code>，返回由布尔值组成的答案列表 <code>answer</code>。只有在待查项 <code>queries[i]</code> 与模式串 <code>pattern</code> 匹配时， <code>answer[i]</code> 才为 <code>true</code>，否则为 <code>false</code>。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>queries = [&quot;FooBar&quot;,&quot;FooBarTest&quot;,&quot;FootBall&quot;,&quot;FrameBuffer&quot;,&quot;ForceFeedBack&quot;], pattern = &quot;FB&quot;
<strong>输出：</strong>[true,false,true,true,false]
<strong>示例：</strong>
&quot;FooBar&quot; 可以这样生成：&quot;F&quot; + &quot;oo&quot; + &quot;B&quot; + &quot;ar&quot;。
&quot;FootBall&quot; 可以这样生成：&quot;F&quot; + &quot;oot&quot; + &quot;B&quot; + &quot;all&quot;.
&quot;FrameBuffer&quot; 可以这样生成：&quot;F&quot; + &quot;rame&quot; + &quot;B&quot; + &quot;uffer&quot;.</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>queries = [&quot;FooBar&quot;,&quot;FooBarTest&quot;,&quot;FootBall&quot;,&quot;FrameBuffer&quot;,&quot;ForceFeedBack&quot;], pattern = &quot;FoBa&quot;
<strong>输出：</strong>[true,false,true,false,false]
<strong>解释：</strong>
&quot;FooBar&quot; 可以这样生成：&quot;Fo&quot; + &quot;o&quot; + &quot;Ba&quot; + &quot;r&quot;.
&quot;FootBall&quot; 可以这样生成：&quot;Fo&quot; + &quot;ot&quot; + &quot;Ba&quot; + &quot;ll&quot;.
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输出：</strong>queries = [&quot;FooBar&quot;,&quot;FooBarTest&quot;,&quot;FootBall&quot;,&quot;FrameBuffer&quot;,&quot;ForceFeedBack&quot;], pattern = &quot;FoBaT&quot;
<strong>输入：</strong>[false,true,false,false,false]
<strong>解释： </strong>
&quot;FooBarTest&quot; 可以这样生成：&quot;Fo&quot; + &quot;o&quot; + &quot;Ba&quot; + &quot;r&quot; + &quot;T&quot; + &quot;est&quot;.
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= queries.length &lt;= 100</code></li>
<li><code>1 &lt;= queries[i].length &lt;= 100</code></li>
<li><code>1 &lt;= pattern.length &lt;= 100</code></li>
<li>所有字符串都仅由大写和小写英文字母组成。</li>
</ol>


## 分析

### #1

当 pattern 是 query 的子序列且包含了 query 的所有大写字母时，即匹配。

可以直接用正则。

```python
def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:
    reg = '[a-z]*?'.join(['']+list(pattern)+[''])+'$'
    return [bool(re.match(reg, q)) for q in queries]
```
44 ms

### #2

也可以遍历判断。

## 解答

```python
def camelMatch(self, queries: List[str], pattern: str) -> List[bool]:
    def check(q):
        i = 0
        for char in q:
            if i<n and char == pattern[i]:
                i += 1
            elif char.isupper():
                return False
        return i==n
    
    n = len(pattern)
    return [check(q) for q in queries]
```
36 ms

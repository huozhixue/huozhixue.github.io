# 1023：驼峰式匹配（1537 分）


> <u>**[力扣第 131 场周赛第 3 题](https://leetcode.cn/problems/camelcase-matching/)**</u>

## 题目

<p>给你一个字符串数组 <code>queries</code>，和一个表示模式的字符串 <code>pattern</code>，请你返回一个布尔数组 <code>answer</code> 。只有在待查项 <code>queries[i]</code> 与模式串 <code>pattern</code> 匹配时， <code>answer[i]</code> 才为 <code>true</code>，否则为 <code>false</code>。</p>

<p>如果可以将<strong>小写字母</strong>插入模式串 <code>pattern</code> 得到待查询项 <code>queries[i]</code>，那么待查询项与给定模式串匹配。可以在任何位置插入每个字符，也可以不插入字符。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"
<strong>输出：</strong>[true,false,true,true,false]
<strong>示例：</strong>
"FooBar" 可以这样生成："F" + "oo" + "B" + "ar"。
"FootBall" 可以这样生成："F" + "oot" + "B" + "all".
"FrameBuffer" 可以这样生成："F" + "rame" + "B" + "uffer".</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"
<strong>输出：</strong>[true,false,true,false,false]
<strong>解释：</strong>
"FooBar" 可以这样生成："Fo" + "o" + "Ba" + "r".
"FootBall" 可以这样生成："Fo" + "ot" + "Ba" + "ll".
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBaT"
<strong>输出：</strong>[false,true,false,false,false]
<strong>解释： </strong>
"FooBarTest" 可以这样生成："Fo" + "o" + "Ba" + "r" + "T" + "est".
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= pattern.length, queries.length &lt;= 100</code></li>
<li><code>1 &lt;= queries[i].length &lt;= 100</code></li>
<li><code>queries[i]</code> 和 <code>pattern</code> 由英文字母组成</li>
</ul>




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

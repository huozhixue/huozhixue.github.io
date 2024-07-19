# 1541：平衡括号字符串的最少插入次数（1759 分）


> <u>**[力扣第 32 场双周赛第 3 题](https://leetcode.cn/problems/minimum-insertions-to-balance-a-parentheses-string/)**</u>

## 题目

<p>给你一个括号字符串 <code>s</code> ，它只包含字符 <code>&#39;(&#39;</code> 和 <code>&#39;)&#39;</code> 。一个括号字符串被称为平衡的当它满足：</p>

<ul>
<li>任何左括号 <code>&#39;(&#39;</code> 必须对应两个连续的右括号 <code>&#39;))&#39;</code> 。</li>
<li>左括号 <code>&#39;(&#39;</code> 必须在对应的连续两个右括号 <code>&#39;))&#39;</code> 之前。</li>
</ul>

<p>比方说 <code>&quot;())&quot;</code>， <code>&quot;())(())))&quot;</code> 和 <code>&quot;(())())))&quot;</code> 都是平衡的， <code>&quot;)()&quot;</code>， <code>&quot;()))&quot;</code> 和 <code>&quot;(()))&quot;</code> 都是不平衡的。</p>

<p>你可以在任意位置插入字符 &#39;(&#39; 和 &#39;)&#39; 使字符串平衡。</p>

<p>请你返回让 <code>s</code> 平衡的最少插入次数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;(()))&quot;
<strong>输出：</strong>1
<strong>解释：</strong>第二个左括号有与之匹配的两个右括号，但是第一个左括号只有一个右括号。我们需要在字符串结尾额外增加一个 &#39;)&#39; 使字符串变成平衡字符串 &quot;(())))&quot; 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;())&quot;
<strong>输出：</strong>0
<strong>解释：</strong>字符串已经平衡了。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;))())(&quot;
<strong>输出：</strong>3
<strong>解释：</strong>添加 &#39;(&#39; 去匹配最开头的 &#39;))&#39; ，然后添加 &#39;))&#39; 去匹配最后一个 &#39;(&#39; 。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>s = &quot;((((((&quot;
<strong>输出：</strong>12
<strong>解释：</strong>添加 12 个 &#39;)&#39; 得到平衡字符串。
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>s = &quot;)))))))&quot;
<strong>输出：</strong>5
<strong>解释：</strong>在字符串开头添加 4 个 &#39;(&#39; 并在结尾添加 1 个 &#39;)&#39; ，字符串变成平衡字符串 &quot;(((())))))))&quot; 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10^5</code></li>
<li><code>s</code> 只包含 <code>&#39;(&#39;</code> 和 <code>&#39;)&#39;</code> 。</li>
</ul>


**相似问题：**
- [1963：使字符串平衡的最小交换次数（1688 分）](/leetcode/1963)


## 分析

### #1

{{< lc "1249" >}} 的升级版，只不过需要考虑更多情况。

    顺序遍历遇到 ')' 时，假如 ')' 无效，前面必须执行一次添加 '(' 的操作。
    假如 ')' 后面不是 ')'，还需要执行一次添加 ')' 的操作。
    假如 ')' 后面是 ')'，需要跳过该 ')'
    最终剩下的无效 '('，每个必须执行两次添加 ')' 的操作。
    
```python
def minInsertions(self, s: str) -> int:
    res, stack, i = 0, [], 0
    while i < len(s):
        if s[i] == '(':
            stack.append('(')
        else:
            if not stack:
                res += 1
            else:
                stack.pop()
            if i < len(s)-1 and s[i+1] == ')':
                i += 1
            else:
                res += 1
        i += 1
    return res + 2*len(stack)
```
364 ms

### #2

注意到过程中其实只关心栈的长度。所以可以用一个变量来维护，而无需真正地进行栈操作。

## 解答

```python
def minInsertions(self, s: str) -> int:
    res, size, i = 0, 0, 0
    while i < len(s):
        size += 1 if s[i] == '(' else -1
        if size < 0:
            res, size = res + 1, 0
        if s[i] == ')':
            if i < len(s)-1 and s[i+1] == ')':
                i += 1
            else:
                res += 1
        i += 1
    return res + 2*size
```
216 ms



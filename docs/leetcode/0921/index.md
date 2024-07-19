# 0921：使括号有效的最少添加（1242 分）


> <u>**[力扣第 106 场周赛第 2 题](https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/)**</u>

## 题目

<p>只有满足下面几点之一，括号字符串才是有效的：</p>

<ul>
<li>它是一个空字符串，或者</li>
<li>它可以被写成 <code>AB</code> （<code>A</code> 与 <code>B</code> 连接）, 其中 <code>A</code> 和 <code>B</code> 都是有效字符串，或者</li>
<li>它可以被写作 <code>(A)</code>，其中 <code>A</code> 是有效字符串。</li>
</ul>

<p>给定一个括号字符串 <code>s</code> ，在每一次操作中，你都可以在字符串的任何位置插入一个括号</p>

<ul>
<li>例如，如果 <code>s = "()))"</code> ，你可以插入一个开始括号为 <code>"(()))"</code> 或结束括号为 <code>"())))"</code> 。</li>
</ul>

<p>返回 <em>为使结果字符串 <code>s</code> 有效而必须添加的最少括号数</em>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "())"
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "((("
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s</code> 只包含 <code>'('</code> 和 <code>')'</code> 字符。</li>
</ul>


**相似问题：**
- [1963：使字符串平衡的最小交换次数（1688 分）](/leetcode/1963)


## 分析

{{< lc "1249" >}} 的镜像版。顺序遍历遇到无效括号时，显然必须执行一次添加操作，最后才可能变为有效。

因此最少添加数就是 {{< lc "1249" >}}  中的最少删除数。

## 解答

```python
def minAddToMakeValid(self, s: str) -> int:
    ans, size = 0, 0
    for char in s:
        size += 1 if char == '(' else -1 if char == ')' else 0
        if size < 0:
            ans, size = ans+1, 0
    return ans + size
```
24 ms


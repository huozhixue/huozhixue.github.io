# 1096：花括号展开 II（2348 分）


> <u>**[力扣第 142 场周赛第 4 题](https://leetcode.cn/problems/brace-expansion-ii/)**</u>

## 题目

<p>如果你熟悉 Shell 编程，那么一定了解过花括号展开，它可以用来生成任意字符串。</p>

<p>花括号展开的表达式可以看作一个由 <strong>花括号</strong>、<strong>逗号</strong> 和 <strong>小写英文字母</strong> 组成的字符串，定义下面几条语法规则：</p>

<ul>
<li>如果只给出单一的元素 <code>x</code>，那么表达式表示的字符串就只有 <code>"x"</code>。<code>R(x) = {x}</code>

<ul>
<li>例如，表达式 <code>"a"</code> 表示字符串 <code>"a"</code>。</li>
<li>而表达式 <code>"w"</code> 就表示字符串 <code>"w"</code>。</li>
</ul>
</li>
<li>当两个或多个表达式并列，以逗号分隔，我们取这些表达式中元素的并集。<code>R({e_1,e_2,...}) = R(e_1) ∪ R(e_2) ∪ ...</code>
<ul>
<li>例如，表达式 <code>"{a,b,c}"</code> 表示字符串 <code>"a","b","c"</code>。</li>
<li>而表达式 <code>"{ {a,b},{b,c} }"</code> 也可以表示字符串 <code>"a","b","c"</code>。</li>
</ul>
</li>
<li>要是两个或多个表达式相接，中间没有隔开时，我们从这些表达式中各取一个元素依次连接形成字符串。<code>R(e_1 + e_2) = {a + b for (a, b) in R(e_1) × R(e_2)}</code>
<ul>
<li>例如，表达式 <code>"{a,b}{c,d}"</code> 表示字符串 <code>"ac","ad","bc","bd"</code>。</li>
</ul>
</li>
<li>表达式之间允许嵌套，单一元素与表达式的连接也是允许的。
<ul>
<li>例如，表达式 <code>"a{b,c,d}"</code> 表示字符串 <code>"ab","ac","ad"​​​​​​</code>。</li>
<li>例如，表达式 <code>"a{b,c}{d,e}f{g,h}"</code> 可以表示字符串 <code>"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"</code>。</li>
</ul>
</li>
</ul>

<p>给出表示基于给定语法规则的表达式 <code>expression</code>，返回它所表示的所有字符串组成的有序列表。</p>

<p>假如你希望以「集合」的概念了解此题，也可以通过点击 “<strong>显示英文描述</strong>” 获取详情。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>expression = "{a,b}{c,{d,e}}"
<strong>输出：</strong>["ac","ad","ae","bc","bd","be"]</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>expression = "{ {a,z},a{b,c},{ab,z} }"
<strong>输出：</strong>["a","ab","ac","z"]
<strong>解释：</strong>输出中 <strong>不应 </strong>出现重复的组合结果。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= expression.length &lt;= 60</code></li>
<li><code>expression[i]</code> 由 <code>'{'</code>，<code>'}'</code>，<code>','</code> 或小写英文字母组成</li>
<li>给出的表达式 <code>expression</code> 用以表示一组基于题目描述中语法构造的字符串</li>
</ul>


**相似问题：**
- [1087：花括号展开（1480 分）](/leetcode/1087)


## 分析

- 典型的用栈模拟递归问题
- 把单个元素和表达式都看作哈希表，那么
	- 逗号分隔的，取哈希表的并
	- 不分隔的，二重循环得到新的哈希表
	- 为了方便，'{' 和 ',' 后添加一个初始哈希表，只包含一个空字符串

## 解答


```python
class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        sk = [[{''}]]
        for c in expression:
            if c=='{':
                sk.append([{''}])
            elif c==',':
                sk[-1].append({''})
            elif c=='}':
                tmp = {a for A in sk.pop() for a in A}
                sk[-1][-1] = {a+b for a in sk[-1][-1] for b in tmp}
            else:
                sk[-1][-1] = {a+c for a in sk[-1][-1]}
        return sorted(sk[0][0])
```
3 ms

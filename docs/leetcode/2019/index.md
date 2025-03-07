# 2019：解出数学表达式的学生分数（2583 分）


> <u>**[力扣第 260 场周赛第 4 题](https://leetcode.cn/problems/the-score-of-students-solving-math-expression/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，它 <strong>只</strong> 包含数字 <code>0-9</code> ，加法运算符 <code>'+'</code> 和乘法运算符 <code>'*'</code> ，这个字符串表示一个 <strong>合法</strong> 的只含有 <strong>个位数</strong><strong>数字</strong> 的数学表达式（比方说 <code>3+5*2</code>）。有 <code>n</code> 位小学生将计算这个数学表达式，并遵循如下 <strong>运算顺序</strong> ：</p>

<ol>
<li>按照 <strong>从左到右</strong> 的顺序计算 <strong>乘法</strong> ，然后</li>
<li>按照 <strong>从左到右</strong> 的顺序计算 <strong>加法</strong> 。</li>
</ol>

<p>给你一个长度为 <code>n</code> 的整数数组 <code>answers</code> ，表示每位学生提交的答案。你的任务是给 <code>answer</code> 数组按照如下 <strong>规则</strong> 打分：</p>

<ul>
<li>如果一位学生的答案 <strong>等于</strong> 表达式的正确结果，这位学生将得到 <code>5</code> 分。</li>
<li>否则，如果答案由 <strong>一处或多处错误的运算顺序</strong> 计算得到，那么这位学生能得到 <code>2</code> 分。</li>
<li>否则，这位学生将得到 <code>0</code> 分。</li>
</ul>

<p>请你返回所有学生的分数和。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/09/17/student_solving_math.png" style="width: 678px; height: 109px;"></p>

<pre><b>输入：</b>s = "7+3*1*2", answers = [20,13,42]
<b>输出：</b>7
<b>解释：</b>如上图所示，正确答案为 13 ，因此有一位学生得分为 5 分：[20,<em><strong>13</strong></em>,42] 。
一位学生可能通过错误的运算顺序得到结果 20 ：7+3=10，10*1=10，10*2=20 。所以这位学生得分为 2 分：[<em><strong>20</strong></em>,13,42] 。
所有学生得分分别为：[2,5,0] 。所有得分之和为 2+5+0=7 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>s = "3+5*2", answers = [13,0,10,13,13,16,16]
<b>输出：</b>19
<b>解释：</b>表达式的正确结果为 13 ，所以有 3 位学生得到 5 分：[<em><strong>13</strong></em>,0,10,<em><strong>13</strong></em>,<em><strong>13</strong></em>,16,16] 。
学生可能通过错误的运算顺序得到结果 16 ：3+5=8，8*2=16 。所以两位学生得到 2 分：[13,0,10,13,13,<em><strong>16</strong></em>,<em><strong>16</strong></em>] 。
所有学生得分分别为：[5,0,0,5,5,2,2] 。所有得分之和为 5+0+0+5+5+2+2=19 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><b>输入：</b>s = "6+0*1", answers = [12,9,6,4,8,6]
<b>输出：</b>10
<b>解释：</b>表达式的正确结果为 6 。
如果一位学生通过错误的运算顺序计算该表达式，结果仍为 6 。
根据打分规则，运算顺序错误的学生也将得到 5 分（因为他们仍然得到了正确的结果），而不是 2 分。
所有学生得分分别为：[0,0,5,0,0,5] 。所有得分之和为 10 分。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= s.length &lt;= 31</code></li>
<li><code>s</code> 表示一个只包含 <code>0-9</code> ，<code>'+'</code> 和 <code>'*'</code> 的合法表达式。</li>
<li>表达式中所有整数运算数字都在闭区间 <code>[0, 9]</code> 以内。</li>
<li><code>1 &lt;=</code> 数学表达式中所有运算符数目（<code>'+'</code> 和 <code>'*'</code>） <code>&lt;= 15</code></li>
<li>测试数据保证正确表达式结果在范围 <code>[0, 1000]</code> 以内。</li>
<li><code>n == answers.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= answers[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0224：基本计算器](/leetcode/0224)
- [0241：为运算表达式设计优先级](/leetcode/0241)


## 分析

- 枚举最后运算的运算符位置 k，转为 [0,k-1] 和 [k+1,n-1] 的递归子问题
- 令 f(i,j) 代表 s[i:j+1] 能得到的所有结果，递归即可
- 注意题目保证正确结果和学生答案都<=1000，因此 f(i,j) 只保留<=1000 的值，保证不超时

## 解答


```python
class Solution:
    def scoreOfStudents(self, s: str, answers: List[int]) -> int:
        ans = eval(s)
        n = len(s)
        f = [[set() for _ in range(n)] for _ in range(n)]
        for i in range(n-1,-1,-2):
            f[i][i] = {int(s[i])}
            for j in range(i+2,n,2):
                for k in range(i+1,j,2):
                    for a,b in product(f[i][k-1],f[k+1][j]):
                        c = a+b if s[k]=='+' else a*b
                        if c<=1000:
                            f[i][j].add(c)
        return sum(5 if x==ans else 2 for x in answers if x in f[0][-1])
```
914 ms

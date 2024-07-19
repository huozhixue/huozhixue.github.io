# 0241：为运算表达式设计优先级（★）


> <u>**[力扣第 241 题](https://leetcode.cn/problems/different-ways-to-add-parentheses/)**</u>

## 题目

<p>给你一个由数字和运算符组成的字符串 <code>expression</code> ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 <strong>按任意顺序</strong> 返回答案。</p>

<p>生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 <code>10<sup>4</sup></code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>expression = "2-1-1"
<strong>输出：</strong>[0,2]
<strong>解释：</strong>
((2-1)-1) = 0
(2-(1-1)) = 2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>expression = "2*3-4*5"
<strong>输出：</strong>[-34,-14,-10,-10,10]
<strong>解释：</strong>
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= expression.length &lt;= 20</code></li>
<li><code>expression</code> 由数字和算符 <code>'+'</code>、<code>'-'</code> 和 <code>'*'</code> 组成。</li>
<li>输入表达式中的所有整数值在范围 <code>[0, 99]</code> </li>
</ul>


**相似问题：**
- [0095：不同的二叉搜索树 II](/leetcode/0095)
- [0224：基本计算器](/leetcode/0224)
- [0282：给表达式添加运算符](/leetcode/0282)
- [2019：解出数学表达式的学生分数（2583 分）](/leetcode/2019)
- [2232：向表达式添加括号后的最小结果（1611 分）](/leetcode/2232)


## 分析

按最后一步运算的运算符即可递归。

## 解答

```python
class Solution:
    def diffWaysToCompute(self, expression: str) -> List[int]:
        func = {'+':int.__add__,'-':int.__sub__,'*':int.__mul__}

        @cache
        def dfs(s):
            res = []
            for i,c in enumerate(s):
                if c in '+-*':
                    for x in dfs(s[:i]):
                        for y in dfs(s[i+1:]):
                            res.append(func[c](x,y))
            return res or [int(s)]
        return dfs(expression)
```
37 ms

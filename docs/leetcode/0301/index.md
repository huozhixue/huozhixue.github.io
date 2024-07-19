# 0301：删除无效的括号（★★）


> <u>**[力扣第 301 题](https://leetcode.cn/problems/remove-invalid-parentheses/)**</u>

## 题目

<p>给你一个由若干括号和字母组成的字符串 <code>s</code> ，删除最小数量的无效括号，使得输入的字符串有效。</p>

<p>返回所有可能的结果。答案可以按 <strong>任意顺序</strong> 返回。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "()())()"
<strong>输出：</strong>["(())()","()()()"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "(a)())()"
<strong>输出：</strong>["(a())()","(a)()()"]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = ")("
<strong>输出：</strong>[""]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= s.length <= 25</code></li>
<li><code>s</code> 由小写英文字母以及括号 <code>'('</code> 和 <code>')'</code> 组成</li>
<li><code>s</code> 中至多含 <code>20</code> 个括号</li>
</ul>


**相似问题：**
- [0020：有效的括号](/leetcode/0020)
- [1963：使字符串平衡的最小交换次数（1688 分）](/leetcode/1963)


## 分析

- 可以直接递归求删除 k 个括号的序列集合
- 假如其中有符合的序列，k 即是最小，返回所有符合的序列即可



## 解答

```python
class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        def check(s):
            A = [1 if c=='(' else -1 for c in s if c in '()']
            P = list(accumulate([0]+A))
            return min(P)==P[-1]==0
        Q = [s]
        while True:
            res = [s for s in Q if check(s)]
            if res:
                return res
            Q = {s[:i]+s[i+1:] for s in Q for i,c in enumerate(s) if c in '()'}
        return res
```
154 ms


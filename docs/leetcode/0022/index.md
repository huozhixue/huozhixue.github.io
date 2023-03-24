# 0022：括号生成（★）


> <u>**[力扣第 22 题](https://leetcode.cn/problems/generate-parentheses/)**</u>

## 题目

<p>数字 <code>n</code> 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 <strong>有效的 </strong>括号组合。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>["((()))","(()())","(())()","()(())","()()()"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>["()"]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 8</code></li>
</ul>


## 分析

典型的回溯问题，每一步添加 '(' 或 ')'，若无效则回到上一步。

## 解答

```python
def generateParenthesis(self, n: int) -> List[str]:
    def dfs(l, r, tmp):
        if l > n or r > l:
            return
        if r == n:
            res.append(tmp)
            return
        dfs(l + 1, r, tmp + '(')
        dfs(l, r + 1, tmp + ')')

    res = []
    dfs(0, 0, '')
    return res
```
时间 O(N)，36 ms

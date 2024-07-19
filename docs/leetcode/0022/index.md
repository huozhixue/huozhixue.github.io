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


**相似问题：**
- [0017：电话号码的字母组合](/leetcode/0017)
- [0020：有效的括号](/leetcode/0020)
- [2116：判断一个括号字符串是否有效（2037 分）](/leetcode/2116)


## 分析

典型的回溯问题，每一步添加 '(' 或 ')'，若无效则回到上一步。

## 解答

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        def dfs(l,r,s):
            if r>l or l>n:
                return
            if r==n:
                res.append(s)
                return
            dfs(l+1,r,s+'(')
            dfs(l,r+1,s+')')
        res = []
        dfs(0,0,'')
        return res
```
时间 O(N)，41 ms

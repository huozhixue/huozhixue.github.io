# 0282：给表达式添加运算符（★★）


> <u>**[力扣第 282 题](https://leetcode.cn/problems/expression-add-operators/)**</u>

## 题目

<p>给定一个仅包含数字 <code>0-9</code> 的字符串 <code>num</code> 和一个目标值整数 <code>target</code> ，在 <code>num</code> 的数字之间添加 <strong>二元 </strong>运算符（不是一元）<code>+</code>、<code>-</code> 或 <code>*</code> ，返回 <strong>所有</strong> 能够得到 <code>target </code>的表达式。</p>

<p>注意，返回表达式中的操作数 <strong>不应该</strong> 包含前导零。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <code>num = </code>"123", target = 6
<strong>输出: </strong>["1+2+3", "1*2*3"]
<strong>解释: </strong>“1*2*3” 和 “1+2+3” 的值都是6。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> <code>num = </code>"232", target = 8
<strong>输出: </strong>["2*3+2", "2+3*2"]
<strong>解释:</strong> “2*3+2” 和 “2+3*2” 的值都是8。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> <code>num = </code>"3456237490", target = 9191
<strong>输出: </strong>[]
<strong>解释: </strong>表达式 “3456237490” 无法得到 9191 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= num.length &lt;= 10</code></li>
<li><code>num</code> 仅含数字</li>
<li><code>-2<sup>31</sup> &lt;= target &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

### #1

最简单的就是遍历每一种情况，判断是否等于 target。

可以用 dfs，每一步添加 +、-、* 或空。注意不能有前置 0。


```python
def addOperators(self, num: str, target: int) -> List[str]:
    def dfs(i, exp):
        if i == n:
            if eval(exp) == target:
                res.append(exp)
            return
        ops = ['+','-','*','']
        if not exp:
            ops = ['']
        elif exp[-2:] in ['0','+0','-0','*0']:
            ops = '+-*'
        for op in ops:
            dfs(i+1, exp+op+num[i])

    res, n = [], len(num)
    dfs(0, '')
    return res
```
9576 ms

### 2

考虑在遍历时维护当前表达式的值，节省时间。

为了递推 exp+op+num[i:j] 的值，需要知道 
- exp 计算后的值 val
- exp 计算了乘法之后的最后一个数（包括正负号） prev
   
因此 dfs 时添加两个传递的变量。

## 解答

```python
def addOperators(self, num: str, target: int) -> List[str]:
    def dfs(i, exp, prev, val):
        if i == n:
            if val == target:
                res.append(exp)
            return
        for j in range(i+1, i+2 if num[i] == '0' else n+1):
            s = num[i:j]
            x = int(s)
            if not exp:
                dfs(j, s, x, x)
            else:
                dfs(j, exp+'+'+s, x, val+x)
                dfs(j, exp+'-'+s, -x, val-x)
                dfs(j, exp+'*'+s, prev*x, val-prev+x*prev)

    res, n = [], len(num)
    dfs(0, '', 0, 0)
    return res
```
588 ms

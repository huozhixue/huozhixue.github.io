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

- 回溯时，要递推 exp+op+num[i:j] 的值
- 考虑将 exp 最后一个连乘式（包括负号）拆出来，变成 exp_ + mul
- 维护 exp_ 和 mul 的值，即可递推


```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        def dfs(i,s,w,mul):
            if i==n:
                if w+mul==target:
                    res.append(s)
                return
            for j in range(i,i+1 if num[i]=='0' else n):
                x = num[i:j+1]
                if not s:
                    dfs(j+1,s+x,w,int(x))
                else:
                    dfs(j+1,s+'+'+x,w+mul,int(x))
                    dfs(j+1,s+'-'+x,w+mul,-int(x))
                    dfs(j+1,s+'*'+x,w,mul*int(x))
        res = []
        n = len(num)
        dfs(0,'',0,0)
        return res
```
510 ms

### 2

- 还可以将连乘式 mul 拆成 a * b，a 包括负号，b 是最后一个乘数
- 即可按 num 的每一位递推

## 解答

```python
class Solution:
    def addOperators(self, num: str, target: int) -> List[str]:
        def dfs(i,s,w,a,b):
            if i==n:
                if w+a*b==target:
                    res.append(s)
                return
            x = num[i]
            if b:
                dfs(i+1,s+x,w,a,b*10+int(x))
            dfs(i+1,s+'+'+x,w+a*b,1,int(x))
            dfs(i+1,s+'-'+x,w+a*b,-1,int(x))
            dfs(i+1,s+'*'+x,w,a*b,int(x))
        res = []
        n = len(num)
        dfs(1,num[0],0,1,int(num[0]))
        return res
```
410 ms

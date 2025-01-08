# 0679：24 点游戏（★★）


> <u>**[力扣第 679 题](https://leetcode.cn/problems/24-game/)**</u>

## 题目

<p>给定一个长度为4的整数数组 <code>cards</code> 。你有 <code>4</code> 张卡片，每张卡片上都包含一个范围在 <code>[1,9]</code> 的数字。您应该使用运算符 <code>['+', '-', '*', '/']</code> 和括号 <code>'('</code> 和 <code>')'</code> 将这些卡片上的数字排列成数学表达式，以获得值24。</p>

<p>你须遵守以下规则:</p>

<ul>
<li>除法运算符 <code>'/'</code> 表示实数除法，而不是整数除法。

<ul>
<li>例如， <code>4 /(1 - 2 / 3)= 4 /(1 / 3)= 12</code> 。</li>
</ul>
</li>
<li>每个运算都在两个数字之间。特别是，不能使用 <code>“-”</code> 作为一元运算符。
<ul>
<li>例如，如果 <code>cards =[1,1,1,1]</code> ，则表达式 <code>“-1 -1 -1 -1”</code> 是 <strong>不允许</strong> 的。</li>
</ul>
</li>
<li>你不能把数字串在一起
<ul>
<li>例如，如果 <code>cards =[1,2,1,2]</code> ，则表达式 <code>“12 + 12”</code> 无效。</li>
</ul>
</li>
</ul>

<p>如果可以得到这样的表达式，其计算结果为 <code>24</code> ，则返回 <code>true </code>，否则返回 <code>false</code> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> cards = [4, 1, 8, 7]
<strong>输出:</strong> true
<strong>解释:</strong> (8-4) * (7-1) = 24
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> cards = [1, 2, 1, 2]
<strong>输出:</strong> false
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>cards.length == 4</code></li>
<li><code>1 &lt;= cards[i] &lt;= 9</code></li>
</ul>




## 分析

### #1

- 每次任选两张和一个运算符，合并成一张，最后合成 24 即成功
- 为了防止处理浮点数，可以用 Fraction

```python
class Solution:
    def judgePoint24(self, cards: List[int]) -> bool:
        from fractions import Fraction
        @cache
        def dfs(A):
            n = len(A)
            if n==1:
                return A[0]==24
            for i,j in product(range(n),range(n)):
                if i!=j:
                    B = [A[k] for k in range(n) if k not in [i,j]]
                    for x in [A[i]+A[j],A[i]-A[j],A[i]*A[j]]:
                        if dfs(tuple(B+[x])):
                            return True
                    if A[j]!=0 and dfs(tuple(B+[A[i]/A[j]])):
                        return True
            return False
        return dfs(tuple(Fraction(a,1) for a in cards))
```
147 ms

### #2

- 更通用的做法是枚举所有可能拼成的值
- 令 f(A) 代表集合 A 所有能拼成的值
- 枚举 A 划分为两个集合 B、C，根据 f(B) 和 f(C) 和运算符的组合，即可得到 f(A)
- 可以将集合状态压缩为一个数

## 解答


```python
class Solution:
    def judgePoint24(self, cards: List[int]) -> bool:
        from fractions import Fraction
        m = 1<<4
        sub = [[] for _ in range(m)]
        f = [set() for _ in range(m)]
        for st in range(1,m):
            y = (st-1)&st
            while y:
                sub[st].append((y,st^y))
                y = (y-1)&st
            k,i = st.bit_count(),st.bit_length()-1
            if k==1:
                f[st].add(Fraction(cards[i],1))
            else:
                for a,b in sub[st]:
                    for x,y in product(f[a],f[b]):
                        f[st] |= {x+y,x-y,x*y}|({x/y} if y else set())
        return 24 in f[-1]
```
413 ms

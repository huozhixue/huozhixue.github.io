# 0254：因子的组合（★）


> <u>**[力扣第 254 题](https://leetcode.cn/problems/factor-combinations/)**</u>

## 题目

<p>整数可以被看作是其因子的乘积。</p>

<p>例如：</p>

<pre>8 = 2 x 2 x 2;
= 2 x 4.</pre>

<p>请实现一个函数，该函数接收一个整数 <em>n</em> 并返回该整数所有的因子组合。</p>

<p><strong>注意：</strong></p>

<ol>
<li>你可以假定 <em>n</em> 为永远为正数。</li>
<li>因子必须大于 1 并且小于 <em>n</em>。</li>
</ol>

<p><strong>示例 1：</strong></p>

<pre><strong>输入: </strong><code>1</code>
<strong>输出: </strong>[]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入: </strong><code>37</code>
<strong>输出: </strong>[]</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入: </strong><code>12</code>
<strong>输出:</strong>
[
[2, 6],
[2, 2, 3],
[3, 4]
]</pre>

<p><strong>示例 4: </strong></p>

<pre><strong>输入: </strong><code>32</code>
<strong>输出:</strong>
[
[2, 16],
[2, 2, 8],
[2, 2, 2, 4],
[2, 2, 2, 2, 2],
[2, 4, 4],
[4, 8]
]
</pre>


## 分析

令 dfs(n, p) 代表 n 的所有最小因子 >=p 的因子组合，即可递归。

## 解答

```python
def getFactors(self, n: int) -> List[List[int]]:
    def dfs(n, p):
        res = []
        for i in range(p, int(sqrt(n))+1):
            if n%i==0:
                res.append([i, n//i])
                for sub in dfs(n//i, i):
                    res.append([i]+sub)
        return res
    
    return dfs(n, 2)
```
52 ms

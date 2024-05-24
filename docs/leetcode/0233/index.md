# 0233：数字 1 的个数（★★）


> <u>**[力扣第 233 题](https://leetcode.cn/problems/number-of-digit-one/)**</u>

## 题目

<p>给定一个整数 <code>n</code>，计算所有小于等于 <code>n</code> 的非负整数中数字 <code>1</code> 出现的个数。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 13
<strong>输出：</strong>6
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 0
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

- 求范围内数字满足某种性质的个数，典型的数位 dp 问题，可以采用通用模板
- 令 dfs(i, st, bd) 代表某个状态下的结果：
	- 遍历到 n 的第 i 位
	- 前面取的数中有 st 个 1
	- bd 代表前面取的数是否贴着 n 的上界
- 即可递归

## 解答

```python
class Solution:
    def countDigitOne(self, n: int) -> int:
        @cache
        def dfs(i,st,bd):
            if i==len(s):
                return st
            res = 0
            cur = int(s[i])
            up = cur if bd else 9
            for x in range(up+1):
                res += dfs(i+1,st+(x==1),bd and x==cur)
            return res
        s = str(n)
        return dfs(0,0,True)
```
48 ms

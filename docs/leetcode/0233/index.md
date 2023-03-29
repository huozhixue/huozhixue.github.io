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

求范围内数字满足某种性质的个数，典型的数位 dp 问题。

令 dfs(pos, st, bound) 代表某个状态下的结果：
- 遍历到 n 的第 pos 位
- 前面取的数中有 st 个 1
- bound 代表前面取的数是否贴着 n 的上界

即可递归。

## 解答

```python
def countDigitOne(self, n: int) -> int:
    @cache
    def dfs(pos, st, bound):
        if pos == len(s):
            return st
        cur = int(s[pos])
        up = cur if bound else 9
        return sum(dfs(pos+1, st+(x==1), bound and x==cur) for x in range(up+1))

    s = str(n)
    return dfs(0, 0, 1)
```
32 ms

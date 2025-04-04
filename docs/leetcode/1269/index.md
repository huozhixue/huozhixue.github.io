# 1269：停在原地的方案数（1854 分）


> <u>**[力扣第 164 场周赛第 4 题](https://leetcode.cn/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/)**</u>

## 题目

<p>有一个长度为 <code>arrLen</code> 的数组，开始有一个指针在索引 <code>0</code> 处。</p>

<p>每一步操作中，你可以将指针向左或向右移动 1 步，或者停在原地（指针不能被移动到数组范围外）。</p>

<p>给你两个整数 <code>steps</code> 和 <code>arrLen</code> ，请你计算并返回：在恰好执行 <code>steps</code> 次操作以后，指针仍然指向索引 <code>0</code> 处的方案数。</p>

<p>由于答案可能会很大，请返回方案数 <strong>模</strong> <code>10^9 + 7</code> 后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>steps = 3, arrLen = 2
<strong>输出：</strong>4
<strong>解释：</strong>3 步后，总共有 4 种不同的方法可以停在索引 0 处。
向右，向左，不动
不动，向右，向左
向右，不动，向左
不动，不动，不动
</pre>

<p><strong>示例  2：</strong></p>

<pre>
<strong>输入：</strong>steps = 2, arrLen = 4
<strong>输出：</strong>2
<strong>解释：</strong>2 步后，总共有 2 种不同的方法可以停在索引 0 处。
向右，向左
不动，不动
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>steps = 4, arrLen = 2
<strong>输出：</strong>8
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= steps <= 500</code></li>
<li><code>1 <= arrLen <= 10<sup>6</sup></code></li>
</ul>


**相似问题：**
- [2400：恰好移动 k 步到达某一位置的方法数目（1751 分）](/leetcode/2400)


## 分析

- 递推指向索引 i 的方案数即可
## 解答


```python
class Solution:
    def numWays(self, steps: int, arrLen: int) -> int:
        mod = 10**9+7
        f = {0:1}
        for _ in range(steps):
            g = defaultdict(int)
            for x in f:
                for y in (x-1,x,x+1):
                    if 0<=y<arrLen:
                        g[y] += f[x]
                        g[y] %= mod
            f = g
        return f[0]
```
363 ms

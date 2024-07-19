# 1510：石子游戏 IV（1786 分）


> <u>**[力扣第 30 场双周赛第 4 题](https://leetcode.cn/problems/stone-game-iv/)**</u>

## 题目

<p>Alice 和 Bob 两个人轮流玩一个游戏，Alice 先手。</p>

<p>一开始，有 <code>n</code> 个石子堆在一起。每个人轮流操作，正在操作的玩家可以从石子堆里拿走 <strong>任意</strong> 非零 <strong>平方数</strong> 个石子。</p>

<p>如果石子堆里没有石子了，则无法操作的玩家输掉游戏。</p>

<p>给你正整数 <code>n</code> ，且已知两个人都采取最优策略。如果 Alice 会赢得比赛，那么返回 <code>True</code> ，否则返回 <code>False</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>true
<strong>解释：</strong>Alice 拿走 1 个石子并赢得胜利，因为 Bob 无法进行任何操作。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>false
<strong>解释：</strong>Alice 只能拿走 1 个石子，然后 Bob 拿走最后一个石子并赢得胜利（2 -&gt; 1 -&gt; 0）。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>true
<strong>解释：</strong>n 已经是一个平方数，Alice 可以一次全拿掉 4 个石子并赢得胜利（4 -&gt; 0）。
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>n = 7
<strong>输出：</strong>false
<strong>解释：</strong>当 Bob 采取最优策略时，Alice 无法赢得比赛。
如果 Alice 一开始拿走 4 个石子， Bob 会拿走 1 个石子，然后 Alice 只能拿走 1 个石子，Bob 拿走最后一个石子并赢得胜利（7 -&gt; 3 -&gt; 2 -&gt; 1 -&gt; 0）。
如果 Alice 一开始拿走 1 个石子， Bob 会拿走 4 个石子，然后 Alice 只能拿走 1 个石子，Bob 拿走最后一个石子并赢得胜利（7 -&gt; 6 -&gt; 2 -&gt; 1 -&gt; 0）。</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>n = 17
<strong>输出：</strong>false
<strong>解释：</strong>如果 Bob 采取最优策略，Alice 无法赢得胜利。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10^5</code></li>
</ul>


**相似问题：**
- [1563：石子游戏 V（2087 分）](/leetcode/1563)
- [1686：石子游戏 VI（2000 分）](/leetcode/1686)
- [1690：石子游戏 VII（1951 分）](/leetcode/1690)
- [1872：石子游戏 VIII（2439 分）](/leetcode/1872)
- [2029：石子游戏 IX（2277 分）](/leetcode/2029)


## 分析


博弈问题，按先手选哪个数递推即可。

## 解答

```python
class Solution:
    def winnerSquareGame(self, n: int) -> bool:
        f = [0]*(n+1)
        for i in range(1,n+1):
            f[i] = any(not f[i-x*x] for x in range(1,isqrt(i)+1))
        return bool(f[-1])
```
667 ms



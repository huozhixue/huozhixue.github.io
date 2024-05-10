# 1025：除数博弈（★）


> <u>**[力扣第 132 场周赛第 1 题](https://leetcode.cn/problems/divisor-game/)**</u>

## 题目

<p>爱丽丝和鲍勃一起玩游戏，他们轮流行动。爱丽丝先手开局。</p>

<p>最初，黑板上有一个数字 <code>n</code> 。在每个玩家的回合，玩家需要执行以下操作：</p>

<ul>
<li>选出任一 <code>x</code>，满足 <code>0 &lt; x &lt; n</code> 且 <code>n % x == 0</code> 。</li>
<li>用 <code>n - x</code> 替换黑板上的数字 <code>n</code> 。</li>
</ul>

<p>如果玩家无法执行这些操作，就会输掉游戏。</p>

<p><em>只有在爱丽丝在游戏中取得胜利时才返回 <code>true</code> 。假设两个玩家都以最佳状态参与游戏。</em></p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>true
<strong>解释：</strong>爱丽丝选择 1，鲍勃无法进行操作。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>false
<strong>解释：</strong>爱丽丝选择 1，鲍勃也选择 1，然后爱丽丝无法进行操作。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>


## 分析

### #1

典型的博弈问题，令 f[i] 代表先手面对数字 i 能否获胜，即可递推。

```python
class Solution:
    def divisorGame(self, n: int) -> bool:
        f = [0]*(n+1)
        for i in range(2,n+1):
            f[i] = any(not f[i-x] for x in range(1,i) if i%x==0)
        return bool(f[-1])
```
71 ms

### #2

还有个巧妙的想法
- 若 N 是偶数，则爱丽丝取 1
	- N-1 的因子都是奇数，不管鲍勃选什么，留给爱丽丝的仍然是偶数
	- 到最后必然是鲍勃面对 1，爱丽丝获胜
- 同理，若 N 是奇数，则鲍勃必胜

## 解答

```python
class Solution:
    def divisorGame(self, n: int) -> bool:
        return n%2==0
```

37 ms

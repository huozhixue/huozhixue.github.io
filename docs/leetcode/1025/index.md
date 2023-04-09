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

先考虑递归。任选 N 的一个小于 N 的因数 i，转为递归子问题用 N-i 玩游戏。

```python
@lru_cache(None)
def divisorGame(self, N: int) -> bool:
	if N < 2:
		return False
	return any(N % i==0 and not self.divisorGame(N-i) for i in range(1, N//2+1))
```

64 ms

### #2

还有个巧妙的想法。若 N 是偶数，则爱丽丝取 1，那么不管鲍勃怎么选，留给爱丽丝的仍然是偶数。
这样到最后必然是鲍勃面对 1，爱丽丝获胜。

若 N 是奇数，同理鲍勃每次取 1 就必胜。因此答案只跟 N 的奇偶性相关。

## 解答

```python
def divisorGame(self, N: int) -> bool:
	return  N % 2 == 0
```

32 ms

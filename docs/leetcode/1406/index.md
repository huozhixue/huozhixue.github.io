# 1406：石子游戏 III（2026 分）


> <u>**[力扣第 183 场周赛第 4 题](https://leetcode.cn/problems/stone-game-iii/)**</u>

## 题目

<p>Alice 和 Bob 继续他们的石子游戏。几堆石子 <strong>排成一行</strong> ，每堆石子都对应一个得分，由数组 <code>stoneValue</code> 给出。</p>

<p>Alice 和 Bob 轮流取石子，<strong>Alice</strong> 总是先开始。在每个玩家的回合中，该玩家可以拿走剩下石子中的的前 <strong>1、2 或 3 堆石子</strong> 。比赛一直持续到所有石头都被拿走。</p>

<p>每个玩家的最终得分为他所拿到的每堆石子的对应得分之和。每个玩家的初始分数都是 <strong>0</strong> 。</p>

<p>比赛的目标是决出最高分，得分最高的选手将会赢得比赛，比赛也可能会出现平局。</p>

<p>假设 Alice 和 Bob 都采取 <strong>最优策略</strong> 。</p>

<p>如果 Alice 赢了就返回 <code>"Alice"</code> <em>，</em>Bob 赢了就返回<em> </em><code>"Bob"</code><em>，</em>分数相同返回 <code>"Tie"</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>values = [1,2,3,7]
<strong>输出：</strong>"Bob"
<strong>解释：</strong>Alice 总是会输，她的最佳选择是拿走前三堆，得分变成 6 。但是 Bob 的得分为 7，Bob 获胜。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>values = [1,2,3,-9]
<strong>输出：</strong>"Alice"
<strong>解释：</strong>Alice 要想获胜就必须在第一个回合拿走前三堆石子，给 Bob 留下负分。
如果 Alice 只拿走第一堆，那么她的得分为 1，接下来 Bob 拿走第二、三堆，得分为 5 。之后 Alice 只能拿到分数 -9 的石子堆，输掉比赛。
如果 Alice 拿走前两堆，那么她的得分为 3，接下来 Bob 拿走第三堆，得分为 3 。之后 Alice 只能拿到分数 -9 的石子堆，同样会输掉比赛。
注意，他们都应该采取 <strong>最优策略 </strong>，所以在这里 Alice 将选择能够使她获胜的方案。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>values = [1,2,3,6]
<strong>输出：</strong>"Tie"
<strong>解释：</strong>Alice 无法赢得比赛。如果她决定选择前三堆，她可以以平局结束比赛，否则她就会输。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= stoneValue.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>-1000 &lt;= stoneValue[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [1563：石子游戏 V（2087 分）](/leetcode/1563)
- [1686：石子游戏 VI（2000 分）](/leetcode/1686)
- [1690：石子游戏 VII（1951 分）](/leetcode/1690)
- [1872：石子游戏 VIII（2439 分）](/leetcode/1872)
- [2029：石子游戏 IX（2277 分）](/leetcode/2029)


## 分析

### #1

- 为了方便，将石子反序得到 A
- 令 f(i) 代表 A[:i] 玩游戏，先取的人最佳策略下和另一个人的分差，按取几堆递推即可

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        A = stoneValue[::-1]
        n = len(A)
        p = list(accumulate([0]+A))
        f = [0]*(n+1)
        for i in range(1,n+1):
            f[i] = max(p[i]-p[j]-f[j] for j in range(max(0,i-3),i))
        return 'Alice' if f[-1]>0 else 'Bob' if f[-1]<0 else 'Tie'
```
895 ms

### #2

- 注意到递推式实际上是求一个区间内 p[j]+f[j] 的最小值
- 可以用单调队列维护滑动窗口最小值

## 解答

```python
class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        A = stoneValue[::-1]
        n = len(A)
        p = list(accumulate([0]+A))
        f = [0]*(n+1)
        Q = deque([(0,0)])
        for i in range(1,n+1):
            if Q and Q[0][0]<i-3:
                Q.popleft()
            f[i] = p[i]-Q[0][1]
            while Q and Q[-1][1]>=p[i]+f[i]:
                Q.pop()
            Q.append((i,p[i]+f[i]))
        return 'Alice' if f[-1]>0 else 'Bob' if f[-1]<0 else 'Tie'
```
344 ms



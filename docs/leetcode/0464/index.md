# 0464：我能赢吗（★）


> <u>**[力扣第 464 题](https://leetcode.cn/problems/can-i-win/)**</u>

## 题目

<p>在 "100 game" 这个游戏中，两名玩家轮流选择从 <code>1</code> 到 <code>10</code> 的任意整数，累计整数和，先使得累计整数和 <strong>达到或超过</strong>  100 的玩家，即为胜者。</p>

<p>如果我们将游戏规则改为 “玩家 <strong>不能</strong> 重复使用整数” 呢？</p>

<p>例如，两个玩家可以轮流从公共整数池中抽取从 1 到 15 的整数（不放回），直到累计整数和 &gt;= 100。</p>

<p>给定两个整数 <code>maxChoosableInteger</code> （整数池中可选择的最大数）和 <code>desiredTotal</code>（累计和），若先出手的玩家能稳赢则返回 <code>true</code> ，否则返回 <code>false</code> 。假设两位玩家游戏时都表现 <strong>最佳</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>maxChoosableInteger = 10, desiredTotal = 11
<strong>输出：</strong>false
<strong>解释：
</strong>无论第一个玩家选择哪个整数，他都会失败。
第一个玩家可以选择从 1 到 10 的整数。
如果第一个玩家选择 1，那么第二个玩家只能选择从 2 到 10 的整数。
第二个玩家可以通过选择整数 10（那么累积和为 11 &gt;= desiredTotal），从而取得胜利.
同样地，第一个玩家选择任意其他整数，第二个玩家都会赢。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>maxChoosableInteger = 10, desiredTotal = 0
<b>输出：</b>true
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入：</strong>maxChoosableInteger = 10, desiredTotal = 1
<strong>输出：</strong>true
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= maxChoosableInteger &lt;= 20</code></li>
<li><code>0 &lt;= desiredTotal &lt;= 300</code></li>
</ul>


## 分析

为了方便，令 M=maxChoosableInteger，T=desiredTotal。

假如 M*(M+1)//2<T，显然没有人能赢。否则：
- 如果第一个玩家选了 x 后第二个玩家要输，则第一个玩家必赢
- 第一个玩家选了 x 后，第二个玩家面临的情况等价于可选集合为 {原集合去掉 x}、目标为 T-x 的子问题

因此令 dfs(A, T) 代表可选集合为 A、 目标 T 的情况下第一个玩家是否稳赢，即可递归。

为了方便表示集合，可以用状态压缩。

```python
def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
    @lru_cache(None)
    def dfs(state, T):
        for x in range(1, M+1):
            if not state&(1<<x):
                if x>=T or not dfs(state|(1<<x), T-x):
                    return True
        return False

    M, T = maxChoosableInteger, desiredTotal
    if M*(M+1) // 2 < T:
        return False
    return dfs(0, T)
```
2680 ms



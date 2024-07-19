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


**相似问题：**
- [0294：翻转游戏 II](/leetcode/0294)
- [0375：猜数字大小 II](/leetcode/0375)
- [0486：预测赢家](/leetcode/0486)


## 分析

典型的博弈问题：
- 为了方便，令 m=maxChoosableInteger，y=desiredTotal
- 先排除特殊情况 m*(m+1)//2<t，此时没有人达到 t，返回 False
- 否则，每个集合状态必然对应必胜或必败
- 令 dfs(st, s) 代表已选集合 st、已选之和 s 的情况下第一个玩家是否必胜
- 第一个玩家选了不在 st 中的 x 后，转为子问题 dfs(st|1<<x,s+x)

## 解答

```python
class Solution:
    def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:
        @cache
        def dfs(st,s):
            for x in range(m):
                if not st&1<<x:
                    if s+x+1>=t or not dfs(st|1<<x,s+x+1):
                        return True
            return False

        m,t = maxChoosableInteger, desiredTotal
        if m*(m+1)//2<t:
            return False
        return dfs(0,0)
```
1794 ms





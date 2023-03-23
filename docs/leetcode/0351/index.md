# 0351：安卓系统手势解锁（★）


> <u>**[力扣第 351 题](https://leetcode.cn/problems/android-unlock-patterns/)**</u>

## 题目

<p>我们都知道安卓有个手势解锁的界面，是一个 <code>3 x 3</code><strong> </strong>的点所绘制出来的网格。用户可以设置一个 “解锁模式” ，通过连接特定序列中的点，形成一系列彼此连接的线段，每个线段的端点都是序列中两个连续的点。如果满足以下两个条件，则 <code>k</code> 点序列是有效的解锁模式：</p>

<ul>
<li>解锁模式中的所有点 <strong>互不相同</strong> 。</li>
<li>假如模式中两个连续点的线段需要经过其他点的 <strong>中心</strong> ，那么要经过的点 <strong>必须提前出现</strong> 在序列中（已经经过），不能跨过任何还未被经过的点。
<ul>
<li>例如，点 <code>5</code> 或 <code>6</code> 没有提前出现的情况下连接点 <code>2</code> 和 <code>9</code> 是有效的，因为从点 <code>2</code> 到点 <code>9</code> 的线没有穿过点 <code>5</code> 或 <code>6</code> 的中心。</li>
<li>然而，点 <code>2</code> 没有提前出现的情况下连接点 <code>1</code> 和 <code>3</code> 是无效的，因为从圆点 <code>1</code> 到圆点 <code>3</code> 的直线穿过圆点 <code>2</code> 的中心。</li>
</ul>
</li>
</ul>

<p>以下是一些有效和无效解锁模式的示例：</p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/android-unlock.png" /></p>

<ul>
<li><strong>无效手势：</strong><code>[4,1,3,6]</code> ，连接点 1 和点 3 时经过了未被连接过的 2 号点。</li>
<li><strong>无效手势：</strong><code>[4,1,9,2]</code> ，连接点 1 和点 9 时经过了未被连接过的 5 号点。</li>
<li><strong>有效手势：</strong><code>[2,4,1,3,6]</code> ，连接点 1 和点 3 是有效的，因为虽然它经过了点 2 ，但是点 2 在该手势中之前已经被连过了。</li>
<li><strong>有效手势：</strong><code>[6,5,4,1,9,2]</code> ，连接点 1 和点 9 是有效的，因为虽然它经过了按键 5 ，但是点 5 在该手势中之前已经被连过了。</li>
</ul>

<p>给你两个整数，分别为 ​​<code>m</code> 和 <code>n</code> ，那么请返回有多少种 <strong>不同且有效的解锁模式 </strong>，是 <strong>至少</strong> 需要经过 <code>m</code> 个点，但是 <strong>不超过</strong> <code>n</code> 个点的。</p>

<p>两个解锁模式 <strong>不同</strong> 需满足：经过的点不同或者经过点的顺序不同。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>m = 1, n = 1
<strong>输出：</strong>9
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>m = 1, n = 2
<strong>输出：</strong>65
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= m, n &lt;= 9</code></li>
</ul>


## 分析

### #1

数据较小，可以直接生成所有可能的排列，判断是否有效即可：
- 本题中，若两点连线经过其它点，必然是这两点的中点
- 因此判断两个连续点的中点是否为网格、是否已访问即可

```python
def numberOfPatterns(self, m: int, n: int) -> int:
    def check(A):
        vis = set()
        for a, b in pairwise(A):
            x1, y1 = divmod(a, 3)
            x2, y2 = divmod(b, 3)
            mid = (x1+x2)//2*3+(y1+y2)//2
            if (x1+x2)%2==0 and (y1+y2)%2==0 and mid not in vis:
                return False
            vis.add(a)
        return True
    return sum(check(A) for k in range(m, n+1) for A in permutations(range(9), k))
```
时间复杂度 O(9 * 9!)，3884 ms

### #2

还可以用状压 dp。

令 dp[st][i] 代表访问过的点集合是 st 且最后一个点是 i 的有效序列数量，即可递推。

## 解答

```python
def numberOfPatterns(self, m: int, n: int) -> int:
    def check(st, i, j):
        x1, y1 = divmod(i, 3)
        x2, y2 = divmod(j, 3)
        mid = (x1+x2)//2*3+(y1+y2)//2
        return (x1+x2)%2 or (y1+y2)%2 or st&(1<<mid)

    res, dp = 0, [[0]*9 for _ in range(1<<9)]
    for i in range(9):
        dp[1<<i][i] = 1
    for st in range(1<<9):
        for i in range(9):
            for j in range(9):
                if not st&(1<<j) and check(st, i, j):
                    dp[st|(1<<j)][j] += dp[st][i]
    return sum(sum(dp[st]) for st in range(1<<9) if m<=bin(st).count('1')<=n)
```
时间复杂度 O(9 * 9 * 2^9)，352 ms




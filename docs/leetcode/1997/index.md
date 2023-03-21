# 1997：访问完所有房间的第一天（★）


> <u>**[力扣第 257 场周赛第 3 题](https://leetcode.cn/problems/first-day-where-you-have-been-in-all-the-rooms/)**</u>

## 题目

<p>你需要访问 <code>n</code> 个房间，房间从 <code>0</code> 到 <code>n - 1</code> 编号。同时，每一天都有一个日期编号，从 <code>0</code> 开始，依天数递增。你每天都会访问一个房间。</p>

<p>最开始的第 <code>0</code> 天，你访问 <code>0</code> 号房间。给你一个长度为 <code>n</code> 且 <strong>下标从 0 开始</strong> 的数组 <code>nextVisit</code> 。在接下来的几天中，你访问房间的 <strong>次序</strong> 将根据下面的 <strong>规则</strong> 决定：</p>

<ul>
<li>假设某一天，你访问 <code>i</code> 号房间。</li>
<li>如果算上本次访问，访问 <code>i</code> 号房间的次数为 <strong>奇数</strong> ，那么 <strong>第二天</strong> 需要访问 <code>nextVisit[i]</code> 所指定的房间，其中 <code>0 &lt;= nextVisit[i] &lt;= i</code> 。</li>
<li>如果算上本次访问，访问 <code>i</code> 号房间的次数为 <strong>偶数</strong> ，那么 <strong>第二天</strong> 需要访问 <code>(i + 1) mod n</code> 号房间。</li>
</ul>

<p>请返回你访问完所有房间的第一天的日期编号。题目数据保证总是存在这样的一天。由于答案可能很大，返回对 <code>10<sup>9</sup> + 7</code> 取余后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nextVisit = [0,0]
<strong>输出：</strong>2
<strong>解释：</strong>
- 第 0 天，你访问房间 0 。访问 0 号房间的总次数为 1 ，次数为奇数。
下一天你需要访问房间的编号是 nextVisit[0] = 0
- 第 1 天，你访问房间 0 。访问 0 号房间的总次数为 2 ，次数为偶数。
下一天你需要访问房间的编号是 (0 + 1) mod 2 = 1
- 第 2 天，你访问房间 1 。这是你第一次完成访问所有房间的那天。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nextVisit = [0,0,2]
<strong>输出：</strong>6
<strong>解释：</strong>
你每天访问房间的次序是 [0,0,1,0,0,1,2,...] 。
第 6 天是你访问完所有房间的第一天。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nextVisit = [0,1,2,0]
<strong>输出：</strong>6
<strong>解释：</strong>
你每天访问房间的次序是 [0,0,1,1,2,2,3,...] 。
第 6 天是你访问完所有房间的第一天。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nextVisit.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nextVisit[i] &lt;= i</code></li>
</ul>


## 分析

观察发现，第一次访问房间 i 后，跳到房间 j=nextVisit[i]。
然后从 j 到 i 会重复之前第一次从 j 到 i 的过程。之后再移到房间 i+1。

因此考虑递推，令 dp[i] 代表第一次访问房间 i 的日期。那么
    
    第一次从 j 到 i 的过程用了 dp[i]-dp[j] 天
    dp[i+1] = dp[i] + 1 + dp[i] - dp[j] + 1
        = 2*dp[i]-dp[j]+2

最终 dp[-1] 即为所求。

## 解答

```python
def firstDayBeenInAllRooms(self, nextVisit: List[int]) -> int:
    n, mod = len(nextVisit), 10**9+7
    dp = [0] * n
    for i in range(1, n):
        dp[i] = 2*dp[i-1]-dp[nextVisit[i-1]]+2
        dp[i] %= mod
    return dp[-1]
```
228 ms


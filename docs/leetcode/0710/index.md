# 0710：黑名单中的随机数（★★）


> <u>**[力扣第 710 题](https://leetcode.cn/problems/random-pick-with-blacklist/)**</u>

## 题目

<p>给定一个整数 <code>n</code> 和一个 <strong>无重复</strong> 黑名单整数数组 <code>blacklist</code> 。设计一种算法，从 <code>[0, n - 1]</code> 范围内的任意整数中选取一个 <strong>未加入 </strong>黑名单 <code>blacklist</code> 的整数。任何在上述范围内且不在黑名单 <code>blacklist</code> 中的整数都应该有 <strong>同等的可能性</strong> 被返回。</p>

<p>优化你的算法，使它最小化调用语言 <strong>内置</strong> 随机函数的次数。</p>

<p>实现 <code>Solution</code> 类:</p>

<ul>
<li><code>Solution(int n, int[] blacklist)</code> 初始化整数 <code>n</code> 和被加入黑名单 <code>blacklist</code> 的整数</li>
<li><code>int pick()</code> 返回一个范围为 <code>[0, n - 1]</code> 且不在黑名单 <code>blacklist</code> 中的随机整数</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>
["Solution", "pick", "pick", "pick", "pick", "pick", "pick", "pick"]
[[7, [2, 3, 5]], [], [], [], [], [], [], []]
<strong>输出</strong>
[null, 0, 4, 1, 6, 1, 0, 4]

<b>解释
</b>Solution solution = new Solution(7, [2, 3, 5]);
solution.pick(); // 返回0，任何[0,1,4,6]的整数都可以。注意，对于每一个pick的调用，
// 0、1、4和6的返回概率必须相等(即概率为1/4)。
solution.pick(); // 返回 4
solution.pick(); // 返回 1
solution.pick(); // 返回 6
solution.pick(); // 返回 1
solution.pick(); // 返回 0
solution.pick(); // 返回 4
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
<li><code>0 &lt;= blacklist.length &lt;= min(10<sup>5</sup>, n - 1)</code></li>
<li><code>0 &lt;= blacklist[i] &lt; n</code></li>
<li><code>blacklist</code> 中所有值都 <strong>不同</strong></li>
<li> <code>pick</code> 最多被调用 <code>2 * 10<sup>4</sup></code> 次</li>
</ul>


## 分析

设数组 A=list(range(n))，要求的即是从 A 中随机选一个不在黑名单中的数。

为了方便随机，考虑将黑名单的数都交换到前面。设 m=len(blacklist)，交换完成后从 A[m:] 中随机选一个数即可。

但是 n 很大，直接构造 A 会超时。有个巧妙的想法是 A[m:] 中最多有 m 个数是经过了交换的，其它的就等于下标。

那么用哈希表 d 维护 A[m:] 中经过了交换的数，则对于任意 y>=m，A[y]=d.get(y, y)。
因此随机取 >=m 的下标 y，返回 d.get(y, y) 即可。

具体维护哈希表时，将 （黑名单中 >=m 的数） 和 （[0,m) 中不属于黑名单的数）一一对应即可。

## 解答

```python
class Solution:

    def __init__(self, n: int, blacklist: List[int]):
        m, vis = len(blacklist), set(blacklist)
        B = [y for y in vis if y>=m]
        A = [x for x in range(m) if x not in vis]
        self.d = dict(zip(B, A))
        self.n = n
        self.m = m

    def pick(self) -> int:
        y = random.randint(self.m, self.n-1)
        return self.d.get(y, y)
```
272 ms


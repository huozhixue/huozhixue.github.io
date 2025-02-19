# 0920：播放列表的数量（2399 分）


> <u>**[力扣第 105 场周赛第 4 题](https://leetcode.cn/problems/number-of-music-playlists/)**</u>

## 题目

<p>你的音乐播放器里有 <code>n</code> 首不同的歌，在旅途中，你计划听 <code>goal</code> 首歌（不一定不同，即，允许歌曲重复）。你将会按如下规则创建播放列表：</p>

<ul>
<li>每首歌 <strong>至少播放一次</strong> 。</li>
<li>一首歌只有在其他 <code>k</code> 首歌播放完之后才能再次播放。</li>
</ul>

<p>给你 <code>n</code>、<code>goal</code> 和 <code>k</code> ，返回可以满足要求的播放列表的数量。由于答案可能非常大，请返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3, goal = 3, k = 1
<strong>输出：</strong>6
<strong>解释：</strong>有 6 种可能的播放列表。[1, 2, 3]，[1, 3, 2]，[2, 1, 3]，[2, 3, 1]，[3, 1, 2]，[3, 2, 1] 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2, goal = 3, k = 0
<strong>输出：</strong>6
<strong>解释：</strong>有 6 种可能的播放列表。[1, 1, 2]，[1, 2, 1]，[2, 1, 1]，[2, 2, 1]，[2, 1, 2]，[1, 2, 2] 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 2, goal = 3, k = 1
<strong>输出：</strong>2
<strong>解释：</strong>有 2 种可能的播放列表。[1, 2, 1]，[2, 1, 2] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= k &lt; n &lt;= goal &lt;= 100</code></li>
</ul>


**相似问题：**
- [2539：好子序列的个数](/leetcode/2539)


## 分析

### #1

- 考虑最后一首歌
	- 假如和前面的歌都不同，转为求 (goal-1,n-1) 的方案数
	- 假如和前面某首歌相同，因为不能和最近的 k 首歌相同，所以有 n-k 种选择，为 (goal-1,n) 的方案数乘以 n-k
- 因此，令 f[i][j] 代表听 i 首歌刚好 j 首不同歌的方案数，有递推式：
	- f[i][j] = (n-j+1)*f[i-1][j-1]+(j-k)*f[i-1][j]
- 还可以用滚动数组优化

```python
class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        mod = 10**9+7
        f = [1]+[0]*n
        for _ in range(goal):
            g = [0]*(n+1)
            for j in range(1,n+1):
                g[j] = f[j-1]*(n-j+1)+f[j]*(j-k if j>k else 0)
                g[j] %= mod
            f = g
        return f[-1]
```
21 ms

### #2

- 还有种更优的容斥定理方法
	- 先不考虑恰好 n 首不同歌的限制，令 f(n) 代表歌的种数<=n 的方案数
		- 再从 f(n) 中去掉歌的种数<=n-1 的方案数，即 nf(n-1)
		- 由于歌的种类<=n-2 的部分又被重复计算了，所以再加上 C(n,2)f(n-2)
		- 依此类推，有：
		$$res = f(n)-nf(n-1)+C(n,2)f(n-2)-...+(-1)^n C(n,n)f(0)$$
	- 再计算 f(n)，前面 k+1 首歌任选，后面每首歌有 n-k 种选择，所以

	$$f(n)=A(n,k+1)*(n-k)^{m-k-1}$$
	- 注意 n<=k 时，f(n)=0，因为此时无法听 m 首歌并满足 k 的限制
## 解答


```python
ma = 100
mod = 10**9+7
fac, inv = [1]*(ma+1), [1]*(ma+1)
for i in range(1,ma+1):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)

class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        res = 0
        for i in range(n,k,-1):
            sg = -1 if (n-i)&1 else 1
            res += sg*fac[n]*inv[n-i]*inv[i-k-1]*pow(i-k,goal-k-1,mod)
            res %= mod
        return res
```
0 ms

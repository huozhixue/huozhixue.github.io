# 0188：买卖股票的最佳时机 IV（★★）


> <u>**[力扣第 188 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)**</u>

## 题目

<p>给你一个整数数组 <code>prices</code> 和一个整数 <code>k</code> ，其中 <code>prices[i]</code> 是某支给定的股票在第 <code>i</code><em> </em>天的价格。</p>

<p>设计一个算法来计算你所能获取的最大利润。你最多可以完成 <code>k</code> 笔交易。也就是说，你最多可以买 <code>k</code> 次，卖 <code>k</code> 次。</p>

<p><strong>注意：</strong>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>k = 2, prices = [2,4,1]
<strong>输出：</strong>2
<strong>解释：</strong>在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>k = 2, prices = [3,2,6,5,0,3]
<strong>输出：</strong>7
<strong>解释：</strong>在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= 100</code></li>
<li><code>1 &lt;= prices.length &lt;= 1000</code></li>
<li><code>0 &lt;= prices[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0121：买卖股票的最佳时机](/leetcode/0121)
- [0122：买卖股票的最佳时机 II](/leetcode/0122)
- [0123：买卖股票的最佳时机 III](/leetcode/0123)
- [2291：最大股票收益](/leetcode/2291)


## 分析

### #1 dp

 {{< lc "0123" >}} 升级版，从 2 次变成了 k 次，最后可以优化为 2*k 个参数。

```python
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        f = [[0,-inf] for _ in range(k+1)]
        for x in prices:
            for i in range(k,-1,-1):
                f[i][1] = max(f[i][1],f[i][0]-x)
                if i:
                    f[i][0] = max(f[i][0],f[i-1][1]+x)
        return f[-1][0]
```
59 ms

### #2 反悔贪心

还有种贪心的思路
- 首先，最佳策略的交易必然是波底买入，波顶卖出，否则移动到最近的波底/顶，利润更高
- 因此可以只考虑波底/顶的点，得到一个 [底、顶、底、顶、...、底、顶] 的序列 B，不妨设为 $a_0b_0a_1b_1...a_mb_m，a_i/b_i$ 是第 i 个波底/顶的值，共 m 对
- 假如 m<=k，全选即可
- 假如 m>k，需要从 B 中删除 m-k 对相邻的底/顶（保证剩下的是同样形式的序列），即是删若干对 $a_ib_i$ 或 $b_ia_{i+1}$
	- 删 $a_ib_i$ 减少的即是 $b_i-a_i$，删 $b_ia_{i+1}$，减少的即是 $b_i-a_{i+1}$，所以问题等价于删若干对相邻的元素，其绝对差之和最小
	- 令 $C[i]=abs(B[i+1]-B[i])$ 得到序列 C，那么问题等价于从 C 中选若干个不相邻的项，其和最小
- 这个问题可以用反悔贪心解决，类似问题 [1388. 3n 块披萨](https://leetcode.cn/problems/pizza-with-3n-slices/description/) 的 [双向链表贪心算法，时间复杂度O(nlogn)](https://leetcode.cn/problems/pizza-with-3n-slices/solutions/163281/shuang-xiang-lian-biao-tan-xin-suan-fa-shi-jian-fu/)
	- 简单的写法是每次选最小的 C[i]，将 C[i-1:i+2] 替换为 C[i-1]+C[i+1]-C[i]
	- 为了方便，C 首尾加一个 inf 的哨兵，就不用特殊处理首尾


```Python []
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        A = [inf]+[c for c,_ in groupby(prices)]+[-inf]
        B = []
        for i in range(1,len(A)-1):
            if (A[i]<min(A[i-1],A[i+1])) or (A[i]>max(A[i-1],A[i+1])):
                B.append(A[i])
        s = sum(B[i+1]-B[i] for i in range(0,len(B),2))
        C = [inf]+[abs(a-b) for a,b in pairwise(B)]+[inf]
        for _ in range(len(B)//2-k):
            i = C.index(min(C))
            s -= C[i]
            x = C[i-1]+C[i+1]-C[i]
            C[i-1:i+2] = [x]
        return s
```

$O(N^2)$，7 ms

### #3 堆+双向链表优化

- 还可以参照 [双向链表贪心算法，时间复杂度O(nlogn)](https://leetcode.cn/problems/pizza-with-3n-slices/solutions/163281/shuang-xiang-lian-biao-tan-xin-suan-fa-shi-jian-fu/) 的写法，用堆+双向链表优化
- python 可以用数组 L 和 R 模拟双向链表

## 解答

```python []
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        A = [inf]+[c for c,_ in groupby(prices)]+[-inf]
        B = []
        for i in range(1,len(A)-1):
            if (A[i]<min(A[i-1],A[i+1])) or (A[i]>max(A[i-1],A[i+1])):
                B.append(A[i])
        s = sum(B[i+1]-B[i] for i in range(0,len(B),2))
        C = [inf]+[abs(a-b) for a,b in pairwise(B)]+[inf]
        n = len(C)
        L = [n-1]+list(range(n-1))
        R = list(range(1,n))+[0]
        pq = sorted((x,i) for i,x in enumerate(C))
        vis = [0]*n
        for _ in range(len(B)//2-k):
            while vis[pq[0][1]]:
                heappop(pq)
            x,i = heappop(pq)
            s -= x
            a,b = L[i],R[i]
            vis[a] = vis[b] = 1
            l,r = L[a],R[b]
            L[i],R[i] = l,r
            R[l] = L[r] = i
            C[i] = C[a]+C[b]-x
            heappush(pq,(C[i],i))
        return s
```

$O(N*logN)$，3 ms

## *附加

还可以用 wqs 二分
- 注意上述的贪心过程中每轮选的最小的 C[i]，故添加的新值 C[i-1]+C[i+1]-C[i]>=C[i]，因此每轮选的值是递增的
- 因此符合 wqs 二分的条件
- wqs 二分详见 [一种基于 wqs 二分的优秀做法](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/solutions/536396/yi-chong-ji-yu-wqs-er-fen-de-you-xiu-zuo-x36r/)

```python []
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        def cal(x):                 # 选一个的额外代价是x时，最大收益s及对应最小次数c
            f,g = (-inf,0),(0,0)
            for a in A:
                f,g = max(f,(g[0]-a-x,g[1]-1)),max(g,(f[0]+a,f[1]))
            return g[0],-g[1]

        A = [c for c,_ in groupby(prices)]
        l, r = 0, max(A)
        res = 0
        while l<=r:
            mid = (l+r)//2
            s,c = cal(mid)
            if c<=k:
                res = s+k*mid
                r = mid-1
            else:
                l = mid+1
        return res
```
$O(N*logM)$，0 ms

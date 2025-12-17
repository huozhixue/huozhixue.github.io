# 3573：买卖股票的最佳时机 V（1777 分）


> <u>**[力扣第 158 场双周赛第 2 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-v/)**</u>

## 题目

<p>给你一个整数数组 <code>prices</code>，其中 <code>prices[i]</code> 是第 <code>i</code> 天股票的价格（美元），以及一个整数 <code>k</code>。</p>

<p>你最多可以进行 <code>k</code> 笔交易，每笔交易可以是以下任一类型：</p>

<ul>
<li>
<p><strong>普通交易</strong>：在第 <code>i</code> 天买入，然后在之后的第 <code>j</code> 天卖出，其中 <code>i &lt; j</code>。你的利润是 <code>prices[j] - prices[i]</code>。</p>
</li>
<li>
<p><strong>做空交易</strong>：在第 <code>i</code> 天卖出，然后在之后的第 <code>j</code> 天买回，其中 <code>i &lt; j</code>。你的利润是 <code>prices[i] - prices[j]</code>。</p>
</li>
</ul>

<p><strong>注意</strong>：你必须在开始下一笔交易之前完成当前交易。此外，你不能在已经进行买入或卖出操作的同一天再次进行买入或卖出操作。</p>

<p>通过进行 <strong>最多</strong> <code>k</code> 笔交易，返回你可以获得的最大总利润。</p>



<p><strong class="example">示例 1:</strong></p>

<div class="example-block">
<p><strong>输入:</strong> <span class="example-io">prices = [1,7,9,8,2], k = 2</span></p>

<p><strong>输出:</strong> <span class="example-io">14</span></p>

<p><strong>解释:</strong></p>
我们可以通过 2 笔交易获得 14 美元的利润：

<ul>
<li>一笔普通交易：第 0 天以 1 美元买入，第 2 天以 9 美元卖出。</li>
<li>一笔做空交易：第 3 天以 8 美元卖出，第 4 天以 2 美元买回。</li>
</ul>
</div>

<p><strong class="example">示例 2:</strong></p>

<div class="example-block">
<p><strong>输入:</strong> <span class="example-io">prices = [12,16,19,19,8,1,19,13,9], k = 3</span></p>

<p><strong>输出:</strong> <span class="example-io">36</span></p>

<p><strong>解释:</strong></p>
我们可以通过 3 笔交易获得 36 美元的利润：

<ul>
<li>一笔普通交易：第 0 天以 12 美元买入，第 2 天以 19 美元卖出。</li>
<li>一笔做空交易：第 3 天以 19 美元卖出，第 4 天以 8 美元买回。</li>
<li>一笔普通交易：第 5 天以 1 美元买入，第 6 天以 19 美元卖出。</li>
</ul>
</div>



<p><strong>提示:</strong></p>

<ul>
<li><code>2 &lt;= prices.length &lt;= 10<sup>3</sup></code></li>
<li><code>1 &lt;= prices[i] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= k &lt;= prices.length / 2</code></li>
</ul>


**相似问题：**
- [0121：买卖股票的最佳时机](/leetcode/0121)


## 分析

### #1

- 类似 {{< lc "0188" >}}，只是多了个卖出状态

```python []
class Solution:
    def maximumProfit(self, prices: List[int], k: int) -> int:
        f = [[0,-inf,-inf] for _ in range(k+1)]
        for x in prices:
            for i in range(k,-1,-1):
                f[i][1] = max(f[i][1],f[i][0]-x)
                f[i][2] = max(f[i][2],f[i][0]+x)
                if i:
                    f[i][0] = max(f[i][0],f[i-1][1]+x,f[i-1][2]-x)
        return f[-1][0]
```
1691 ms

### #2

- 类似的，也可以用 wqs 二分优化
## 解答

```python []
class Solution:
    def maximumProfit(self, prices: List[int], k: int) -> int:
        def cal(x):                 # 选一个的额外代价是x时，最大收益s及对应最小次数c
            f,g,h = (0,0),(-inf,0),(-inf,0)
            for a in prices:
                f,g,h = max(f,(g[0]+a-x,g[1]-1),(h[0]-a-x,h[1]-1)),max(g,(f[0]-a,f[1])),max(h,(f[0]+a,f[1]))
            return f[0],-f[1]

        l, r = 0, max(prices)
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
499 ms

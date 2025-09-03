# 2969：购买水果需要的最少金币数 II（★★）


> <u>**[力扣第 2969 题](https://leetcode.cn/problems/minimum-number-of-coins-for-fruits-ii/)**</u>

## 题目

<p>你在一个水果超市里，货架上摆满了玲琅满目的奇珍异果。</p>

<p>给你一个 <b>下标从 1 开始</b> 的数组 <code>prices</code>，其中 <code>prices[i]</code> 表示你购买第 <code>i</code> 个水果所需的硬币数量。</p>

<p>水果市场有以下优惠活动：</p>

<ul>
<li>如果你用 <code>prices[i]</code> 个硬币购买第 <code>i</code> 个水果， 那么接下来的 i 个水果你都可以免费获得。</li>
</ul>

<p><strong>请注意</strong> 即使你 <strong>可以</strong> 免费获得第 <code>j</code> 个水果，你仍然可以用 <code>prices[j]</code> 个硬币来购买它，以获取新的优惠。</p>

<p>返回 <em>获得所有水果所需的 <strong>最小</strong> 硬币数量。</em></p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>prices = [3,1,2]
<strong>输出：</strong>4
<strong>解释：</strong>你可以按以下方式获取水果：
- 用3个硬币购买第1个水果，并且可以免费获得第2个水果。
- 用1个硬币购买第2个水果，并且可以免费获得第3个水果。
- 免费获得第三个水果。
请注意，即使你可以免费获得第2个水果，你还是购买了它，因为这是更优的选择。
可以证明4是获取所有水果所需的最小硬币数量。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
输入：prices = [1,10,1,1]
输出：2
解释：你可以按以下方式获取水果：
- 用1个硬币购买第1个水果，并且可以免费获得第2个水果。
- 免费获得第2个水果。
- 用1个硬币购买第3个水果，并且可以免费获得第4个水果。
- 免费获得第4个水果。
可以证明2是获取所有水果所需的最小硬币数量。
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>1 &lt;= prices.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= prices[i] &lt;= 10<sup>5</sup></code></li>
</ul>




## 分析

- 令 f[i] 代表购买第 `i` 个水果，能获得后面所有水果的最小硬币数
- 显然 f[i]=prices[i]+min(f[i+1:i*2+3])
- 区间最小值可以用单调队列维护，即可递推

## 解答


```python
class Solution:
    def minimumCoins(self, prices: List[int]) -> int:
        A = prices
        n = len(A)
        f = [inf]*n+[0]
        dq = deque([n])
        for i in range(n-1,0-1,-1):
            while i*2+2<dq[0]:
                dq.popleft()
            f[i] = A[i]+f[dq[0]]
            while dq and f[dq[-1]]>=f[i]:
                dq.pop()
            dq.append(i)
        return f[0]
```
175 ms

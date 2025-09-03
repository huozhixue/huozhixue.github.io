# 2921：价格递增的最大利润三元组 II（★★）


> <u>**[力扣第 2921 题](https://leetcode.cn/problems/maximum-profitable-triplets-with-increasing-prices-ii/)**</u>

## 题目

<p>给定长度为 <code>n</code>  的数组 <code>prices</code> 和 <code>profits</code> （<strong>下标从 0 开始</strong>）。一个商店有 <code>n</code> 个商品，第 <code>i</code> 个商品的价格为 <code>prices[i]</code>，利润为 <code>profits[i]</code>。</p>

<p>需要选择三个商品，满足以下条件：</p>

<ul>
<li><code>prices[i] &lt; prices[j] &lt; prices[k]</code>，其中 <code>i &lt; j &lt; k</code>。</li>
</ul>

<p>如果选择的商品 <code>i</code>, <code>j</code> 和 <code>k</code> 满足以下条件，那么利润将等于 <code>profits[i] + profits[j] + profits[k]</code>。</p>

<p>返回能够获得的<em> <strong>最大利润</strong>，如果不可能满足给定条件，</em>返回<em> </em><code>-1</code><em>。</em></p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>prices = [10,2,3,4], profits = [100,2,7,10]
<b>输出：</b>19
<b>解释：</b>不能选择下标 i=0 的商品，因为没有下标 j 和 k 的商品满足条件。
只能选择下标为 1、2、3 的三个商品，这是有效的选择，因为 prices[1] &lt; prices[2] &lt; prices[3]。
答案是它们的利润之和，即 2 + 7 + 10 = 19。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>prices = [1,2,3,4,5], profits = [1,5,3,4,6]
<b>输出：</b>15
<b>解释：</b>可以选择任意三个商品，因为对于每组满足下标为 i &lt; j &lt; k 的三个商品，条件都成立。
因此，能得到的最大利润就是利润和最大的三个商品，即下标为 1，3 和 4 的商品。
答案就是它们的利润之和，即 5 + 4 + 6 = 15。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<b>输入：</b>prices = [4,3,2,1], profits = [33,20,19,87]
<b>输出：</b>-1
<b>解释：</b>找不到任何可以满足条件的三个商品，所以返回 -1.
</pre>



<p><b>提示：</b></p>

<ul>
<li><code>3 &lt;= prices.length == profits.length &lt;= 50000</code></li>
<li><code>1 &lt;= prices[i] &lt;= 5000</code></li>
<li><code>1 &lt;= profits[i] &lt;= 10<sup>6</sup></code></li>
</ul>



## 分析


### #1 树状数组

- 令 f2、f3 分别代表递增二元组、三元组的最大利润
- 显然递推 f2[i]，要找 j 满足 prices[j]<prices[i] 且 profits[j] 最大，这可以用树状数组维护
- 递推 f3[i] 同理，要找 j 满足 prices[j]<prices[i] 且 f2[j] 最大
- 令 f1 为 profits，其实就是两次相同的递推

```python
class Solution:
    def maxProfit(self, prices: List[int], profits: List[int]) -> int:
        def update(i, x):
            while i<m:
                t[i] = max(t[i],x)
                i += i&-i

        def get(i):
            res = -inf
            while i:
                res = max(res,t[i])
                i &= i-1
            return res

        n = len(prices)
        m = max(prices)+1
        f = profits[:]
        for _ in range(2):
            t = [-inf]*m
            g = [-inf]*n
            for i,a in enumerate(prices):
                g[i] = profits[i]+get(a-1)
                update(a,f[i])
            f = g
        return max(-1,max(f))
```
1684 ms

### #2 有序集合

- 注意到假如 prices[i]<=prices[j] 且 f[i]>=f[j]，那么 j 可以去掉
- 因此用有序集合维护 <prices[i],f[i]>，有用的状态必然是递增的
- 那么要找 j 满足 prices[j]<prices[i] 且 f[j] 最大，二分查找有序集合中最后一个<prices[i] 的 j 即可
- 然后插入 i 时
	- f[j]<f[i] 时，才需要插入
	- 插入时，要去除后面的无效状态
## 解答

```python
class Solution:
    def maxProfit(self, prices: List[int], profits: List[int]) -> int:
        from sortedcontainers import SortedList
        n = len(prices)
        f = profits[:]
        for _ in range(2):
            g = [-inf]*n
            sl = SortedList([(0,-inf)])
            for i,a in enumerate(prices):
                j = sl.bisect_left((a,))
                g[i] = profits[i]+sl[j-1][1]
                if sl[j-1][1]<f[i]:
                    while j<len(sl) and f[i]>=sl[j][1]:
                        sl.pop(j)
                    sl.add((a,f[i]))
            f = g
        return max(-1,max(f))
```
851 ms


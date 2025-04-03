# 1359：有效的快递序列数目（1722 分）


> <u>**[力扣第 20 场双周赛第 4 题](https://leetcode.cn/problems/count-all-valid-pickup-and-delivery-options/)**</u>

## 题目

<p>给你 <code>n</code> 笔订单，每笔订单都需要快递服务。</p>

<p>计算所有有效的 取货 / 交付 可能的顺序，使 delivery(i) 总是在 pickup(i) 之后。</p>

<p>由于答案可能很大，请返回答案对 10^9 + 7 取余的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>1
<strong>解释：</strong>只有一种序列 (P1, D1)，物品 1 的配送服务（D1）在物品 1 的收件服务（P1）后。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>6
<strong>解释：</strong>所有可能的序列包括：
(P1,P2,D1,D2)，(P1,P2,D2,D1)，(P1,D1,P2,D2)，(P2,P1,D1,D2)，(P2,P1,D2,D1) 和 (P2,D2,P1,D1)。
(P1,D2,P2,D1) 是一个无效的序列，因为物品 2 的收件服务（P2）不应在物品 2 的配送服务（D2）之后。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>90
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 500</code></li>
</ul>




## 分析

- 可以递推，第 n 对即是在前 2*(n-1) 个物品的间隔插入两个，根据隔板法，即是 comb(2*n,2)
- 也可以直接先计算所有排列 2n!，再去掉不合法的
	- 每一对的顺序固定，都多乘了 2
	- 因此除以 2^n 即可

## 解答


```python
class Solution:
    def countOrders(self, n: int) -> int:
        res, mod = 1, 10**9+7
        for i in range(2,n+1):
            res = res*comb(2*i,2)%mod
        return res
```
0 ms

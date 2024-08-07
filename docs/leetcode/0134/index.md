# 0134：加油站（★）


> <u>**[力扣第 134 题](https://leetcode.cn/problems/gas-station/)**</u>

## 题目

<p>在一条环路上有 <code>n</code> 个加油站，其中第 <code>i</code> 个加油站有汽油 <code>gas[i]</code><em> </em>升。</p>

<p>你有一辆油箱容量无限的的汽车，从第<em> </em><code>i</code><em> </em>个加油站开往第<em> </em><code>i+1</code><em> </em>个加油站需要消耗汽油 <code>cost[i]</code><em> </em>升。你从其中的一个加油站出发，开始时油箱为空。</p>

<p>给定两个整数数组 <code>gas</code> 和 <code>cost</code> ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 <code>-1</code> 。如果存在解，则 <strong>保证</strong> 它是 <strong>唯一</strong> 的。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> gas = [1,2,3,4,5], cost = [3,4,5,1,2]
<strong>输出:</strong> 3
<strong>解释:
</strong>从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
因此，3 可为起始索引。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> gas = [2,3,4], cost = [3,4,3]
<strong>输出:</strong> -1
<strong>解释:
</strong>你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
因此，无论怎样，你都不可能绕环路行驶一周。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>gas.length == n</code></li>
<li><code>cost.length == n</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= gas[i], cost[i] &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [2202：K 次操作后最大化顶端元素（1716 分）](/leetcode/2202)


## 分析

- 将 gas 和 cost 逐项相减得到数组 A，代表经过每段路的汽油变化
- 问题等价于在 A+A 中找长度 len(A) 的子数组，其前缀和都非负
- 算出 A+A 的前缀和数组 pre，问题等价于在 pre 中找长度 len(A)+1 的子数组，其首位是最小元素
- 容易想到直接找 pre 前半部分的最小位置 i 作为首位
	- 注意 pre 的后半部分其实就是前半部分的元素分别加上 sum(A)
	- 如果 sum(A)<0，则 pre[i+len(A)]<pre[i]，没有满足要求的 i
	- 如果 sum(A)>=0， i 即为所求

## 解答

```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        A = [g-c for g,c in zip(gas,cost)]
        P = list(accumulate([0]+A))
        return -1 if P[-1]<0 else P.index(min(P))
```
95 ms

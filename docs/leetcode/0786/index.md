# 0786：第 K 个最小的质数分数（2168 分）


> <u>**[力扣第 786 题](https://leetcode.cn/problems/k-th-smallest-prime-fraction/)**</u>

## 题目

<p>给你一个按递增顺序排序的数组 <code>arr</code> 和一个整数 <code>k</code> 。数组 <code>arr</code> 由 <code>1</code> 和若干 <strong>质数</strong> 组成，且其中所有整数互不相同。</p>

<p>对于每对满足 <code>0 &lt;= i &lt; j &lt; arr.length</code> 的 <code>i</code> 和 <code>j</code> ，可以得到分数 <code>arr[i] / arr[j]</code> 。</p>

<p>那么第 <code>k</code> 个最小的分数是多少呢?  以长度为 <code>2</code> 的整数数组返回你的答案, 这里 <code>answer[0] == arr[i]</code> 且 <code>answer[1] == arr[j]</code> 。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,2,3,5], k = 3
<strong>输出：</strong>[2,5]
<strong>解释：</strong>已构造好的分数,排序后如下所示:
1/5, 1/3, 2/5, 1/2, 3/5, 2/3
很明显第三个最小的分数是 2/5
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>arr = [1,7], k = 1
<strong>输出：</strong>[1,7]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= arr.length &lt;= 1000</code></li>
<li><code>1 &lt;= arr[i] &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>arr[0] == 1</code></li>
<li><code>arr[i]</code> 是一个 <strong>质数</strong> ，<code>i &gt; 0</code></li>
<li><code>arr</code> 中的所有数字 <strong>互不相同</strong> ，且按 <strong>严格递增</strong> 排序</li>
<li><code>1 &lt;= k &lt;= arr.length * (arr.length - 1) / 2</code></li>
</ul>



<p><strong>进阶：</strong>你可以设计并实现时间复杂度小于 <code>O(n<sup>2</sup>)</code> 的算法解决此问题吗？</p>


**相似问题：**
- [0378：有序矩阵中第 K 小的元素](/leetcode/0378)
- [0668：乘法表中第k小的数](/leetcode/0668)
- [0719：找出第 K 小的数对距离](/leetcode/0719)


## 分析

### #1

显然固定 i，分数随 j 增大而递减。所以按 i 将分数分为 n-1 个列表，反向归并排序取第 k 项即可。
类似 {{< lc "0378" >}}。

```python
def kthSmallestPrimeFraction(self, arr: List[int], k: int) -> List[int]:
	n = len(arr)
	pq = [(arr[i]/arr[-1], i, n-1) for i in range(min(n-1, k))]
	for _ in range(k-1):
		_, i, j = heappop(pq)
		if j-1 > i:
			heappush(pq, (arr[i]/arr[j-1], i, j-1))
	return [arr[pq[0][1]], arr[pq[0][2]]]
```

940 ms


### #2

类似 {{< lc "0378" >}}，也可以用二分查找。

## 解答

```python

```





# 2584：分割数组使乘积互质（2159 分）


> <u>**[力扣第 335 场周赛第 3 题](https://leetcode.cn/problems/split-the-array-to-make-coprime-products/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的整数数组 <code>nums</code> ，下标从 <strong>0</strong> 开始。</p>

<p>如果在下标 <code>i</code> 处 <strong>分割</strong> 数组，其中 <code>0 &lt;= i &lt;= n - 2</code> ，使前 <code>i + 1</code> 个元素的乘积和剩余元素的乘积互质，则认为该分割 <strong>有效</strong> 。</p>

<ul>
<li>例如，如果 <code>nums = [2, 3, 3]</code> ，那么在下标 <code>i = 0</code> 处的分割有效，因为 <code>2</code> 和 <code>9</code> 互质，而在下标 <code>i = 1</code> 处的分割无效，因为 <code>6</code> 和 <code>3</code> 不互质。在下标 <code>i = 2</code> 处的分割也无效，因为 <code>i == n - 1</code> 。</li>
</ul>

<p>返回可以有效分割数组的最小下标 <code>i</code> ，如果不存在有效分割，则返回 <code>-1</code> 。</p>

<p>当且仅当 <code>gcd(val1, val2) == 1</code> 成立时，<code>val1</code> 和 <code>val2</code> 这两个值才是互质的，其中 <code>gcd(val1, val2)</code> 表示 <code>val1</code> 和 <code>val2</code> 的最大公约数。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/12/14/second.PNG" style="width: 450px; height: 211px;" /></p>

<pre>
<strong>输入：</strong>nums = [4,7,8,15,3,5]
<strong>输出：</strong>2
<strong>解释：</strong>上表展示了每个下标 i 处的前 i + 1 个元素的乘积、剩余元素的乘积和它们的最大公约数的值。
唯一一个有效分割位于下标 2 。</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2022/12/14/capture.PNG" style="width: 450px; height: 215px;" /></p>

<pre>
<strong>输入：</strong>nums = [4,7,15,8,3,5]
<strong>输出：</strong>-1
<strong>解释：</strong>上表展示了每个下标 i 处的前 i + 1 个元素的乘积、剩余元素的乘积和它们的最大公约数的值。
不存在有效分割。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums.length</code></li>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
</ul>


## 分析

先考虑 nums[0]：
- 对于 nums[0] 的某个因数 p，如果 nums[j] 也有因数 p，那么分割点必须在 j 之后
- 找出 nums[0] 所有因数存在的最靠后的下标 r
- 假如 r==0，那么分割点即是 0
- 否则，[0,r] 必须分割到一起，要继续遍历

接着考虑 nums[1]：
- 同理，找出所有因数存在的最靠后的下标 r2，更新 r=max(r,r2)
- 如果 r==1，分割点即是 1。否则，继续遍历 

因此，找出 nums 每个元素的素因数，并得到每个素因数存在的最靠后的下标，即可遍历解决。


## 解答


```python
def findValidSplit(self, nums: List[int]) -> int:
	@cache
	def factor(x):
		vis = set()
		for p in chain([2],range(3,isqrt(x)+1,2)):
			if x%p==0:
				vis.add(p)
				while x%p==0:
					x //= p
		if x>1:
			vis.add(x)
		return vis

	d, n = {}, len(nums)
	for i in range(n):
		for p in factor(nums[i]):
			d[p] = i
	r = 0
	for i in range(n-1):
		for p in factor(nums[i]):
			r = max(r,d[p])
		if r==i:
			return i
	return -1
```
936 ms

## *附加

还可以借助埃氏筛法先获得数据范围内的质数列表，加快元素的质因数分解。

```python
def findValidSplit(self, nums: List[int]) -> int:
	def get_primes(M):
		f = [1]*M
		for i in range(2,isqrt(M)+1):
			if f[i]:
				f[i*i:M:i] = [0] * ((M-1-i*i)//i+1)
		return [i for i in range(2,M) if f[i]]

	@cache
	def factor(x):
		vis = set()
		for p in primes:
			if x%p==0:
				vis.add(p)
				while x%p==0:
					x //= p
		if x>1:
			vis.add(x)
		return vis

	primes = get_primes(isqrt(max(nums))+1)
	d, n = {}, len(nums)
	for i in range(n):
		for p in factor(nums[i]):
			d[p] = i
	r = 0
	for i in range(n-1):
		for p in factor(nums[i]):
			r = max(r,d[p])
		if r==i:
			return i
	return -1
```
396 ms

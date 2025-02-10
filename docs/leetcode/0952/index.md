# 0952：按公因数计算最大组件大小（2272 分）


> <u>**[力扣第 113 场周赛第 4 题](https://leetcode.cn/problems/largest-component-size-by-common-factor/)**</u>

## 题目

<p>给定一个由不同正整数的组成的非空数组 <code>nums</code> ，考虑下面的图：</p>

<ul>
<li>有 <code>nums.length</code> 个节点，按从 <code>nums[0]</code> 到 <code>nums[nums.length - 1]</code> 标记；</li>
<li>只有当 <code>nums[i]</code> 和 <code>nums[j]</code> 共用一个大于 1 的公因数时，<code>nums[i]</code> 和 <code>nums[j]</code>之间才有一条边。</li>
</ul>

<p>返回 <em>图中最大连通组件的大小</em> 。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/12/01/ex1.png" style="height: 97px; width: 500px;" /></p>

<pre>
<strong>输入：</strong>nums = [4,6,15,35]
<strong>输出：</strong>4
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/12/01/ex2.png" style="height: 85px; width: 500px;" /></p>

<pre>
<strong>输入：</strong>nums = [20,50,9,63]
<strong>输出：</strong>2
</pre>

<p><strong>示例 3：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/12/01/ex3.png" style="height: 260px; width: 500px;" /></p>

<pre>
<strong>输入：</strong>nums = [2,3,6,7,4,12,21,39]
<strong>输出：</strong>8
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>5</sup></code></li>
<li><code>nums</code> 中所有值都 <strong>不同</strong></li>
</ul>


**相似问题：**
- [2157：字符串分组（2499 分）](/leetcode/2157)
- [2521：数组乘积中的不同质因数数目（1413 分）](/leetcode/2521)


## 分析

### #1

- 典型的并查集，问题在于不能二重遍历
- 可以考虑直接遍历公因数 x，遍历 x 的倍数 y，如果 y 在 nums 中，就和 x 相连
- 这样总时间是调和级数，趋于 O(n logn)
```python
class Solution:
    def largestComponentSize(self, nums: List[int]) -> int:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x,y):
            f[find(x)] = find(y)

        ma = max(nums)+1
        f = list(range(ma))
        vis = set(nums)
        for x in range(2,ma):
            for y in range(x,ma,x):
                if y in vis:
                    union(x,y)
        return max(Counter(find(x) for x in nums).values())
```
2122 ms

### #2

- 还可以只枚举质数作为公因数 p
- 质数可以用埃氏筛预处理

## 解答


```python
M = 10**5+1
f = [1]*M
for i in range(2,isqrt(M)+1):
    if f[i]:
        f[i*i:M:i] = [0] * ((M-1-i*i)//i+1)
primes = [i for i in range(2,M) if f[i]]

class Solution:
    def largestComponentSize(self, nums: List[int]) -> int:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x,y):
            f[find(x)] = find(y)

        ma = max(nums)+1
        f = list(range(ma))
        vis = set(nums)
        for x in primes:
            if x>ma:
                break
            for y in range(x,ma,x):
                if y in vis:
                    union(x,y)
        return max(Counter(find(x) for x in nums).values())
```
608 ms

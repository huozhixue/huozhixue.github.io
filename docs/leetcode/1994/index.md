# 1994：好子集的数目（★★★）


> <u>**[力扣第 60 场双周赛第 4 题](https://leetcode.cn/problems/the-number-of-good-subsets/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 。如果 <code>nums</code> 的一个子集中，所有元素的乘积可以表示为一个或多个 <strong>互不相同的质数</strong> 的乘积，那么我们称它为 <strong>好子集</strong> 。</p>

<ul>
<li>比方说，如果 <code>nums = [1, 2, 3, 4]</code> ：

<ul>
<li><code>[2, 3]</code> ，<code>[1, 2, 3]</code> 和 <code>[1, 3]</code> 是 <strong>好</strong> 子集，乘积分别为 <code>6 = 2*3</code> ，<code>6 = 2*3</code> 和 <code>3 = 3</code> 。</li>
<li><code>[1, 4]</code> 和 <code>[4]</code> 不是 <strong>好</strong> 子集，因为乘积分别为 <code>4 = 2*2</code> 和 <code>4 = 2*2</code> 。</li>
</ul>
</li>
</ul>

<p>请你返回 <code>nums</code> 中不同的 <strong>好</strong> 子集的数目对<em> </em><code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>

<p><code>nums</code> 中的 <strong>子集</strong> 是通过删除 <code>nums</code> 中一些（可能一个都不删除，也可能全部都删除）元素后剩余元素组成的数组。如果两个子集删除的下标不同，那么它们被视为不同的子集。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [1,2,3,4]
<b>输出：</b>6
<b>解释：</b>好子集为：
- [1,2]：乘积为 2 ，可以表示为质数 2 的乘积。
- [1,2,3]：乘积为 6 ，可以表示为互不相同的质数 2 和 3 的乘积。
- [1,3]：乘积为 3 ，可以表示为质数 3 的乘积。
- [2]：乘积为 2 ，可以表示为质数 2 的乘积。
- [2,3]：乘积为 6 ，可以表示为互不相同的质数 2 和 3 的乘积。
- [3]：乘积为 3 ，可以表示为质数 3 的乘积。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [4,2,3,15]
<b>输出：</b>5
<b>解释：</b>好子集为：
- [2]：乘积为 2 ，可以表示为质数 2 的乘积。
- [2,3]：乘积为 6 ，可以表示为互不相同质数 2 和 3 的乘积。
- [2,15]：乘积为 30 ，可以表示为互不相同质数 2，3 和 5 的乘积。
- [3]：乘积为 3 ，可以表示为质数 3 的乘积。
- [15]：乘积为 15 ，可以表示为互不相同质数 3 和 5 的乘积。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 30</code></li>
</ul>


## 分析

注意到取值范围非常小，可以列举出能作为好子集元素的数的集合： 
A = [1, 2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30]。

令 dp[i] 代表 nums 中 A[:i] 范围内的数能组成的 {好子集的乘积: 对应的个数} 哈希表。
为了方便，先将 1 组成的集合和空集也看作好子集。发现可以递推：

    dp[i+1] = dp[i].copy()
    for x in dp[i]:
        if gcd(x, A[i]) == 1:
            dp[i+1][x*A[i]] += Counter(nums)[A[i]] * dp[i][x]

递推得到 dp[-1] 后，所有个数求和并将 1 组成的集合和空集减去即可。

> 具体实现时，可以将 dp 优化为 1 个哈希表。

## 解答

```python
def numberOfGoodSubsets(self, nums: List[int]) -> int:
    ct, mod = Counter(nums), 10**9+7
    d = defaultdict(int)
    d[1] = (1 << ct[1]) % mod
    for num in [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30]:
        for x in list(d):
            if math.gcd(num, x) == 1:
                d[num*x] += ct[num]*d[x]
                d[num*x] %= mod
    return (sum(d.values())-d[1]) % mod
```
188 ms


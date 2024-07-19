# 0300：最长递增子序列（★）


> <u>**[力扣第 300 题](https://leetcode.cn/problems/longest-increasing-subsequence/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> ，找到其中最长严格递增子序列的长度。</p>

<p><strong>子序列 </strong>是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，<code>[3,6,2,7]</code> 是数组 <code>[0,3,1,6,2,2,7]</code> 的<span data-keyword="subsequence-array">子序列</span>。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [10,9,2,5,3,7,101,18]
<strong>输出：</strong>4
<strong>解释：</strong>最长递增子序列是 [2,3,7,101]，因此长度为 4 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1,0,3,2,3]
<strong>输出：</strong>4
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [7,7,7,7,7,7,7]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 2500</code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>



<p><b>进阶：</b></p>

<ul>
<li>你能将算法的时间复杂度降低到 <code>O(n log(n))</code> 吗?</li>
</ul>


**相似问题：**
- [0334：递增的三元子序列](/leetcode/0334)
- [0354：俄罗斯套娃信封问题](/leetcode/0354)
- [0646：最长数对链](/leetcode/0646)
- [0673：最长递增子序列的个数](/leetcode/0673)
- [0712：两个字符串的最小ASCII删除和](/leetcode/0712)
- [1671：得到山形数组的最少删除次数（1912 分）](/leetcode/1671)
- [1964：找出到每个位置为止最长的有效障碍赛跑路线（1933 分）](/leetcode/1964)
- [2111：使数组 K 递增的最少操作次数（1940 分）](/leetcode/2111)
- [2370：最长理想子序列（1834 分）](/leetcode/2370)
- [2355：你能拿走的最大图书数量](/leetcode/2355)
- [2407：最长递增子序列 II（2280 分）](/leetcode/2407)
- [3177：求出最长好子序列 II（2364 分）](/leetcode/3177)
- [3176：求出最长好子序列 I（1849 分）](/leetcode/3176)
- [3201：找出有效子序列的最大长度 I（1663 分）](/leetcode/3201)
- [3202：找出有效子序列的最大长度 II（1973 分）](/leetcode/3202)


## 分析

### #1 dp

按前一元素选哪个即可递推。

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        f = [1]*n
        for i in range(1,n):
            f[i] = 1+max([f[j] for j in range(i) if nums[j]<nums[i]],default=0)
        return max(f)
```
1000 ms

### #2 dp+树状数组

- 观察递推式，限制了一个维度 （nums[j]<nums[i]），求另一个维度（f[j]）最值
- 这种问题的一种常用方法是树状数组/线段树
- 将一个维度看作区间范围，维护区间内的最值即可
- 由于nums 元素可能为负，所以要归一处理后才能用树状数组


```python
class BIT:
    def __init__(self, n):
        self.n = n+1
        self.t = defaultdict(int)

    def update(self, i, x):
        i += 1
        while i<self.n:
            self.t[i] = max(self.t[i],x)
            i += i&(-i)

    def get(self, i):
        res, i = 0, i+1
        while i:
            res = max(res,self.t[i])
            i &= i-1
        return res

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        mi = min(nums)
        A = [x-mi for x in nums]
        tree = BIT(max(A))
        res = 0
        for x in A:
            f = 1+tree.get(x-1)
            tree.update(x,f)
            res = max(res,f)
        return res
```
101 ms

### #3 dp+有序集合

- 这种问题的另一种常用的方法是维护一种单调性
- 假如 num[j1]<=nums[j2] 且 f[j1]>=f[j2]，显然 j2 对之后的递推式来说是无用的，可以去掉
- 那么维护有用的 <x=nums[j],y=f[j]> 的有序集合，x 和 y 都是递增的
- 遍历到 nums[i] 时，在这个有序集合中二分查找最后一个满足 x<nums[i] 的元素 <x,y>，即得到 f[i]=1+y
- 然后将所有不符合单调性的元素 <x,y> 去掉即可，类似单调栈

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        from sortedcontainers import SortedList
        sl = SortedList()
        res = 0
        for x in nums:
            pos = sl.bisect_left((x,))
            f = 1+sl[pos-1][1] if pos else 1
            while pos<len(sl) and sl[pos][1]<=f:
                sl.pop(pos)
            sl.add((x,f))
            res = max(res,f)
        return res
```
92 ms

### #4 dp+单调数组

- f 的范围更方便处理，还可以考虑反过来，维护  <x=f[j],y=nums[j]> 的有序集合
- 遍历到 nums[i] 时，二分查找最后一个满足 y<nums[i] 的元素 <x,y>，得到 f[i]=1+x
- 然后将所有不符合单调性的元素 <x,y> 去掉
- 显然，这样的 k 最多一个，满足 x=f[i],y>=nums[i]
- 因此 f 可以直接用数组维护，将 f[i] 位置改为 nums[i] 即可

## 解答

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        A = []
        for x in nums:
            pos = bisect_left(A,x)
            A[pos:pos+1] = [x]
        return len(A)
```
37 ms


# 0307：区域和检索 - 数组可修改（★）


> <u>**[力扣第 307 题](https://leetcode.cn/problems/range-sum-query-mutable/)**</u>

## 题目

<p>给你一个数组 <code>nums</code> ，请你完成两类查询。</p>

<ol>
<li>其中一类查询要求 <strong>更新</strong> 数组 <code>nums</code> 下标对应的值</li>
<li>另一类查询要求返回数组 <code>nums</code> 中索引 <code>left</code> 和索引 <code>right</code> 之间（ <strong>包含 </strong>）的nums元素的 <strong>和</strong> ，其中 <code>left &lt;= right</code></li>
</ol>

<p>实现 <code>NumArray</code> 类：</p>

<ul>
<li><code>NumArray(int[] nums)</code> 用整数数组 <code>nums</code> 初始化对象</li>
<li><code>void update(int index, int val)</code> 将 <code>nums[index]</code> 的值 <strong>更新</strong> 为 <code>val</code></li>
<li><code>int sumRange(int left, int right)</code> 返回数组 <code>nums</code> 中索引 <code>left</code> 和索引 <code>right</code> 之间（ <strong>包含 </strong>）的nums元素的 <strong>和</strong> （即，<code>nums[left] + nums[left + 1], ..., nums[right]</code>）</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入</strong>：
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
<strong>输出</strong>：
[null, 9, null, 8]

<strong>解释</strong>：
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1,2,5]
numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-100 &lt;= nums[i] &lt;= 100</code></li>
<li><code>0 &lt;= index &lt; nums.length</code></li>
<li><code>-100 &lt;= val &lt;= 100</code></li>
<li><code>0 &lt;= left &lt;= right &lt; nums.length</code></li>
<li>调用 <code>update</code> 和 <code>sumRange</code> 方法次数不大于 <code>3 * 10<sup>4</sup></code> </li>
</ul>


## 分析

{{< lc "0303" >}} 升级版，单点更新+区间查询，可以用树状数组。

## 解答
```python
class BIT:
    def __init__(self, n):
        self.n = n+1
        self.t = [0]*(n+1)

    def update(self, i, x):
        i += 1
        while i<self.n:
            self.t[i] += x
            i += i&(-i)

    def get(self, i):
        res, i = 0, i+1
        while i:
            res += self.t[i]
            i &= i-1
        return res

class NumArray:

    def __init__(self, nums: List[int]):
        self.nums = nums
        self.tree = BIT(len(nums))
        for i,x in enumerate(nums):
            self.tree.update(i,x)

    def update(self, index: int, val: int) -> None:
        add = val-self.nums[index]
        self.nums[index] = val
        self.tree.update(index,add)

    def sumRange(self, left: int, right: int) -> int:
        return self.tree.get(right)-self.tree.get(left-1)
```
682 ms

## *附加

也可以用块状数组。


```python
class NumArray:

    def __init__(self, nums: List[int]):
        n = len(nums)
        w = isqrt(n)
        B = [0]*((n-1)//w+1)
        for i,x in enumerate(nums):
            B[i//w] += x
        self.nums =nums
        self.B = B
        self.w = w

    def update(self, index: int, val: int) -> None:
        add = val-self.nums[index]
        self.B[index//self.w] += add
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        A,w = self.nums,self.w
        i,j = left//w,right//w
        if i==j:
            return sum(A[left:right+1])
        return sum(A[left:(i+1)*w])+sum(A[j*w:right+1])+sum(self.B[i+1:j])
```
742 ms



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

{{< lc "0303" >}} 升级版，元素不固定了。

每次 sumRange 都挨个求和，显然会有大量不必要的运算。
有个想法是维护一些区间和，修改的数无关时就无需重新计算区间和。

这个想法也就是块状数组：
- 将数组分成大小 size 的块，并计算得到每一块的和
- update 时，更新该数所属的块的和即可
- sumRange 时，其中包含的完整的块的和无需再计算，只需计算两边的残块的和
- 完整的块最多有 n//size 个，残块的元素个数不超过 2*size 个 
- 因此，当 size 取 $\sqrt n$ 时，sumRange 时间是 $O(\sqrt n)$

## 解答

```python
class NumArray:

    def __init__(self, nums: List[int]):
        n = len(nums)
        self.size = int(sqrt(n))
        self.B = [0]*((n-1)//self.size+1)
        for i in range(n):
            self.B[i//self.size] += nums[i]
        self.nums = nums

    def update(self, index: int, val: int) -> None:
        self.B[index//self.size] += val-self.nums[index]
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        m, nums = self.size, self.nums
        l, r = left//m, right//m
        if l==r:
            return sum(nums[left:right+1])
        return sum(self.B[l+1:r])+sum(nums[left:(l+1)*m])+ sum(nums[r*m:right+1])
```
792 ms

## *附加

还有个专门针对 单点更新+区间查询 的算法——树状数组。更新和查询时间 O(logN)。


```python
class Fwk:
    def __init__(self, N):
        self.tree = [0] * (N + 1)

    def update(self, i, x):
        while i < len(self.tree):
            self.tree[i] += x
            i += i & (-i)

    def get(self, i):
        res = 0
        while i > 0:
            res += self.tree[i]
            i &= i-1
        return res

class NumArray:
    def __init__(self, nums: List[int]):
        self.nums = nums
        self.tree = Fwk(len(nums))
        for i,x in enumerate(nums):
            self.tree.update(i+1,x)

    def update(self, index: int, val: int) -> None:
        self.tree.update(index+1, val-self.nums[index])
        self.nums[index] = val

    def sumRange(self, left: int, right: int) -> int:
        return self.tree.get(right+1)-self.tree.get(left)
```
1116 ms 

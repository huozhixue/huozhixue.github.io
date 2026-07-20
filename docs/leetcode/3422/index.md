# 3422：将子数组元素变为相等所需的最小操作数（★）


> <u>**[力扣第 3422 题](https://leetcode.cn/problems/minimum-operations-to-make-subarray-elements-equal/)**</u>

## 题目

<p>给定一个整数数组 <code>nums</code> 和一个整数 <code>k</code>。你可以进行任意次以下操作：</p>

<ul>
<li>给 <code>nums</code> 的任何元素增加或减少 1。</li>
</ul>

<p>返回确保 <strong>至少</strong> 有一个大小为 <code>k</code> 的 <code>nums</code> 中的 <span data-keyword="subarray">子数组</span> 的所有元素都相等的所需的 <strong>最小</strong> 操作数。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [4,-3,2,1,-4,6], k = 3</span></p>

<p><span class="example-io"><b>输出：</b>5</span></p>

<p><strong>解释：</strong></p>

<ul>
<li>使用 4 次操作来给 <code>nums[1]</code> 增加 4。结果数组为 <span class="example-io"><code>[4, 1, 2, 1, -4, 6]</code>。</span></li>
<li><span class="example-io">使用 1 次操作来给 <code>nums[2]</code> 减少 1。结果数组为 <code>[4, 1, 1, 1, -4, 6]</code>。</span></li>
<li><span class="example-io">现在数组包含一个大小为 <code>k = 3</code> 的子数组 <code>[1, 1, 1]</code>，所有元素都想等。因此，答案为 5。</span></li>
</ul>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>nums = [-2,-2,3,1,4], k = 2</span></p>

<p><span class="example-io"><b>输出：</b>0</span></p>

<p><strong>解释：</strong></p>

<ul>
<li>
<p>大小为 <code>k = 2</code> 的子数组 <code>[-2, -2]</code> 已经包含了所有相等的元素，所以不需要操作。因此答案为 0。</p>
</li>
</ul>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>6</sup> &lt;= nums[i] &lt;= 10<sup>6</sup></code></li>
<li><code>2 &lt;= k &lt;= nums.length</code></li>
</ul>


**相似问题：**
- [0295：数据流的中位数](/leetcode/0295)
- [0462：最小操作次数使数组元素相等 II](/leetcode/0462)


## 分析

- 要维护滑动窗口中所有数到中位数的距离之和 s
- 可以用有序集合，添加删除时根据和中位数的关系维护 s 即可

## 解答

```python []
class SL:
    def __init__(self,):
        self.sl = SortedList()
        self.s = 0

    def cal(self,x):
        if not self.sl:
            return 0
        n = len(self.sl)
        l,r = self.sl[(n-1)//2],self.sl[n//2]
        return l-x if x<l else x-r if x>r else 0

    def add(self,x):
        self.s += self.cal(x)
        self.sl.add(x)
    
    def remove(self,x):
        self.sl.remove(x)
        self.s -= self.cal(x)

class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        sl = SL()
        res = inf
        for i,x in enumerate(nums):
            sl.add(x)
            if i>=k:
                sl.remove(nums[i-k])
            if i>=k-1:
                res = min(res,sl.s)
        return res
```
4062 ms




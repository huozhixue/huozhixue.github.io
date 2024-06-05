# 0220：存在重复元素 III（★★）


> <u>**[力扣第 220 题](https://leetcode.cn/problems/contains-duplicate-iii/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和两个整数 <code>indexDiff</code> 和 <code>valueDiff</code> 。</p>

<p>找出满足下述条件的下标对 <code>(i, j)</code>：</p>

<ul>
<li><code>i != j</code>,</li>
<li><code>abs(i - j) &lt;= indexDiff</code></li>
<li><code>abs(nums[i] - nums[j]) &lt;= valueDiff</code></li>
</ul>

<p>如果存在，返回 <code>true</code><em> ；</em>否则，返回<em> </em><code>false</code><em> </em>。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
<strong>输出：</strong>true
<strong>解释：</strong>可以找出 (i, j) = (0, 3) 。
满足下述 3 个条件：
i != j --&gt; 0 != 3
abs(i - j) &lt;= indexDiff --&gt; abs(0 - 3) &lt;= 3
abs(nums[i] - nums[j]) &lt;= valueDiff --&gt; abs(1 - 1) &lt;= 0
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
<strong>输出：</strong>false
<strong>解释：</strong>尝试所有可能的下标对 (i, j) ，均无法满足这 3 个条件，因此返回 false 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>1 &lt;= indexDiff &lt;= nums.length</code></li>
<li><code>0 &lt;= valueDiff &lt;= 10<sup>9</sup></code></li>
</ul>


## 分析

### #1

{{< lc "0219" >}} 升级版，要找的不是相同数而是一个范围内的数了
- 考虑维护窗口 [j-k, j-1] 有序，即可二分查找离 nums[j] 最近的数
- 有序窗口要进行插入、删除、查找操作，考虑用有序集合 SortedList 实现

```python
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        from sortedcontainers import SortedList
        sl = SortedList()
        for j,x in enumerate(nums):
            if j>indexDiff:
                sl.remove(nums[j-indexDiff-1])
            pos = sl.bisect_left(x)
            for y in sl[max(0,pos-1):pos+1]:
                if abs(x-y)<=valueDiff:
                    return True
            sl.add(x)
        return False
```
909 ms


### #2

还有个巧妙的桶排序方法。
- 桶的 size 设为 t+1，维护窗口 [j-k, j-1] 的桶状态。
- 符合条件的数和 nums[j] 要么在一个桶，要么在相邻桶
- 如果某个桶有两个元素，显然已经符合了
- 因此每轮最多与三个桶中的唯一元素比较，时间复杂度 O(N)
    
## 解答

```python
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        B,w = {}, valueDiff+1
        for j,x in enumerate(nums):
            if j>indexDiff:
                B.pop(nums[j-indexDiff-1]//w)
            key = x//w
            if any(abs(B.get(k,inf)-x)<=valueDiff for k in [key,key-1,key+1]):
                return True
            B[key] = x
        return False
```
363 ms



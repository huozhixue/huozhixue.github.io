# 0215：数组中的第K个最大元素（★）


> <u>**[力扣第 215 题](https://leetcode.cn/problems/kth-largest-element-in-an-array/)**</u>

## 题目

<p>给定整数数组 <code>nums</code> 和整数 <code>k</code>，请返回数组中第 <code><strong>k</strong></code> 个最大的元素。</p>

<p>请注意，你需要找的是数组排序后的第 <code>k</code> 个最大的元素，而不是第 <code>k</code> 个不同的元素。</p>

<p>你必须设计并实现时间复杂度为 <code>O(n)</code> 的算法解决此问题。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <code>[3,2,1,5,6,4],</code> k = 2
<strong>输出:</strong> 5
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> <code>[3,2,3,1,2,4,5,5,6], </code>k = 4
<strong>输出:</strong> 4</pre>



<p><strong>提示： </strong></p>

<ul>
<li><code>1 &lt;= k &lt;= nums.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

直接调用排序或者堆即可。

## 解答

```python
def findKthLargest(self, nums: List[int], k: int) -> int:
	return nlargest(k, nums)[-1]
```
32 ms

## *附加

借助快排的思想可以在 O(N) 时间内完成。
- 随机取一个数 pivot，按照快排的方法将 pivot 调整到位置 i，使得左边都 <=pivot，右边都 >=pivot。
- 假如 i == n-k ，    pivot 即为所求
- 假如 i < n-k  ，    转为求 nums[i+1:] 中第 k 大的数
- 假如 i > n-k  ，    转为求 nums[:i] 中第 k-(n-i) 大的数
- 每次只递归一边，时间复杂度 O(N)。

```python
def findKthLargest(self, nums: List[int], k: int) -> int:
    def quick(l, r, k):
        x = random.randint(l, r)
        nums[l], nums[x] = nums[x], nums[l]
        pivot, i, j = nums[l], l, r
        while i < j:
            while i < j and nums[j] >= pivot:
                j -= 1
            while i < j and nums[i] <= pivot:
                i += 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[l], nums[i] = nums[i], pivot
        if i == r-k+1:
            return pivot
        if i < r-k+1:
            return quick(i+1, r, k)
        return quick(l, i-1, k-(r+1-i))
    return quick(0, len(nums)-1, k)
```
20 ms

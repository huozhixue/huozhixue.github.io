# 0912：排序数组（★）


> <u>**[力扣第 912 题](https://leetcode.cn/problems/sort-an-array/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，请你将该数组升序排列。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,2,3,1]
<strong>输出：</strong>[1,2,3,5]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [5,1,1,2,0,0]
<strong>输出：</strong>[0,0,1,1,2,5]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>-5 * 10<sup>4</sup> &lt;= nums[i] &lt;= 5 * 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

最直接的当然是调库。

```python
def sortArray(self, nums: List[int]) -> List[int]:
    return sorted(nums)
```

48 ms

### #2

可以把经典的排序方法都试一下。
其中选择排序、冒泡排序、插入排序的时间复杂度 O(N^2)，会超时。

归并排序：

```python
def sortArray(self, nums: List[int]) -> List[int]:
    def merge(A, B):
        res, i, j = [], 0, 0
        while i < len(A) and j < len(B):
            if A[i] <= B[j]:
                res.append(A[i])
                i += 1
            else:
                res.append(B[j])
                j += 1
        return res + A[i:] + B[j:]

    n = len(nums)
    return nums if n < 2 else merge(self.sortArray(nums[:n//2]), self.sortArray(nums[n//2:]))
```

420 ms

快速排序：

```python
def sortArray(self, nums: List[int]) -> List[int]:
    def quick_sort(l, r):
        if l < r:
            k = random.randint(l, r)
            nums[l], nums[k] = nums[k], nums[l]
            pivot, i, j = nums[l], l, r
            while i < j:
                while i < j and nums[j] >= pivot:
                    j -= 1
                while i < j and nums[i] <= pivot:
                    i += 1
                nums[i], nums[j] = nums[j], nums[i]
            nums[l], nums[j] = nums[j], pivot
            quick_sort(l, i - 1)
            quick_sort(i + 1, r)

    quick_sort(0, len(nums) - 1)
    return nums
```

424 ms

堆排序：

```python
def sortArray(self, nums: List[int]) -> List[int]:
    def heapify(i, end):
        child = 2 * i + 1
        if child+1 < end and nums[child] < nums[child+1]:
            child += 1
        if child < end and nums[i] < nums[child]:
            nums[i], nums[child] = nums[child], nums[i]
            heapify(child, end)

    n = len(nums)
    for i in range(n, -1, -1):
        heapify(i, n)
    for end in range(n-1, 0, -1):
        nums[0], nums[end] = nums[end], nums[0]
        heapify(0, end)
    return nums
```

860 ms

### #3

本题的数据范围相对于数组长度来说不大，适合用计数排序。

## 解答

```python
def sortArray(self, nums: List[int]) -> List[int]:
    res, ct = [], Counter(nums)
    for val in range(min(ct), max(ct)+1):
        res.extend([val]*ct[val])
    return res
```

100 ms


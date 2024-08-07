# 0703：数据流中的第 K 大元素


> <u>**[力扣第 703 题](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)**</u>

## 题目

<p>设计一个找到数据流中第 <code>k</code> 大元素的类（class）。注意是排序后的第 <code>k</code> 大元素，不是第 <code>k</code> 个不同的元素。</p>

<p>请实现 <code>KthLargest</code> 类：</p>

<ul>
<li><code>KthLargest(int k, int[] nums)</code> 使用整数 <code>k</code> 和整数流 <code>nums</code> 初始化对象。</li>
<li><code>int add(int val)</code> 将 <code>val</code> 插入数据流 <code>nums</code> 后，返回当前数据流中第 <code>k</code> 大的元素。</li>
</ul>



<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
<strong>输出：</strong>
[null, 4, 5, 5, 8, 8]

<strong>解释：</strong>
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8
</pre>


<strong>提示：</strong>

<ul>
<li><code>1 <= k <= 10<sup>4</sup></code></li>
<li><code>0 <= nums.length <= 10<sup>4</sup></code></li>
<li><code>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></code></li>
<li><code>-10<sup>4</sup> <= val <= 10<sup>4</sup></code></li>
<li>最多调用 <code>add</code> 方法 <code>10<sup>4</sup></code> 次</li>
<li>题目数据保证，在查找第 <code>k</code> 大元素时，数组中至少有 <code>k</code> 个元素</li>
</ul>


**相似问题：**
- [0215：数组中的第K个最大元素](/leetcode/0215)
- [1825：求出 MK 平均值（2395 分）](/leetcode/1825)
- [2102：序列顺序查询（2158 分）](/leetcode/2102)


## 分析

维护一个 k 大小的小顶堆即可。


## 解答

```python
class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        self.pq = nums
        heapify(self.pq)
        self.k = k

    def add(self, val: int) -> int:
        heappush(self.pq, val)
        while len(self.pq) > self.k:
            heappop(self.pq)
        return self.pq[0]
```

72 ms


# 0373：查找和最小的 K 对数字（★）


> <u>**[力扣第 373 题](https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/)**</u>

## 题目

<p>给定两个以 <strong>非递减顺序排列</strong> 的整数数组 <code>nums1</code> 和<strong> </strong><code>nums2</code><strong> </strong>, 以及一个整数 <code>k</code><strong> </strong>。</p>

<p>定义一对值 <code>(u,v)</code>，其中第一个元素来自 <code>nums1</code>，第二个元素来自 <code>nums2</code><strong> </strong>。</p>

<p>请找到和最小的 <code>k</code> 个数对 <code>(u<sub>1</sub>,v<sub>1</sub>)</code>, <code> (u<sub>2</sub>,v<sub>2</sub>)</code>  ...  <code>(u<sub>k</sub>,v<sub>k</sub>)</code> 。</p>



<p><strong class="example">示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums1 = [1,7,11], nums2 = [2,4,6], k = 3
<strong>输出:</strong> [1,2],[1,4],[1,6]
<strong>解释: </strong>返回序列中的前 3 对数：
[1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
</pre>

<p><strong class="example">示例 2:</strong></p>

<pre>
<strong>输入: </strong>nums1 = [1,1,2], nums2 = [1,2,3], k = 2
<strong>输出: </strong>[1,1],[1,1]
<strong>解释: </strong>返回序列中的前 2 对数：
[1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums1.length, nums2.length &lt;= 10<sup>5</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>9</sup></code></li>
<li><code>nums1</code> 和 <code>nums2</code> 均为 <strong>升序排列</strong></li>
<li><meta charset="UTF-8" /><code>1 &lt;= k &lt;= 10<sup>4</sup></code></li>
<li><code>k &lt;= nums1.length * nums2.length</code></li>
</ul>


**相似问题：**
- [0378：有序矩阵中第 K 小的元素](/leetcode/0378)
- [0719：找出第 K 小的数对距离](/leetcode/0719)
- [2040：两个有序数组的第 K 小乘积（2517 分）](/leetcode/2040)


## 分析


### #1

- 类似多路归并算法，每次出堆最小和即对应的下标 (i,j)，将 (i+1,j) 和 (i,j+1) 入堆
- 可以维护一个哈希表，防止重复入堆

```python
class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        res = []
        pq = [(nums1[0]+nums2[0],0,0)]
        vis = {(0,0)}
        for _ in range(k):
            _,i,j = heappop(pq)
            res.append([nums1[i],nums2[j]])
            for x,y in [(i+1,j),(i,j+1)]:
                if x<len(nums1) and y<len(nums2) and (x,y) not in vis:
                    vis.add((x,y))
                    heappush(pq,(nums1[x]+nums2[y],x,y))
        return res
```
180 ms

### #2

- 还有个防止重复入堆的技巧
- 只有当 j=0 时，才将 (i+1,j) 入堆

## 解答

```python
class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        res = []
        pq = [(nums1[0]+nums2[0],0,0)]
        for _ in range(k):
            _,i,j = heappop(pq)
            res.append([nums1[i],nums2[j]])
            if j==0 and i+1<len(nums1):
                heappush(pq,(nums1[i+1]+nums2[j],i+1,j))
            if j+1<len(nums2):
                heappush(pq,(nums1[i]+nums2[j+1],i,j+1))
        return res
```
113 ms


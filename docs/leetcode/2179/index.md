# 2179：统计数组中好三元组数目（2272 分）


> <u>**[力扣第 72 场双周赛第 4 题](https://leetcode.cn/problems/count-good-triplets-in-an-array/)**</u>

## 题目

<p>给你两个下标从 <strong>0</strong> 开始且长度为 <code>n</code> 的整数数组 <code>nums1</code> 和 <code>nums2</code> ，两者都是 <code>[0, 1, ..., n - 1]</code> 的 <strong>排列</strong> 。</p>

<p><strong>好三元组 </strong>指的是 <code>3</code> 个 <strong>互不相同</strong> 的值，且它们在数组 <code>nums1</code> 和 <code>nums2</code> 中出现顺序保持一致。换句话说，如果我们将 <code>pos1<sub>v</sub></code> 记为值 <code>v</code> 在 <code>nums1</code> 中出现的位置，<code>pos2<sub>v</sub></code> 为值 <code>v</code> 在 <code>nums2</code> 中的位置，那么一个好三元组定义为 <code>0 &lt;= x, y, z &lt;= n - 1</code> ，且 <code>pos1<sub>x</sub> &lt; pos1<sub>y</sub> &lt; pos1<sub>z</sub></code> 和 <code>pos2<sub>x</sub> &lt; pos2<sub>y</sub> &lt; pos2<sub>z</sub></code> 都成立的 <code>(x, y, z)</code> 。</p>

<p>请你返回好三元组的 <strong>总数目</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre><b>输入：</b>nums1 = [2,0,1,3], nums2 = [0,1,2,3]
<b>输出：</b>1
<b>解释：</b>
总共有 4 个三元组 (x,y,z) 满足 pos1<sub>x</sub> &lt; pos1<sub>y</sub> &lt; pos1<sub>z </sub>，分别是 (2,0,1) ，(2,0,3) ，(2,1,3) 和 (0,1,3) 。
这些三元组中，只有 (0,1,3) 满足 pos2<sub>x</sub> &lt; pos2<sub>y</sub> &lt; pos2<sub>z</sub> 。所以只有 1 个好三元组。
</pre>

<p><strong>示例 2：</strong></p>

<pre><b>输入：</b>nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
<b>输出：</b>4
<b>解释：</b>总共有 4 个好三元组 (4,0,3) ，(4,0,2) ，(4,1,3) 和 (4,1,2) 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == nums1.length == nums2.length</code></li>
<li><code>3 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= n - 1</code></li>
<li><code>nums1</code> 和 <code>nums2</code> 是 <code>[0, 1, ..., n - 1]</code> 的排列。</li>
</ul>


## 分析

将 nums1 的数映射为在 nums2 中的坐标，得到数组 A，问题转为求 A 中的递增三元组。

遍历每个中间数 y，找前面比 y 小的个数和后面比 y 大的个数即可求得 y 对应的三元组个数。

容易想到维护有序集合，二分查找即可。


## 解答

```python
def goodTriplets(self, nums1: List[int], nums2: List[int]) -> int:
    from sortedcontainers import SortedList
    d = {num: i for i, num in enumerate(nums2)}
    A = [d[num] for num in nums1]
    res, sl1, sl2 = 0, SortedList(), SortedList(A)
    for y in A:
        res += sl1.bisect_left(y)*(len(sl2)-sl2.bisect_right(y))
        sl1.add(y)
        sl2.remove(y)
    return res
```
1728 ms

# 3132：找出与数组相加的整数 II（1620 分）


> <u>**[力扣第 395 场周赛第 2 题](https://leetcode.cn/problems/find-the-integer-added-to-array-ii/)**</u>

## 题目

<p>给你两个整数数组 <code>nums1</code> 和 <code>nums2</code>。</p>

<p>从 <code>nums1</code> 中移除两个元素，并且所有其他元素都与变量 <code>x</code> 所表示的整数相加。如果 <code>x</code> 为负数，则表现为元素值的减少。</p>

<p>执行上述操作后，<code>nums1</code> 和 <code>nums2</code> <strong>相等</strong> 。当两个数组中包含相同的整数，并且这些整数出现的频次相同时，两个数组 <strong>相等</strong> 。</p>

<p>返回能够实现数组相等的 <strong>最小 </strong>整数<em> </em><code>x</code><em> </em>。</p>



<p><strong class="example">示例 1:</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io" style="
font-family: Menlo,sans-serif;
font-size: 0.85rem;
">nums1 = [4,20,16,12,8], nums2 = [14,18,10]</span></p>

<p><strong>输出：</strong><span class="example-io" style="
font-family: Menlo,sans-serif;
font-size: 0.85rem;
">-2</span></p>

<p><strong>解释：</strong></p>

<p>移除 <code>nums1</code> 中下标为 <code>[0,4]</code> 的两个元素，并且每个元素与 <code>-2</code> 相加后，<code>nums1</code> 变为 <code>[18,14,10]</code> ，与 <code>nums2</code> 相等。</p>
</div>

<p><strong class="example">示例 2:</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io" style="
font-family: Menlo,sans-serif;
font-size: 0.85rem;
">nums1 = [3,5,5,3], nums2 = [7,7]</span></p>

<p><strong>输出：</strong><span class="example-io" style="
font-family: Menlo,sans-serif;
font-size: 0.85rem;
">2</span></p>

<p><strong>解释：</strong></p>

<p>移除 <code>nums1</code> 中下标为 <code>[0,3]</code> 的两个元素，并且每个元素与 <code>2</code> 相加后，<code>nums1</code> 变为 <code>[7,7]</code> ，与 <code>nums2</code> 相等。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= nums1.length &lt;= 200</code></li>
<li><code>nums2.length == nums1.length - 2</code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 1000</code></li>
<li>测试用例以这样的方式生成：存在一个整数 <code>x</code>，<code>nums1</code> 中的每个元素都与 <code>x</code> 相加后，再移除两个元素，<code>nums1</code> 可以与 <code>nums2</code> 相等。</li>
</ul>




## 分析

- {{< lc  "3131" >}} 进阶版，要删去两个数
- nums2 最小的数所对应的 nums1 中的数便有三种情况，即最小的三个数之一
- 遍历这三个数，判断对应的 x 是否符合即可
## 解答


```python
class Solution:
    def minimumAddedInteger(self, nums1: List[int], nums2: List[int]) -> int:
        ct1,ct2 = Counter(nums1),Counter(nums2)
        mi = min(nums2)
        for a in nsmallest(3,nums1)[::-1]:
            x = mi-a
            if all(ct1[b-x]>=ct2[b] for b in ct2):
                return x
```
47 ms

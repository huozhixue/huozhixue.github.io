# 0496：下一个更大元素 I


> <u>**[力扣第 496 题](https://leetcode.cn/problems/next-greater-element-i/)**</u>

## 题目

<p><code>nums1</code> 中数字 <code>x</code> 的 <strong>下一个更大元素</strong> 是指 <code>x</code> 在 <code>nums2</code> 中对应位置 <strong>右侧</strong> 的 <strong>第一个</strong> 比 <code>x</code><strong> </strong>大的元素。</p>

<p>给你两个<strong> 没有重复元素</strong> 的数组 <code>nums1</code> 和 <code>nums2</code> ，下标从 <strong>0</strong> 开始计数，其中<code>nums1</code> 是 <code>nums2</code> 的子集。</p>

<p>对于每个 <code>0 &lt;= i &lt; nums1.length</code> ，找出满足 <code>nums1[i] == nums2[j]</code> 的下标 <code>j</code> ，并且在 <code>nums2</code> 确定 <code>nums2[j]</code> 的 <strong>下一个更大元素</strong> 。如果不存在下一个更大元素，那么本次查询的答案是 <code>-1</code> 。</p>

<p>返回一个长度为 <code>nums1.length</code> 的数组<em> </em><code>ans</code><em> </em>作为答案，满足<em> </em><code>ans[i]</code><em> </em>是如上所述的 <strong>下一个更大元素</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [4,1,2], nums2 = [1,3,4,2].
<strong>输出：</strong>[-1,3,-1]
<strong>解释：</strong>nums1 中每个值的下一个更大元素如下所述：
- 4 ，用加粗斜体标识，nums2 = [1,3,<strong>4</strong>,2]。不存在下一个更大元素，所以答案是 -1 。
- 1 ，用加粗斜体标识，nums2 = [<em><strong>1</strong></em>,3,4,2]。下一个更大元素是 3 。
- 2 ，用加粗斜体标识，nums2 = [1,3,4,<em><strong>2</strong></em>]。不存在下一个更大元素，所以答案是 -1 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [2,4], nums2 = [1,2,3,4].
<strong>输出：</strong>[3,-1]
<strong>解释：</strong>nums1 中每个值的下一个更大元素如下所述：
- 2 ，用加粗斜体标识，nums2 = [1,<em><strong>2</strong></em>,3,4]。下一个更大元素是 3 。
- 4 ，用加粗斜体标识，nums2 = [1,2,3,<em><strong>4</strong></em>]。不存在下一个更大元素，所以答案是 -1 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums1.length &lt;= nums2.length &lt;= 1000</code></li>
<li><code>0 &lt;= nums1[i], nums2[i] &lt;= 10<sup>4</sup></code></li>
<li><code>nums1</code>和<code>nums2</code>中所有整数 <strong>互不相同</strong></li>
<li><code>nums1</code> 中的所有整数同样出现在 <code>nums2</code> 中</li>
</ul>



<p><strong>进阶：</strong>你可以设计一个时间复杂度为 <code>O(nums1.length + nums2.length)</code> 的解决方案吗？</p>


**相似问题：**
- [0503：下一个更大元素 II](/leetcode/0503)
- [0556：下一个更大元素 III](/leetcode/0556)
- [0739：每日温度](/leetcode/0739)
- [2104：子数组范围和（1504 分）](/leetcode/2104)
- [2281：巫师的总力量和（2621 分）](/leetcode/2281)
- [2454：下一个更大元素 IV（2175 分）](/leetcode/2454)
- [2487：从链表中移除节点（1454 分）](/leetcode/2487)
- [2996：大于等于顺序前缀和的最小缺失整数（1405 分）](/leetcode/2996)


## 分析
  
典型的单调栈：
- 求出 nums2 中每个元素的下一个更大元素，并保存在哈希表
- 遍历 nums1 调用哈希表即可

## 解答

```python
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        d = {}
        sk = []
        for x in nums2:
            while sk and sk[-1]<x:
                d[sk.pop()] = x
            sk.append(x)
        return [d.get(x,-1) for x in nums1]
```
32 ms

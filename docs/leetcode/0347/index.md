# 0347：前 K 个高频元素（★）


> <u>**[力扣第 347 题](https://leetcode.cn/problems/top-k-frequent-elements/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，请你返回其中出现频率前 <code>k</code> 高的元素。你可以按 <strong>任意顺序</strong> 返回答案。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>nums = [1,1,1,2,2,3], k = 2
<strong>输出: </strong>[1,2]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>nums = [1], k = 1
<strong>输出: </strong>[1]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
<li><code>k</code> 的取值范围是 <code>[1, 数组中不相同的元素的个数]</code></li>
<li>题目数据保证答案唯一，换句话说，数组中前 <code>k</code> 个高频元素的集合是唯一的</li>
</ul>



<p><strong>进阶：</strong>你所设计算法的时间复杂度 <strong>必须</strong> 优于 <code>O(n log n)</code> ，其中 <code>n</code><em> </em>是数组大小。</p>


**相似问题：**
- [0192：统计词频](/leetcode/0192)
- [0215：数组中的第K个最大元素](/leetcode/0215)
- [0451：根据字符出现频率排序](/leetcode/0451)
- [0659：分割数组为连续子序列](/leetcode/0659)
- [0692：前K个高频单词](/leetcode/0692)
- [0973：最接近原点的 K 个点（1213 分）](/leetcode/0973)
- [1772：按受欢迎程度排列功能](/leetcode/1772)
- [2284：最多单词数的发件人（1346 分）](/leetcode/2284)
- [2404：出现最频繁的偶数元素（1259 分）](/leetcode/2404)
- [3063：链表频率](/leetcode/3063)


## 分析

要求优于 O(n log n)，用堆即可。

## 解答

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        ct = Counter(nums)
        return nlargest(k,ct,key=ct.get)
```
43 ms


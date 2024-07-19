# 0167：两数之和 II - 输入有序数组（★）


> <u>**[力扣第 167 题](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)**</u>

## 题目

<p>给你一个下标从 <strong>1</strong> 开始的整数数组 <code>numbers</code> ，该数组已按<strong><em> </em>非递减顺序排列  </strong>，请你从数组中找出满足相加之和等于目标数 <code>target</code> 的两个数。如果设这两个数分别是 <code>numbers[index<sub>1</sub>]</code> 和 <code>numbers[index<sub>2</sub>]</code> ，则 <code>1 &lt;= index<sub>1</sub> &lt; index<sub>2</sub> &lt;= numbers.length</code> 。</p>

<p>以长度为 2 的整数数组 <code>[index<sub>1</sub>, index<sub>2</sub>]</code> 的形式返回这两个整数的下标 <code>index<sub>1</sub></code><em> </em>和<em> </em><code>index<sub>2</sub></code>。</p>

<p>你可以假设每个输入 <strong>只对应唯一的答案</strong> ，而且你 <strong>不可以</strong> 重复使用相同的元素。</p>

<p>你所设计的解决方案必须只使用常量级的额外空间。</p>


<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>numbers = [<strong><em>2</em></strong>,<strong><em>7</em></strong>,11,15], target = 9
<strong>输出：</strong>[1,2]
<strong>解释：</strong>2 与 7 之和等于目标数 9 。因此 index<sub>1</sub> = 1, index<sub>2</sub> = 2 。返回 [1, 2] 。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>numbers = [<strong><em>2</em></strong>,3,<strong><em>4</em></strong>], target = 6
<strong>输出：</strong>[1,3]
<strong>解释：</strong>2 与 4 之和等于目标数 6 。因此 index<sub>1</sub> = 1, index<sub>2</sub> = 3 。返回 [1, 3] 。</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>numbers = [<strong><em>-1</em></strong>,<strong><em>0</em></strong>], target = -1
<strong>输出：</strong>[1,2]
<strong>解释：</strong>-1 与 0 之和等于目标数 -1 。因此 index<sub>1</sub> = 1, index<sub>2</sub> = 2 。返回 [1, 2] 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= numbers.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-1000 &lt;= numbers[i] &lt;= 1000</code></li>
<li><code>numbers</code> 按 <strong>非递减顺序</strong> 排列</li>
<li><code>-1000 &lt;= target &lt;= 1000</code></li>
<li><strong>仅存在一个有效答案</strong></li>
</ul>


**相似问题：**
- [0001：两数之和](/leetcode/0001)
- [0653：两数之和 IV - 输入二叉搜索树](/leetcode/0653)
- [1099：小于 K 的两数之和（1245 分）](/leetcode/1099)


## 分析

要求常量空间，考虑用双指针解决：
- 初始指针 i、j 分别指向 numbers 的首尾
- 如果 numbers[i]+numbers[j]<target，则 numbers[i] 与任意 [i+1,j-1] 内的数相加更小，故可以不再考虑 numbers[i]，缩小查找范围为 [i+1,j]
- 同理，如果 numbers[i]+numbers[j]>target，可以缩小查找范围为 [i, j-1]
- 循环操作直到找到结果即可
 
## 解答

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        n = len(numbers)
        i,j = 0,n-1
        while i<j:
            s = numbers[i]+numbers[j]
            if s==target:
                return [i+1,j+1]
            if s<target:
                i += 1
            else:
                j -= 1
```
43 ms


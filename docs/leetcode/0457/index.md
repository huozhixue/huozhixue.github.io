# 0457：环形数组是否存在循环（★）


> <u>**[力扣第 457 题](https://leetcode.cn/problems/circular-array-loop/)**</u>

## 题目

<p>存在一个不含 <code>0</code> 的<strong> 环形 </strong>数组 <code>nums</code> ，每个 <code>nums[i]</code> 都表示位于下标 <code>i</code> 的角色应该向前或向后移动的下标个数：</p>

<ul>
<li>如果 <code>nums[i]</code> 是正数，<strong>向前</strong>（下标递增方向）移动 <code>|nums[i]|</code> 步</li>
<li>如果 <code>nums[i]</code> 是负数，<strong>向后</strong>（下标递减方向）移动 <code>|nums[i]|</code> 步</li>
</ul>

<p>因为数组是 <strong>环形</strong> 的，所以可以假设从最后一个元素向前移动一步会到达第一个元素，而第一个元素向后移动一步会到达最后一个元素。</p>

<p>数组中的 <strong>循环</strong> 由长度为 <code>k</code> 的下标序列 <code>seq</code> 标识：</p>

<ul>
<li>遵循上述移动规则将导致一组重复下标序列 <code>seq[0] -&gt; seq[1] -&gt; ... -&gt; seq[k - 1] -&gt; seq[0] -&gt; ...</code></li>
<li>所有 <code>nums[seq[j]]</code> 应当不是 <strong>全正</strong> 就是 <strong>全负</strong></li>
<li><code>k &gt; 1</code></li>
</ul>

<p>如果 <code>nums</code> 中存在循环，返回 <code>true</code> ；否则，返回<em> </em><code>false</code><em> </em>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [2,-1,1,2,2]
<strong>输出：</strong>true
<strong>解释：</strong>存在循环，按下标 0 -&gt; 2 -&gt; 3 -&gt; 0 。循环长度为 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,2]
<strong>输出：</strong>false
<strong>解释：</strong>按下标 1 -&gt; 1 -&gt; 1 ... 的运动无法构成循环，因为循环的长度为 1 。根据定义，循环的长度必须大于 1 。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入：</strong>nums = [-2,1,-1,-2,-2]
<strong>输出：</strong>false
<strong>解释：</strong>按下标 1 -&gt; 2 -&gt; 1 -&gt; ... 的运动无法构成循环，因为 nums[1] 是正数，而 nums[2] 是负数。
所有 nums[seq[j]] 应当不是全正就是全负。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 5000</code></li>
<li><code>-1000 &lt;= nums[i] &lt;= 1000</code></li>
<li><code>nums[i] != 0</code></li>
</ul>



<p><strong>进阶：</strong>你能设计一个时间复杂度为 <code>O(n)</code> 且额外空间复杂度为 <code>O(1)</code> 的算法吗？</p>


## 分析

- 考虑遍历每个起点模拟，正负性改变或重复即中止
- 要求时间 O(N)，那么失败的下标应该做标记，防止重复遍历
- 要求空间 O(1)，因此考虑直接在数组上做标记
- 之前失败的标记和当前正在模拟经过的标记应该是不同的
- 有个想法是用起点下标 i 加上一个大值（本题大于1000即可）作为标记，即可区分

## 解答


```python
class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        def check(i):
            if nums[i]>ma:
                return False
            M = i+ma+1
            while True:
                j = (i+nums[i])%n
                if nums[j]>ma:
                    return nums[j]==M
                if j==i or nums[i]*nums[j]<0:
                    return False
                nums[i] = M
                i = j

        ma = 1000
        n = len(nums)
        return any(check(i) for i in range(n))
```
38 ms

# 1354：多次求和构造目标数组（2014 分）


> <u>**[力扣第 176 场周赛第 4 题](https://leetcode.cn/problems/construct-target-array-with-multiple-sums/)**</u>

## 题目

<p>给你一个整数数组 <code>target</code> 。一开始，你有一个数组 <code>A</code> ，它的所有元素均为 1 ，你可以执行以下操作：</p>

<ul>
<li>令 <code>x</code> 为你数组里所有元素的和</li>
<li>选择满足 <code>0 &lt;= i &lt; target.size</code> 的任意下标 <code>i</code> ，并让 <code>A</code> 数组里下标为 <code>i</code> 处的值为 <code>x</code> 。</li>
<li>你可以重复该过程任意次</li>
</ul>

<p>如果能从 <code>A</code> 开始构造出目标数组 <code>target</code> ，请你返回 True ，否则返回 False 。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>target = [9,3,5]
<strong>输出：</strong>true
<strong>解释：</strong>从 [1, 1, 1] 开始
[1, 1, 1], 和为 3 ，选择下标 1
[1, 3, 1], 和为 5， 选择下标 2
[1, 3, 5], 和为 9， 选择下标 0
[9, 3, 5] 完成
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>target = [1,1,1,2]
<strong>输出：</strong>false
<strong>解释：</strong>不可能从 [1,1,1,1] 出发构造目标数组。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>target = [8,5]
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>N == target.length</code></li>
<li><code>1 &lt;= target.length &lt;= 5 * 10^4</code></li>
<li><code>1 &lt;= target[i] &lt;= 10^9</code></li>
</ul>


**相似问题：**
- [2335：装满杯子需要的最短总时长（1360 分）](/leetcode/2335)


## 分析

- 反过来考虑，最后一步得到的数必然是最大的那个，设为 x
- 设最后的总和为 s，那么最后一步之前 x 应该是 x-(s-x)
- 依此一步步反推，直到 x<=s-x 为止，此时判断 x 是否为 1 即可
- 注意到假如 x 减了多次，每次的 s-x 是恒定的，所以可以用除法加速这个过程
## 解答


```python
class Solution:
    def isPossible(self, target: List[int]) -> bool:
        pq = sorted(-x for x in target)
        s = sum(target)
        while pq:
            x = -heappop(pq)
            if x<=s-x or s-x==0:
                return x==1
            y = (x-1)%(s-x)+1
            s += y-x
            heappush(pq,-y)
```
19 ms

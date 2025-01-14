# 2967：使数组成为等数数组的最小代价（2116 分）


> <u>**[力扣第 376 场周赛第 3 题](https://leetcode.cn/problems/minimum-cost-to-make-array-equalindromic/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 下标从 <strong>0</strong> 开始的整数数组 <code>nums</code> 。</p>

<p>你可以对 <code>nums</code> 执行特殊操作 <strong>任意次</strong> （也可以 <strong>0</strong> 次）。每一次特殊操作中，你需要 <strong>按顺序</strong> 执行以下步骤：</p>

<ul>
<li>从范围 <code>[0, n - 1]</code> 里选择一个下标 <code>i</code> 和一个 <strong>正</strong> 整数 <code>x</code> 。</li>
<li>将 <code>|nums[i] - x|</code> 添加到总代价里。</li>
<li>将 <code>nums[i]</code> 变为 <code>x</code> 。</li>
</ul>

<p>如果一个正整数正着读和反着读都相同，那么我们称这个数是<strong> 回文数</strong> 。比方说，<code>121</code> ，<code>2552</code> 和 <code>65756</code> 都是回文数，但是 <code>24</code> ，<code>46</code> ，<code>235</code> 都不是回文数。</p>

<p>如果一个数组中的所有元素都等于一个整数 <code>y</code> ，且 <code>y</code> 是一个小于 <code>10<sup>9</sup></code> 的 <strong>回文数</strong> ，那么我们称这个数组是一个 <strong>等数数组 </strong>。</p>

<p>请你返回一个整数，表示执行任意次特殊操作后使 <code>nums</code> 成为 <strong>等数数组</strong> 的 <strong>最小</strong> 总代价。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>nums = [1,2,3,4,5]
<b>输出：</b>6
<b>解释：</b>我们可以将数组中所有元素变为回文数 3 得到等数数组，数组变成 [3,3,3,3,3] 需要执行 4 次特殊操作，代价为 |1 - 3| + |2 - 3| + |4 - 3| + |5 - 3| = 6 。
将所有元素变为其他回文数的总代价都大于 6 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>nums = [10,12,13,14,15]
<b>输出：</b>11
<b>解释：</b>我们可以将数组中所有元素变为回文数 11 得到等数数组，数组变成 [11,11,11,11,11] 需要执行 5 次特殊操作，代价为 |10 - 11| + |12 - 11| + |13 - 11| + |14 - 11| + |15 - 11| = 11 。
将所有元素变为其他回文数的总代价都大于 11 。
</pre>

<p><strong class="example">示例 3 ：</strong></p>

<pre>
<b>输入：</b>nums = [22,33,22,33,22]
<b>输出：</b>22
<b>解释：</b>我们可以将数组中所有元素变为回文数 22 得到等数数组，数组变为 [22,22,22,22,22] 需要执行 2 次特殊操作，代价为 |33 - 22| + |33 - 22| = 22 。
将所有元素变为其他回文数的总代价都大于 22 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0462：最小操作次数使数组元素相等 II](/leetcode/0462)
- [2448：使数组相等的最小开销（2005 分）](/leetcode/2448)


## 分析

- 假如不限定回文数，显然找中位数即可
- 限定了回文数，找离中位数最近的回文数并比较即可
- 这即是问题  {{< lc "0564" >}}

## 解答


```python
class Solution:
    def minimumCost(self, nums: List[int]) -> int:
        n = len(nums)
        nums.sort()
        mid = str(nums[n//2])
        m = len(mid)
        q,r = divmod(m,2)
        h = int(mid[:q+r])
        b = str(h)+str(h)[-1-r::-1]
        a = str(pow(10,m-1)-1) if h==pow(10,q+r-1) else str(h-1)+str(h-1)[-1-r::-1]
        c = str(pow(10,m)+1) if h==pow(10,q+r)-1 else str(h+1)+str(h+1)[-1-r::-1]
        def cal(x):
            return sum(abs(x-y) for y in nums)
        return min(cal(int(x)) for x in [a,b,c])
```
71 ms

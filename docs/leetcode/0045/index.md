# 0045：跳跃游戏 II（★）


> <u>**[力扣第 45 题](https://leetcode.cn/problems/jump-game-ii/)**</u>

## 题目

<p>给定一个长度为 <code>n</code> 的 <strong>0 索引</strong>整数数组 <code>nums</code>。初始位置为 <code>nums[0]</code>。</p>

<p>每个元素 <code>nums[i]</code> 表示从索引 <code>i</code> 向前跳转的最大长度。换句话说，如果你在 <code>nums[i]</code> 处，你可以跳转到任意 <code>nums[i + j]</code> 处:</p>

<ul>
<li><code>0 &lt;= j &lt;= nums[i]</code> </li>
<li><code>i + j &lt; n</code></li>
</ul>

<p>返回到达 <code>nums[n - 1]</code> 的最小跳跃次数。生成的测试用例可以到达 <code>nums[n - 1]</code>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [2,3,1,1,4]
<strong>输出:</strong> 2
<strong>解释:</strong> 跳到最后一个位置的最小跳跃数是 <code>2</code>。
从下标为 0 跳到下标为 1 的位置，跳 <code>1</code> 步，然后跳 <code>3</code> 步到达数组的最后一个位置。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [2,3,0,1,4]
<strong>输出:</strong> 2
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>0 &lt;= nums[i] &lt;= 1000</code></li>
<li>题目保证可以到达 <code>nums[n-1]</code></li>
</ul>


**相似问题：**
- [0055：跳跃游戏](/leetcode/0055)
- [1306：跳跃游戏 III（1396 分）](/leetcode/1306)
- [1871：跳跃游戏 VII（1896 分）](/leetcode/1871)
- [2297：跳跃游戏 VIII](/leetcode/2297)
- [2617：网格图中最少访问的格子数（2581 分）](/leetcode/2617)
- [2770：达到末尾下标所需的最大跳跃次数（1533 分）](/leetcode/2770)
- [2786：访问数组中的位置使分数最大（1732 分）](/leetcode/2786)


## 分析

- 先看第一步能跳到的区间是 [0,nums[0]]
- 然后递推得到第二步能跳到的区间 [nums[0]+1,max(i+nums[i] for i in range(nums[0]+1))]
- 循环递推直到到达末尾即可

## 解答

```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        res=s=e=0
        while e<len(nums)-1:
            s,e = e+1,max(i+nums[i] for i in range(s,e+1))
            res += 1
        return res
```
49 ms

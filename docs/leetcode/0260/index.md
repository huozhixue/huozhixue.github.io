# 0260：只出现一次的数字 III（★）


> <u>**[力扣第 260 题](https://leetcode.cn/problems/single-number-iii/)**</u>

## 题目

<p>给你一个整数数组 <code>nums</code>，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 <strong>任意顺序</strong> 返回答案。</p>

<p>你必须设计并实现线性时间复杂度的算法且仅使用常量额外空间来解决此问题。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,1,3,2,5]
<strong>输出：</strong>[3,5]
<strong>解释：</strong>[5, 3] 也是有效的答案。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [-1,0]
<strong>输出：</strong>[-1,0]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [0,1]
<strong>输出：</strong>[1,0]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>-2<sup>31</sup> &lt;= nums[i] &lt;= 2<sup>31</sup> - 1</code></li>
<li>除两个只出现一次的整数外，<code>nums</code> 中的其他数字都出现两次</li>
</ul>


**相似问题：**
- [0136：只出现一次的数字](/leetcode/0136)
- [0137：只出现一次的数字 II](/leetcode/0137)
- [2433：找出前缀异或的原始数组（1366 分）](/leetcode/2433)
- [3158：求出出现两次数字的 XOR 值（1172 分）](/leetcode/3158)


## 分析


{{< lc "0136"  >}} 升级版，同样有巧妙的位运算方法：
- 设出现一次的元素是 a、b
- 将所有数字异或得到 c，显然 c = a^b
- 在 c 的二进制表示中，任选一个为 1 的位置 i，按二进制的位置 i 是否为 1 可以将 nums 分为两组
- 显然 a、b 必然在不同的组，而相同的数必然在同一组
- 每一组就转为问题 {{< lc "0136">}} 

## 解答

```python
class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        c = reduce(xor,nums)
        c = c&-c
        res = [0,0]
        for x in nums:
            res[x&c>0] ^= x
        return res
```
45 ms

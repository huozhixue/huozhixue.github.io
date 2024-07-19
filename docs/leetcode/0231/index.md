# 0231：2 的幂


> <u>**[力扣第 231 题](https://leetcode.cn/problems/power-of-two/)**</u>

## 题目

<p>给你一个整数 <code>n</code>，请你判断该整数是否是 2 的幂次方。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>如果存在一个整数 <code>x</code> 使得 <code>n == 2<sup>x</sup></code> ，则认为 <code>n</code> 是 2 的幂次方。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>true
<strong>解释：</strong>2<sup>0</sup> = 1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 16
<strong>输出：</strong>true
<strong>解释：</strong>2<sup>4</sup> = 16
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你能够不使用循环/递归解决此问题吗？</p>


**相似问题：**
- [0191：位1的个数](/leetcode/0191)
- [0326：3 的幂](/leetcode/0326)
- [0342：4的幂](/leetcode/0342)


## 分析

可以利用位运算：
- n 是 2 的幂等价于 n 是正整数且 n 的二进制中只有一个 1
- 那么用 n&(n-1) 移除最后一个 1 即变为 0
- 或者用 n&(-n) 提取出最后一个 1 后面的部分，即等于 n

## 解答

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n>0 and n&(n-1)==0
```
31 ms



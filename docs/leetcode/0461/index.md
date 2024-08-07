# 0461：汉明距离


> <u>**[力扣第 461 题](https://leetcode.cn/problems/hamming-distance/)**</u>

## 题目

<p>两个整数之间的 <a href="https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E8%B7%9D%E7%A6%BB">汉明距离</a> 指的是这两个数字对应二进制位不同的位置的数目。</p>

<p>给你两个整数 <code>x</code> 和 <code>y</code>，计算并返回它们之间的汉明距离。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>x = 1, y = 4
<strong>输出：</strong>2
<strong>解释：</strong>
1   (0 0 0 1)
4   (0 1 0 0)
↑   ↑
上面的箭头指出了对应二进制位不同的位置。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>x = 3, y = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= x, y <= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0191：位1的个数](/leetcode/0191)
- [0477：汉明距离总和](/leetcode/0477)


## 分析

看异或后二进制位有多少个 1 即可。

## 解答


```python
class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        return (x^y).bit_count()
```
32 ms

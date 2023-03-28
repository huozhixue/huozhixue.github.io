# 0201：数字范围按位与（★）


> <u>**[力扣第 201 题](https://leetcode.cn/problems/bitwise-and-of-numbers-range/)**</u>

## 题目

<p>给你两个整数 <code>left</code> 和 <code>right</code> ，表示区间 <code>[left, right]</code> ，返回此区间内所有数字 <strong>按位与</strong> 的结果（包含 <code>left</code> 、<code>right</code> 端点）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>left = 5, right = 7
<strong>输出：</strong>4
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>left = 0, right = 0
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>left = 1, right = 2147483647
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= left <= right <= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

本题要利用位运算与的特性：
- 假如 right 的二进制位数比 left 多，结果必然为 0 
- 假如位数相等，去掉 right 和 left 二进制的第一位，转为递归子问题
- 因此只需要找到 right 和 left 的二进制表示的公共前缀，后面补 0 即可

具体实现时有个巧妙的方法：right 不断去掉最右边的 1 直到 right<=left，即为所求。
 
## 解答

```python
def rangeBitwiseAnd(self, left: int, right: int) -> int:
	while right > left:
		right &= right - 1
	return right
```
48 ms







# 0006：Z 字形变换（★）


> <u>**[力扣第 6 题](https://leetcode.cn/problems/zigzag-conversion/)**</u>

## 题目

<p>将一个给定字符串 <code>s</code> 根据给定的行数 <code>numRows</code> ，以从上往下、从左到右进行 Z 字形排列。</p>

<p>比如输入字符串为 <code>"PAYPALISHIRING"</code> 行数为 <code>3</code> 时，排列如下：</p>

<pre>
P   A   H   N
A P L S I I G
Y   I   R</pre>

<p>之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如：<code>"PAHNAPLSIIGYIR"</code>。</p>

<p>请你实现这个将字符串进行指定行数变换的函数：</p>

<pre>
string convert(string s, int numRows);</pre>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "PAYPALISHIRING", numRows = 3
<strong>输出：</strong>"PAHNAPLSIIGYIR"
</pre>
<strong>示例 2：</strong>

<pre>
<strong>输入：</strong>s = "PAYPALISHIRING", numRows = 4
<strong>输出：</strong>"PINALSIGYAHRPI"
<strong>解释：</strong>
P     I    N
A   L S  I G
Y A   H R
P     I
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "A", numRows = 1
<strong>输出：</strong>"A"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= s.length <= 1000</code></li>
<li><code>s</code> 由英文字母（小写和大写）、<code>','</code> 和 <code>'.'</code> 组成</li>
<li><code>1 <= numRows <= 1000</code></li>
</ul>




## 分析

### #1

- 最直接的就是模拟
- 遍历 s，维护当前所属行和方向，注意方向在边界处掉转
- 将每个字符添加到对应的行，最后再拼接
```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows < 2:
            return s
        A = [''] * numRows
        i, p = 0, 1
        for c in s:
            A[i] += c
            i += p
            p *= -1 if i in [0, numRows-1] else 1
        return ''.join(A)
```
52 ms

### #2

- 还可以用数学方法直接求出下标对应的行
- 变换周期 loop=max(1, 2*(numRows-1))
- 一个周期中的第 i 个字符属于第 min(i, loop-i) 行

## 解答

```python
def convert(self, s: str, numRows: int) -> str:
    loop = max(1, (numRows-1)*2)
    A = ['']*numRows
    for i, c in enumerate(s):
        k = min(i%loop, loop-i%loop)
        A[k] += c
    return ''.join(A)
```
55 ms



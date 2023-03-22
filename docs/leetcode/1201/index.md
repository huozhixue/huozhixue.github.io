# 1201：丑数 III（★★）


> <u>**[力扣第 155 场周赛第 2 题](https://leetcode.cn/problems/ugly-number-iii/)**</u>

## 题目

<p>给你四个整数：<code>n</code> 、<code>a</code> 、<code>b</code> 、<code>c</code> ，请你设计一个算法来找出第 <code>n</code> 个丑数。</p>

<p>丑数是可以被 <code>a</code> <strong>或</strong> <code>b</code> <strong>或</strong> <code>c</code> 整除的 <strong>正整数</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3, a = 2, b = 3, c = 5
<strong>输出：</strong>4
<strong>解释：</strong>丑数序列为 2, 3, 4, 5, 6, 8, 9, 10... 其中第 3 个是 4。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 4, a = 2, b = 3, c = 4
<strong>输出：</strong>6
<strong>解释：</strong>丑数序列为 2, 3, 4, 6, 8, 9, 10, 12... 其中第 4 个是 6。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 5, a = 2, b = 11, c = 13
<strong>输出：</strong>10
<strong>解释：</strong>丑数序列为 2, 4, 6, 8, 10, 11, 12, 13... 其中第 5 个是 10。
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>n = 1000000000, a = 2, b = 217983653, c = 336916467
<strong>输出：</strong>1999999984
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n, a, b, c <= 10^9</code></li>
<li><code>1 <= a * b * c <= 10^18</code></li>
<li>本题结果在 <code>[1, 2 * 10^9]</code> 的范围内</li>
</ul>


## 分析

观察数据范围容易想到用二分查找。

令 check(x) 代表小于等于 x 的丑数个数是否大于等于 n，那么二分查找第一个满足 check(x) 的 x 即可。

具体求小于等于 x 的丑数个数，则可以用到集合的知识。

## 解答

```python
def nthUglyNumber(self, n: int, a: int, b: int, c: int) -> int:
    def check(x):
        return x//a+x//b+x//c-x//lcm(a,b)-x//lcm(a,c)-x//lcm(b,c)+x//reduce(lcm, [a,b,c])>=n
    
    self.__class__.__getitem__ = lambda self, x: check(x)
    return bisect_left(self, True, 0, a*n)
```
40 ms


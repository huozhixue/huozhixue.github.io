# 0374：猜数字大小


> <u>**[力扣第 374 题](https://leetcode.cn/problems/guess-number-higher-or-lower/)**</u>

## 题目

<p>我们正在玩猜数字游戏。猜数字游戏的规则如下：</p>

<p>我会从 <code>1</code> 到 <code>n</code> 随机选择一个数字。 请你猜选出的是哪个数字。</p>

<p>如果你猜错了，我会告诉你，我选出的数字比你猜测的数字大了还是小了。</p>

<p>你可以通过调用一个预先定义好的接口 <code>int guess(int num)</code> 来获取猜测结果，返回值一共有三种可能的情况：</p>

<ul>
<li><code>-1</code>：你猜的数字比我选出的数字大 （即 <code>num &gt; pick</code>）。</li>
<li><code>1</code>：你猜的数字比我选出的数字小 （即 <code>num &lt; pick</code>）。</li>
<li><code>0</code>：你猜的数字与我选出的数字相等。（即 <code>num == pick</code>）。</li>
</ul>

<p>返回我选出的数字。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 10, pick = 6
<strong>输出：</strong>6
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1, pick = 1
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 2, pick = 1
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>1 &lt;= pick &lt;= n</code></li>
</ul>


## 分析

典型的二分查找。

## 解答

```python
def guessNumber(self, n: int) -> int:
    self.__class__.__getitem__ = lambda self, i: guess(i)<=0
    return bisect_left(self, True, 1, n)
```
28 ms


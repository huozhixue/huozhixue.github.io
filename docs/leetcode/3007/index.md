# 3007：价值和小于等于 K 的最大数字（2258 分）


> <u>**[力扣第 380 场周赛第 3 题](https://leetcode.cn/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k/)**</u>

## 题目

<p>给你一个整数 <code>k</code> 和一个整数 <code>x</code> 。整数 <code>num</code> 的价值是它的二进制表示中在 <code>x</code>，<code>2x</code>，<code>3x</code> 等位置处 <strong><span data-keyword="set-bit">设置位</span></strong> 的数目（从最低有效位开始）。下面的表格包含了如何计算价值的例子。</p>

<table border="1">
<tbody>
<tr>
<th>x</th>
<th>num</th>
<th>Binary Representation</th>
<th>Price</th>
</tr>
<tr>
<td>1</td>
<td>13</td>
<td><u>0</u><u>0</u><u>0</u><u>0</u><u>0</u><strong><u>1</u></strong><strong><u>1</u></strong><u>0</u><strong><u>1</u></strong></td>
<td>3</td>
</tr>
<tr>
<td>2</td>
<td>13</td>
<td>0<u>0</u>0<u>0</u>0<strong><u>1</u></strong>1<u>0</u>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>233</td>
<td>0<strong><u>1</u></strong>1<strong><u>1</u></strong>0<strong><u>1</u></strong>0<u>0</u>1</td>
<td>3</td>
</tr>
<tr>
<td>3</td>
<td>13</td>
<td><u>0</u>00<u>0</u>01<strong><u>1</u></strong>01</td>
<td>1</td>
</tr>
<tr>
<td>3</td>
<td>362</td>
<td><strong><u>1</u></strong>01<strong><u>1</u></strong>01<u>0</u>10</td>
<td>2</td>
</tr>
</tbody>
</table>



<p><code>num</code> 的 <strong>累加价值</strong> 是从 <code>1</code> 到 <code>num</code> 的数字的 <strong>总</strong> 价值。如果 <code>num</code> 的累加价值小于或等于 <code>k</code> 则被认为是 <strong>廉价</strong> 的。</p>

<p>请你返回<strong> 最大</strong> 的廉价数字。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>k = 9, x = 1
<b>输出：</b>6
<b>解释：</b>由下表所示，6 是最大的廉价数字。
</pre>

<table border="1">
<tbody>
<tr>
<th>x</th>
<th>num</th>
<th>Binary Representation</th>
<th>Price</th>
<th>Accumulated Price</th>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td><u>0</u><u>0</u><strong><u>1</u></strong></td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>1</td>
<td>2</td>
<td><u>0</u><strong><u>1</u></strong><u>0</u></td>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>1</td>
<td>3</td>
<td><u>0</u><strong><u>1</u></strong><strong><u>1</u></strong></td>
<td>2</td>
<td>4</td>
</tr>
<tr>
<td>1</td>
<td>4</td>
<td><strong><u>1</u></strong><u>0</u><u>0</u></td>
<td>1</td>
<td>5</td>
</tr>
<tr>
<td>1</td>
<td>5</td>
<td><strong><u>1</u></strong><u>0</u><strong><u>1</u></strong></td>
<td>2</td>
<td>7</td>
</tr>
<tr>
<td>1</td>
<td>6</td>
<td><strong><u>1</u></strong><strong><u>1</u></strong><u>0</u></td>
<td>2</td>
<td>9</td>
</tr>
<tr>
<td>1</td>
<td>7</td>
<td><strong><u>1</u></strong><strong><u>1</u></strong><strong><u>1</u></strong></td>
<td>3</td>
<td>12</td>
</tr>
</tbody>
</table>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>k = 7, x = 2
<b>输出：</b>9
<b>解释：</b>由下表所示，9 是最大的廉价数字。
</pre>

<table border="1">
<tbody>
<tr>
<th>x</th>
<th>num</th>
<th>Binary Representation</th>
<th>Price</th>
<th>Accumulated Price</th>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td><u>0</u>0<u>0</u>1</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>2</td>
<td>2</td>
<td><u>0</u>0<strong><u>1</u></strong>0</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>2</td>
<td>3</td>
<td><u>0</u>0<strong><u>1</u></strong>1</td>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>2</td>
<td>4</td>
<td><u>0</u>1<u>0</u>0</td>
<td>0</td>
<td>2</td>
</tr>
<tr>
<td>2</td>
<td>5</td>
<td><u>0</u>1<u>0</u>1</td>
<td>0</td>
<td>2</td>
</tr>
<tr>
<td>2</td>
<td>6</td>
<td><u>0</u>1<strong><u>1</u></strong>0</td>
<td>1</td>
<td>3</td>
</tr>
<tr>
<td>2</td>
<td>7</td>
<td><u>0</u>1<strong><u>1</u></strong>1</td>
<td>1</td>
<td>4</td>
</tr>
<tr>
<td>2</td>
<td>8</td>
<td><strong><u>1</u></strong>0<u>0</u>0</td>
<td>1</td>
<td>5</td>
</tr>
<tr>
<td>2</td>
<td>9</td>
<td><strong><u>1</u></strong>0<u>0</u>1</td>
<td>1</td>
<td>6</td>
</tr>
<tr>
<td>2</td>
<td>10</td>
<td><strong><u>1</u></strong>0<strong><u>1</u></strong>0</td>
<td>2</td>
<td>8</td>
</tr>
</tbody>
</table>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= 10<sup>15</sup></code></li>
<li><code>1 &lt;= x &lt;= 8</code></li>
</ul>


## 分析

### #1 贡献法

- 考虑二分，要计算 1 到 n 的总价值
- 可以用贡献法，类似 {{< lc "0233" >}}，计算每一位的贡献
	- 以从低到高第 i 位为例
	- i 位上的 1 以 2^(i+1) 为周期循环，一个完整周期内有 2^i 个 1
	- 再计算不完整周期 r 内，有 max(0,r-2^i+1) 个 1

```python
class Solution:
    def findMaximumNumber(self, k: int, x: int) -> int:
        def check(n):
            y = 1<<(x-1)
            res = 0
            while y<=n:
                q,r = divmod(n,2*y)
                res += q*y+max(0,r-y+1)
                y <<= x
            return res>k
        ma = (1<<x)*(k+1)
        return bisect_left(range(ma),True,key=check)-1
```
111 ms

### #2 试填法

- 这种针对二进制表示的问题，也可以考虑试填法
	- 从高位到低位，先填 1，并计算增加的价值
	- 若价值超了，则该位应该填 0
	- 否则，该位填 1，并累计价值
- 对于本题，假如填到第 i 位（即 2^i 的位置），前面已填有价值的1个数为 pre
	- 增加的价值来源于前面和后面两部分
	- 前面已填有价值的 1 的个数是 pre，每个增加 2^i
	- 后面有价值的 1 的位置有 i//x 个，每个增加 2^(i-1)
	
## 解答


```python
class Solution:
    def findMaximumNumber(self, k: int, x: int) -> int:
        ma = (k+1)<<x
        res,pre = 0,0
        for i in range(ma.bit_length()-1,-1,-1):
            add = (pre<<i)+(i//x<<i>>1)
            if add<=k:
                k -= add
                pre += (i+1)%x==0
                res |= 1<<i
        return res-1
```
37 ms

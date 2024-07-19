# 0400：第 N 位数字（★）


> <u>**[力扣第 400 题](https://leetcode.cn/problems/nth-digit/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你在无限的整数序列 <code>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]</code> 中找出并返回第 <code>n</code><em> </em>位上的数字。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 11
<strong>输出：</strong>0
<strong>解释：</strong>第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 <strong>0 </strong>，它是 10 的一部分。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>




## 分析


### #1

- 针对数位上的这种问题，一种常用的方法是二分+计数
	- 二分查找第一个 x 使得序列 [1,x] 的数字个数>=n
	- 然后再定位 x 中的位置即可
- 求序列 [1,x] 的数字个数，可以用数位 dp，也可以用贡献法
- 这里采用贡献法
	- 以百位为例，除了 [1,99]，其它数都有百位，因此就是 x-99

```python
class Solution:
    def findNthDigit(self, n: int) -> int:
        def cal(x):
            res,y = 0,1
            while y<=x:
                res += x-(y-1)
                y *= 10
            return res
        x = bisect_left(range(n),n,key=cal)
        return int(str(x)[-cal(x)+n-1])
```
45 ms

### #2

- 还有一种常用的方法是分段计数
- 将序列分为 [1,9]、[10,99]、[100,999] 等段，分别计数
- 遍历求出第 n 个属于哪一段，再定位具体位置即可

## 解答

```python
class Solution:
    def findNthDigit(self, n: int) -> int:
        x = 1
        while n>x*9*10**(x-1):
            n -= x*9*10**(x-1)
            x += 1
        q,r = divmod(n-1,x)
        res = 10**(x-1)+q
        return int(str(res)[r])
```
36 ms



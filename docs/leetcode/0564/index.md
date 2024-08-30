# 0564：寻找最近的回文数（★★）


> <u>**[力扣第 564 题](https://leetcode.cn/problems/find-the-closest-palindrome/)**</u>

## 题目

<p>给定一个表示整数的字符串 <code>n</code> ，返回与它最近的回文整数（不包括自身）。如果不止一个，返回较小的那个。</p>

<p>“最近的”定义为两个整数<strong>差的绝对值</strong>最小。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = "123"
<strong>输出:</strong> "121"
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = "1"
<strong>输出:</strong> "0"
<strong>解释:</strong> 0 和 2是最近的回文，但我们返回最小的，也就是 0。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n.length &lt;= 18</code></li>
<li><code>n</code> 只由数字组成</li>
<li><code>n</code> 不含前导 0</li>
<li><code>n</code> 代表在 <code>[1, 10<sup>18</sup> - 1]</code> 范围内的整数</li>
</ul>


**相似问题：**
- [2217：找到指定长度的回文数（1822 分）](/leetcode/2217)
- [1842：下个由相同数字构成的回文串](/leetcode/1842)


## 分析

- 回文数一般考虑用前半镜像的方法
	- 例如 356，固定住 35 并镜像得到 353，6482 固定住 64 并镜像得到 6446
- 设 n 的前半为 h，以 h-1、h、h+1 镜像的三个数中，必然有一个是所求结果
- 注意有两种镜像方式，需要和原来的 n 保持一致
	- 例如 h=35，可以镜像为 353 或 3553
- 还有两种特殊情况
	- h+1 进位了
		- 比如 999 的 h 是 99，h+1 镜像不对
		- 此时可以直接构造结果为 1001
	- h-1 退位了，比如 100 的 h 是 10，同理可以直接构造结果为 99


## 解答

```python
class Solution:
    def nearestPalindromic(self, n: str) -> str:
        m = len(n)
        q,r = divmod(m,2)
        h = int(n[:q+r])
        b = str(h)+str(h)[-1-r::-1]
        a = str(pow(10,m-1)-1) if h==pow(10,q+r-1) else str(h-1)+str(h-1)[-1-r::-1]
        c = str(pow(10,m)+1) if h==pow(10,q+r)-1 else str(h+1)+str(h+1)[-1-r::-1]
        return min([a,b,c],key=lambda x:abs(int(x)-int(n)) or inf)
```
38 ms


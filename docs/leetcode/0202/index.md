# 0202：快乐数


> <u>**[力扣第 202 题](https://leetcode.cn/problems/happy-number/)**</u>

## 题目

<p>编写一个算法来判断一个数 <code>n</code> 是不是快乐数。</p>

<p><strong>「快乐数」</strong> 定义为：</p>

<ul>
<li>对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。</li>
<li>然后重复这个过程直到这个数变为 1，也可能是 <strong>无限循环</strong> 但始终变不到 1。</li>
<li>如果这个过程 <strong>结果为</strong> 1，那么这个数就是快乐数。</li>
</ul>

<p>如果 <code>n</code> 是 <em>快乐数</em> 就返回 <code>true</code> ；不是，则返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 19
<strong>输出：</strong>true
<strong>解释：
</strong>1<sup>2</sup> + 9<sup>2</sup> = 82
8<sup>2</sup> + 2<sup>2</sup> = 68
6<sup>2</sup> + 8<sup>2</sup> = 100
1<sup>2</sup> + 0<sup>2</sup> + 0<sup>2</sup> = 1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0141：环形链表](/leetcode/0141)
- [0258：各位相加](/leetcode/0258)
- [0263：丑数](/leetcode/0263)
- [1945：字符串转化后的各位数字之和（1254 分）](/leetcode/1945)
- [2457：美丽整数的最小增量（1680 分）](/leetcode/2457)
- [2507：使用质因数之和替换后可以取到的最小值（1499 分）](/leetcode/2507)
- [2520：统计能整除数字的位数（1260 分）](/leetcode/2520)


## 分析

- 直觉上最后数会越来越，进入一个循环
- 可以用数学知识证明：
	- 设 n 是一个 k 位数，第一次替换后得到 n'
	- 必然有 n'<=81*k，n'的位数 <= $3+\lfloor log_{10}k \rfloor$。
	- 有限步之后 n 的位数必然 <=3

## 解答

```python
class Solution:
    def isHappy(self, n: int) -> bool:
        vis = set()
        while n not in vis:
            vis.add(n)
            n = sum(int(c)**2 for c in str(n))
        return n == 1
```
35 ms







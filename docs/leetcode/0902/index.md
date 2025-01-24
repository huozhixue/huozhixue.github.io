# 0902：最大为 N 的数字组合（1989 分）


> <u>**[力扣第 101 场周赛第 3 题](https://leetcode.cn/problems/numbers-at-most-n-given-digit-set/)**</u>

## 题目

<p>给定一个按 <strong>非递减顺序</strong> 排列的数字数组<meta charset="UTF-8" /> <code>digits</code> 。你可以用任意次数 <code>digits[i]</code> 来写的数字。例如，如果<meta charset="UTF-8" /> <code>digits = ['1','3','5']</code>，我们可以写数字，如<meta charset="UTF-8" /> <code>'13'</code>, <code>'551'</code>, 和 <code>'1351315'</code>。</p>

<p>返回 <em>可以生成的小于或等于给定整数 <code>n</code> 的正整数的个数</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>digits = ["1","3","5","7"], n = 100
<strong>输出：</strong>20
<strong>解释：</strong>
可写出的 20 个数字是：
1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>digits = ["1","4","9"], n = 1000000000
<strong>输出：</strong>29523
<strong>解释：</strong>
我们可以写 3 个一位数字，9 个两位数字，27 个三位数字，
81 个四位数字，243 个五位数字，729 个六位数字，
2187 个七位数字，6561 个八位数字和 19683 个九位数字。
总共，可以使用D中的数字写出 29523 个整数。</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入：</strong>digits = ["7"], n = 8
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>
<meta charset="UTF-8" />

<ul>
<li><code>1 &lt;= digits.length &lt;= 9</code></li>
<li><code>digits[i].length == 1</code></li>
<li><code>digits[i]</code> 是从 <code>'1'</code> 到 <code>'9'</code> 的数</li>
<li><code>digits</code> 中的所有值都 <strong>不同</strong> </li>
<li><code>digits</code> 按 <strong>非递减顺序</strong> 排列</li>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>




## 分析

### #1

- 典型的数位 dp，令 dfs(i, st, bd) 代表某个状态下的结果：
	- 遍历到 n 的第 i 位
	- st 代表前面是否取了数
	- bd 代表前面取的数是否贴着 n 的上界
- 递归即可

```python
class Solution:
    def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
        @cache
        def dfs(i,st,bd):
            if i==len(s):
                return st
            res = 0
            up = s[i] if bd else '9'
            for x in digits:
                if x>up:
                    break
                res += dfs(i+1,1,bd and x==up)
            if not st:
                res += dfs(i+1,0,0)
            return res

        s = str(n)
        return dfs(0,0,1)
```
0 ms

### #2

- 也可以利用排列组合知识分段计算
- 例如对于 n=7382，digits=["1","3","5","7"]：
	- [0, 1000) 的对应个数：4+4^2+4^3 
	- [1000, 7000) 的对应个数：3*4^3     
	- [7000, 7300) 的对应个数：1*4^2 
	- [7300, 7380) 的对应个数：4*4
	- [7380, 7382) 的对应个数：0
- 具体实现时，设 s=str(n) 的长度为 m
	- 先计算 0 到 10^(m-1) 的对应个数
	- 遍历 i，固定 s[:i] 不变，求能取的比 s[i] 小的值，再乘以后面的排列个数
	- 一旦 s[i] 不在 digits 中，就已经统计完毕了
- 为了方便，可以先将 n 加 1，变为开区间

## 解答

```python
class Solution:
    def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
        s = str(n+1)
        m,k = len(s),len(digits)
        res = (pow(k,m)-k)//(k-1) if k>1 else k*(m-1)
        for i,c in enumerate(s):
            w = sum(x<c for x in digits)
            res += w*pow(k,m-1-i)
            if c not in digits:
                break
        return res
```
0 ms


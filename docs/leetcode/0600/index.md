# 0600：不含连续1的非负整数（★★）


> <u>**[力扣第 600 题](https://leetcode.cn/problems/non-negative-integers-without-consecutive-ones/)**</u>

## 题目

<p>给定一个正整数 <code>n</code> ，请你统计在 <code>[0, n]</code> 范围的非负整数中，有多少个整数的二进制表示中不存在 <strong>连续的 1 </strong>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> n = 5
<strong>输出:</strong> 5
<strong>解释:</strong>
下面列出范围在 [0, 5] 的非负整数与其对应的二进制表示：
0 : 0
1 : 1
2 : 10
3 : 11
4 : 100
5 : 101
其中，只有整数 3 违反规则（有两个连续的 1 ），其他 5 个满足规则。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 1
<strong>输出:</strong> 2
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> n = 2
<strong>输出:</strong> 3
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [0198：打家劫舍](/leetcode/0198)
- [0213：打家劫舍 II](/leetcode/0213)
- [0474：一和零](/leetcode/0474)
- [3211：生成不含相邻零的二进制字符串](/leetcode/3211)


## 分析

- 典型的数位 dp 问题
- 令 dfs(i, st, bd) 代表某个状态下的结果：
	- 遍历到 n 的第 i 位
	- 前面一个数是 st
	- bd 代表是否贴着 n 的上界
- 即可递归
	
## 解答

```python
class Solution:
    def findIntegers(self, n: int) -> int:
        @lru_cache(None)
        def dfs(i,st,bd):
            if i==len(s):
                return 1
            res = 0
            up = int(s[i]) if bd else 1
            for x in range(up+1):
                if not x&st:
                    res += dfs(i+1,x,bd and x==up)
            return res
        
        s = bin(n)[2:]
        return dfs(0,0,True)
```
51 ms


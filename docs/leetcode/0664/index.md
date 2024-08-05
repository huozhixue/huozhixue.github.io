# 0664：奇怪的打印机（★★）


> <u>**[力扣第 664 题](https://leetcode.cn/problems/strange-printer/)**</u>

## 题目

<p>有台奇怪的打印机有以下两个特殊要求：</p>

<ul>
<li>打印机每次只能打印由 <strong>同一个字符</strong> 组成的序列。</li>
<li>每次可以在从起始到结束的任意位置打印新字符，并且会覆盖掉原来已有的字符。</li>
</ul>

<p>给你一个字符串 <code>s</code> ，你的任务是计算这个打印机打印它需要的最少打印次数。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aaabbb"
<strong>输出：</strong>2
<strong>解释：</strong>首先打印 "aaa" 然后打印 "bbb"。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "aba"
<strong>输出：</strong>2
<strong>解释：</strong>首先打印 "aaa" 然后在第二个位置打印 "b" 覆盖掉原来的字符 'a'。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 100</code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>


**相似问题：**
- [0546：移除盒子](/leetcode/0546)
- [1591：奇怪的打印机 II（2290 分）](/leetcode/1591)


## 分析

### #1

- 考虑最后一个字符 s[-1]，只有两种情况
	- 单独移除
	- 和前面的某个 s[k] 一起移除
		- 必然先移除了 s[k+1:-1] 部分，转为递归子问题
		- 然后移除 s[:k+1]，也转为递归子问题
- 令 dfs(i,j) 代表 s[i:j] 的最少次数，递归即可

```python
class Solution:
    def strangePrinter(self, s: str) -> int:
        @cache
        def dfs(i,j):
            if i>j:
                return 0
            res = 1+dfs(i,j-1)
            for k in range(i,j):
                if s[k]==s[j]:
                    res = min(res,dfs(i,k)+dfs(k+1,j-1))
            return res
        return dfs(0,len(s)-1)
```
337 ms

### #2
- 显然连续相同的字符最后是一起打印的
- 考虑将连续相同的字符合并得到 A，节省时间。

## 解答

```python
class Solution:
    def strangePrinter(self, s: str) -> int:
        @cache
        def dfs(i,j):
            if i>j:
                return 0
            res = 1+dfs(i,j-1)
            for k in range(i,j):
                if A[k]==A[j]:
                    res = min(res,dfs(i,k)+dfs(k+1,j-1))
            return res
        A = [c for c,_ in groupby(s)]
        return dfs(0,len(A)-1)
```
258 ms
 


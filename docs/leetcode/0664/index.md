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

显然连续相同的字符最后是一起打印的，考虑将连续相同的字符合并得到 s'，节省时间。
- 考虑字符 s[-1]，它要么单独打印，要么和前面相同的字符一起打印
- 假如 s[-1] 单独打印，显然转为递归子问题
- 假如 s[-1] 和 s[i] 一起打印
    - 先打印了 s[:i+1] 部分，顺便将 s[-1] 一起打印了
    - 然后打印 s[i+1:-1] 部分
    - 这两部分都是递归子问题

因此令 dfs(s) 代表打印 s 的最小次数，即可递归。 

## 解答

```python
def strangePrinter(self, s: str) -> int:
    @lru_cache(None)
    def dfs(s):
        if not s:
            return 0
        res = 1+dfs(s[:-1])
        for i in range(len(s)-2):
            if s[i]==s[-1]:
                res = min(res, dfs(s[:i+1])+dfs(s[i+1:-1]))
        return res
    s = ''.join(key for key, _ in groupby(s))
    return dfs(s)
```
272 ms
 


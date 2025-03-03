# 0899：有序队列（2096 分）


> <u>**[力扣第 100 场周赛第 4 题](https://leetcode.cn/problems/orderly-queue/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> 和一个整数 <code>k</code> 。你可以从 <code>s</code> 的前 <code>k</code> 个字母中选择一个，并把它加到字符串的末尾。</p>

<p>返回 <em>在应用上述步骤的任意数量的移动后，字典序最小的字符串 </em>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "cba", k = 1
<strong>输出：</strong>"acb"
<strong>解释：</strong>
在第一步中，我们将第一个字符（“c”）移动到最后，获得字符串 “bac”。
在第二步中，我们将第一个字符（“b”）移动到最后，获得最终结果 “acb”。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "baaca", k = 3
<strong>输出：</strong>"aaabc"
<strong>解释：
</strong>在第一步中，我们将第一个字符（“b”）移动到最后，获得字符串 “aacab”。
在第二步中，我们将第三个字符（“c”）移动到最后，获得最终结果 “aaabc”。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= S.length &lt;= 1000</code></li>
<li><code>s</code> 只由小写字母组成。</li>
</ul>




## 分析

### #1

- 脑筋急转弯
- 当 k>1 时，可以任意交换两个字符的位置，相当于对 s 排序
- k = 1 时，穷举即可


```python
class Solution:
    def orderlyQueue(self, s: str, k: int) -> str:
        if k>1:
            return ''.join(sorted(s))
        return min(s[i:]+s[:i] for i in range(len(s))) 
```
0 ms

### #2

- 还可以用[最小表示法](https://oi-wiki.org/string/minimal-string/)优化 k=1 的时间
## 解答


```python
class Solution:
    def orderlyQueue(self, s: str, k: int) -> str:
        if k>1:
            return ''.join(sorted(s))
        n = len(s)
        i,j,a = 0,1,0
        while i<n and j<n and a<n:
            x,y = s[(i+a)%n],s[(j+a)%n]
            if x==y:
                a += 1
            elif x>y:
                i,j,a = j,max(i+a,j)+1,0
            else:
                j,a = j+a+1,0
        return s[i:]+s[:i]
```
0 ms

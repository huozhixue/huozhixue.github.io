# 0412：Fizz Buzz


> <u>**[力扣第 412 题](https://leetcode.cn/problems/fizz-buzz/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，找出从 <code>1</code> 到 <code>n</code> 各个整数的 Fizz Buzz 表示，并用字符串数组 <code>answer</code>（<strong>下标从 1 开始</strong>）返回结果，其中：</p>

<ul>
<li><code>answer[i] == "FizzBuzz"</code> 如果 <code>i</code> 同时是 <code>3</code> 和 <code>5</code> 的倍数。</li>
<li><code>answer[i] == "Fizz"</code> 如果 <code>i</code> 是 <code>3</code> 的倍数。</li>
<li><code>answer[i] == "Buzz"</code> 如果 <code>i</code> 是 <code>5</code> 的倍数。</li>
<li><code>answer[i] == i</code> （以字符串形式）如果上述条件全不满足。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>["1","2","Fizz"]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 5
<strong>输出：</strong>["1","2","Fizz","4","Buzz"]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 15
<strong>输出：</strong>["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [1195：交替打印字符串](/leetcode/1195)
- [2525：根据规则将箱子分类（1301 分）](/leetcode/2525)


## 分析

模拟即可。

## 解答


```python
class Solution:
    def fizzBuzz(self, n: int) -> List[str]:
        return [('Fizz'*(i%3==0)+'Buzz'*(i%5==0)) or str(i) for i in range(1,n+1)]
```
42 ms

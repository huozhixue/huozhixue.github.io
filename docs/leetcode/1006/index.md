# 1006：笨阶乘（1407 分）


> <u>**[力扣第 127 场周赛第 2 题](https://leetcode.cn/problems/clumsy-factorial/)**</u>

## 题目

<p>通常，正整数 <code>n</code> 的阶乘是所有小于或等于 <code>n</code> 的正整数的乘积。例如，<code>factorial(10) = 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1</code>。</p>

<p>相反，我们设计了一个笨阶乘 <code>clumsy</code>：在整数的递减序列中，我们以一个固定顺序的操作符序列来依次替换原有的乘法操作符：乘法(*)，除法(/)，加法(+)和减法(-)。</p>

<p>例如，<code>clumsy(10) = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1</code>。然而，这些运算仍然使用通常的算术运算顺序：我们在任何加、减步骤之前执行所有的乘法和除法步骤，并且按从左到右处理乘法和除法步骤。</p>

<p>另外，我们使用的除法是地板除法（<em>floor division</em>），所以 <code>10 * 9 / 8</code> 等于 <code>11</code>。这保证结果是一个整数。</p>

<p>实现上面定义的笨函数：给定一个整数 <code>N</code>，它返回 <code>N</code> 的笨阶乘。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>4
<strong>输出：</strong>7
<strong>解释：</strong>7 = 4 * 3 / 2 + 1
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>10
<strong>输出：</strong>12
<strong>解释：</strong>12 = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1
</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= N &lt;= 10000</code></li>
<li><code>-2^31 &lt;= answer &lt;= 2^31 - 1</code>  （答案保证符合 32 位整数。）</li>
</ol>


## 分析

### #1

先考虑递归：
	
	clumsy(N-4)	= (N-4) * (N-5) // (N-6) + (N-7) - (N-8) * (N-9) // (N-10) +  ...

	clumsy(N) 	= N * (N-1) // (N-2) + (N-3) - (N-4) * (N-5) // (N-6) + (N-7) - (N-8) * (N-9) // (N-10) +  ...
				= clumsy(N-4) + N * (N-1) // (N-2) + (N-3) - (N-4) * (N-5) // (N-6) * 2
				
当 N >= 7 时递推式成立，因此再考虑 N <= 6 的情况即可。

```python
def clumsy(self, N: int) -> int:
	if N <= 6:
		return [1, 2, 6, 7, 7, 8][N-1]
	return self.clumsy(N-4) + N * (N-1) // (N-2) + (N-3) - (N-4) * (N-5) // (N-6) * 2
```

64 ms

### #2

还有个巧妙的想法，N * (N-1) // (N-2) 能直接算出来。

	N * (N - 1) // (N - 2) 
	= (N * N - N ) // (N - 2)
	= ((N - 2) * (N + 1) + 2) // (N - 2)
	= N + 1 + 2 // (N - 2)
	
	故 N >= 5 时， N * (N-1) // (N-2) = N + 1。

因此：

	对于 N >= 9:				clumsy(N) = clumsy(N-4) + (N+1) + (N-3) - (N-3) * 2 
										  = clumsy(N-4) + 4
	
	对于 N = 5、9、13、...		clumsy(N) = clumsy(5) + N - 5 = N + 2
	对于 N = 6、10、14、...		clumsy(N) = clumsy(6) + N - 6 = N + 2
	对于 N = 7、11、15、...		clumsy(N) = clumsy(7) + N - 7 = N - 1
	对于 N = 8、12、16、...		clumsy(N) = clumsy(8) + N - 8 = N + 1
	
再考虑 N <= 4 的情况即可。

## 解答

```python
def clumsy(self, N: int) -> int:
	return [1, 2, 6, 7][N-1] if N <= 4 else N + [1, 2, 2, -1][N % 4]
```

36 ms

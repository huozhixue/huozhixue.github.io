# 0946：验证栈序列（1461 分）


> <u>**[力扣第 112 场周赛第 2 题](https://leetcode.cn/problems/validate-stack-sequences/)**</u>

## 题目

<p>给定 <code>pushed</code> 和 <code>popped</code> 两个序列，每个序列中的 <strong>值都不重复</strong>，只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 <code>true</code>；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
<strong>输出：</strong>true
<strong>解释：</strong>我们可以按以下顺序执行：
push(1), push(2), push(3), push(4), pop() -&gt; 4,
push(5), pop() -&gt; 5, pop() -&gt; 3, pop() -&gt; 2, pop() -&gt; 1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
<strong>输出：</strong>false
<strong>解释：</strong>1 不能在 2 之前弹出。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= pushed.length &lt;= 1000</code></li>
<li><code>0 &lt;= pushed[i] &lt;= 1000</code></li>
<li><code>pushed</code> 的所有元素 <strong>互不相同</strong></li>
<li><code>popped.length == pushed.length</code></li>
<li><code>popped</code> 是 <code>pushed</code> 的一个排列</li>
</ul>


## 分析

模拟过程，判断是否栈空即可。

## 解答

```python
def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:
	stack, j, n = [], 0, len(pushed)
	for num in pushed:
		stack.append(num)
		while stack and j < n and stack[-1] == popped[j]:
			stack.pop()
			j += 1
	return not stack
```
56 ms

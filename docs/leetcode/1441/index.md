# 1441：用栈操作构建数组（1180 分）


> <u>**[力扣第 188 场周赛第 1 题](https://leetcode.cn/problems/build-an-array-with-stack-operations/)**</u>

## 题目

<p>给你一个数组 <code>target</code> 和一个整数 <code>n</code>。每次迭代，需要从  <code>list = { 1 , 2 , 3 ..., n }</code> 中依次读取一个数字。</p>

<p>请使用下述操作来构建目标数组 <code>target</code> ：</p>

<ul>
<li><code>"Push"</code>：从 <code>list</code> 中读取一个新元素， 并将其推入数组中。</li>
<li><code>"Pop"</code>：删除数组中的最后一个元素。</li>
<li>如果目标数组构建完成，就停止读取更多元素。</li>
</ul>

<p>题目数据保证目标数组严格递增，并且只包含 <code>1</code> 到 <code>n</code> 之间的数字。</p>

<p>请返回构建目标数组所用的操作序列。如果存在多个可行方案，返回任一即可。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = [1,3], n = 3
<strong>输出：</strong>["Push","Push","Pop","Push"]
<strong>解释：
</strong>读取 1 并自动推入数组 -&gt; [1]
读取 2 并自动推入数组，然后删除它 -&gt; [1]
读取 3 并自动推入数组 -&gt; [1,3]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = [1,2,3], n = 3
<strong>输出：</strong>["Push","Push","Push"]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>target = [1,2], n = 4
<strong>输出：</strong>["Push","Push"]
<strong>解释：</strong>只需要读取前 2 个数字就可以停止。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= target.length &lt;= 100</code></li>
<li><code>1 &lt;= n &lt;= 100</code></li>
<li><code>1 &lt;= target[i] &lt;= n</code></li>
<li><code>target</code> 严格递增</li>
</ul>


**相似问题：**
- [2869：收集元素的最少操作次数（1272 分）](/leetcode/2869)


## 分析

显然 target 中存在的数经过了 Push 操作，而中间空缺的数都经过了 Push 和 Pop 操作。
比如示例 1 中 1 和 3 之间的空缺 2，必然是加入又马上删除了。

因此用 pre 记录上一个数，遍历 target，先添加 target-pre-1 次 Push 和 Pop，再添加 1 次 Push 即可。


## 解答

```python
def buildArray(self, target: List[int], n: int) -> List[str]:
	res, pre = [], 0
	for num in target:
		res.extend(['Push', 'Pop']*(num-pre-1) + ['Push'])
		pre = num
	return res
```

28 ms



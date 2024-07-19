# 0955：删列造序 II（1876 分）


> <u>**[力扣第 114 场周赛第 3 题](https://leetcode.cn/problems/delete-columns-to-make-sorted-ii/)**</u>

## 题目

<p>给定由 <code>n</code> 个字符串组成的数组 <code>strs</code>，其中每个字符串长度相等。</p>

<p>选取一个删除索引序列，对于 <code>strs</code> 中的每个字符串，删除对应每个索引处的字符。</p>

<p>比如，有 <code>strs = ["abcdef", "uvwxyz"]</code>，删除索引序列 <code>{0, 2, 3}</code>，删除后 <code>strs</code> 为<code>["bef", "vyz"]</code>。</p>

<p>假设，我们选择了一组删除索引 <code>answer</code>，那么在执行删除操作之后，最终得到的数组的元素是按 <strong>字典序</strong>（<code>strs[0] <= strs[1] <= strs[2] ... <= strs[n - 1]</code>）排列的，然后请你返回 <code>answer.length</code> 的最小可能值。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>strs = ["ca","bb","ac"]
<strong>输出：</strong>1
<strong>解释： </strong>
删除第一列后，strs = ["a", "b", "c"]。
现在 strs 中元素是按字典排列的 (即，strs[0] <= strs[1] <= strs[2])。
我们至少需要进行 1 次删除，因为最初 strs 不是按字典序排列的，所以答案是 1。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>strs = ["xc","yb","za"]
<strong>输出：</strong>0
<strong>解释：</strong>
strs 的列已经是按字典序排列了，所以我们不需要删除任何东西。
注意 strs 的行不需要按字典序排列。
也就是说，strs[0][0] <= strs[0][1] <= ... 不一定成立。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>strs = ["zyx","wvu","tsr"]
<strong>输出：</strong>3
<strong>解释：</strong>
我们必须删掉每一列。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == strs.length</code></li>
<li><code>1 <= n <= 100</code></li>
<li><code>1 <= strs[i].length <= 100</code></li>
<li><code>strs[i]</code> 由小写英文字母组成</li>
</ul>




## 分析

## #1

假如第一列是按字典序排列的，那么应该保留第一列，可以反证：
- 假如去掉第一列之后的最佳方案是保留成数组 A，按字典序排列
- 将第一列加到数组 A 上，依然保持字典序，矛盾

同理可以递推后面的情况，于是得到贪心策略：
- 维护当前保留的数组 A
- 遍历到某一列，假如 A 加上这一列后维持字典序，就保留，否则删除

```python
def minDeletionSize(self, strs: List[str]) -> int:
	res, A = 0, ['']*len(strs)
	for col in zip(*strs):
		B = [x+y for x,y in zip(A,col)]
		if B != sorted(B):
			res += 1
		else:
			A = B
	return res
```
48 ms

## #2

还可以优化：
- 对于当前保留的数组 A，假如 A[i] 严格小于 A[i+1]，那么后面的列就无需再比较此位置
- 因此维护当前无需再比较的位置 cut，在列内比较其它位置即可

## 解答

```python
def minDeletionSize(self, strs: List[str]) -> int:
	res, cut, n = 0, set(), len(strs)
	for col in zip(*strs):
		if all(i in cut or col[i]<=col[i+1] for i in range(n-1)):
			cut |= {i for i in range(n-1) if col[i]<col[i+1]}
		else:
			res += 1
	return res
```
48 ms


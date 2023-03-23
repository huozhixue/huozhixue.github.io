# 0364：加权嵌套序列和 II（★）


> <u>**[力扣第 364 题](https://leetcode.cn/problems/nested-list-weight-sum-ii/)**</u>

## 题目

<p>给你一个整数嵌套列表 <code>nestedList</code> ，每一个元素要么是一个整数，要么是一个列表（这个列表中的每个元素也同样是整数或列表）。</p>

<p>整数的 <strong>深度</strong> 取决于它位于多少个列表内部。例如，嵌套列表 <code>[1,[2,2],[[3],2],1]</code> 的每个整数的值都等于它的 <strong>深度</strong> 。令 <code>maxDepth</code> 是任意整数的 <strong>最大深度</strong> 。</p>

<p>整数的 <strong>权重</strong> 为 <code>maxDepth - (整数的深度) + 1</code> 。</p>

<p>将 <code>nestedList</code> 列表中每个整数先乘权重再求和，返回该加权和。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/nestedlistweightsumiiex1.png" style="width: 426px; height: 181px;" />
<pre>
<strong>输入：</strong>nestedList = [[1,1],2,[1,1]]
<strong>输出：</strong>8
<strong>解释：</strong>4<strong> </strong>个 1 在深度为 1 的位置， 一个 2 在深度为 2 的位置。
1*1 + 1*1 + 2*2 + 1*1 + 1*1 = 8
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/27/nestedlistweightsumiiex2.png" style="width: 349px; height: 192px;" />
<pre>
<strong>输入：</strong>nestedList = [1,[4,[6]]]
<strong>输出：</strong>17
<strong>解释：</strong>一个 1 在深度为 3 的位置， 一个 4 在深度为 2 的位置，一个 6 在深度为 1 的位置。
1*3 + 4*2 + 6*1 = 17
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= nestedList.length &lt;= 50</code></li>
<li>嵌套列表中整数的值在范围 <code>[-100, 100]</code></li>
<li>任意整数的最大 <strong>深度</strong> 小于等于 <code>50</code></li>
</ul>


## 分析

类似 {{< lc "0339" >}}，只是递归过程中维护最大深度 maxDepth 和所有整数之和 total 即可。

## 解答


```python []
def depthSumInverse(self, nestedList: List[NestedInteger]) -> int:
	def dfs(nest, w):
		if nest.isInteger():
			self.total += nest.getInteger()
			self.w = max(self.w, w)
			return w*nest.getInteger()
		return sum(dfs(sub, w+1) for sub in nest.getList())
	self.total, self.w = 0, 0
	return -sum(dfs(nest, 1) for nest in nestedList)+(self.w+1)*self.total
```


# 0559：N 叉树的最大深度


> <u>**[力扣第 559 题](https://leetcode.cn/problems/maximum-depth-of-n-ary-tree/)**</u>

## 题目

<p>给定一个 N 叉树，找到其最大深度。</p>

<p class="MachineTrans-lang-zh-CN">最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。</p>

<p class="MachineTrans-lang-zh-CN">N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。</p>

<p class="MachineTrans-lang-zh-CN"> </p>

<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="width: 100%; max-width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,3,2,4,null,5,6]
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="width: 296px; height: 241px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
<strong>输出：</strong>5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树的深度不会超过 <code>1000</code> 。</li>
<li>树的节点数目位于 <code>[0, 10<sup>4</sup>]</code> 之间。</li>
</ul>


## 分析

### #1

类似 {{< lc "0104" >}} ，可以层序遍历，记录有多少层即可。

```python
def maxDepth(self, root: 'Node') -> int:
	if not root:
		return 0
	D, level = 0, [root]
	while level:
		D += 1
		level = [child for node in level for child in node.children]
	return D
```

44 ms

### #2

也可以用递归。

## 解答

```python
def maxDepth(self, root: 'Node') -> int:
	return 0 if not root else (1 if not root.children else max(map(self.maxDepth, root.children)) + 1)```

52 ms


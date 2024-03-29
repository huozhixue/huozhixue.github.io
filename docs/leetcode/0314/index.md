# 0314：二叉树的垂直遍历（★）


> <u>**[力扣第 314 题](https://leetcode.cn/problems/binary-tree-vertical-order-traversal/)**</u>

## 题目

<p>给你一个二叉树的根结点，返回其结点按 <strong>垂直方向</strong>（从上到下，逐列）遍历的结果。</p>

<p>如果两个结点在同一行和列，那么顺序则为 <strong>从左到右</strong>。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/vtree1.jpg" style="width: 282px; height: 301px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[9],[3,15],[20],[7]]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/vtree2-1.jpg" style="width: 462px; height: 222px;" />
<pre>
<strong>输入：</strong>root = [3,9,8,4,0,1,7]
<strong>输出：</strong>[[4],[9],[3,0,1],[8],[7]]
</pre>

<p><strong>示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/28/vtree2.jpg" style="width: 462px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,8,4,0,1,7,null,null,null,2,5]
<strong>输出：</strong>[[4],[9,5],[3,0,1],[8,2],[7]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中结点的数目在范围 <code>[0, 100]</code> 内</li>
<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
</ul>


## 分析

中序遍历并按坐标存到哈希表中，最后再按排序后的坐标输出即可。

## 解答

```python
def verticalOrder(self, root: TreeNode) -> List[List[int]]:
    d = defaultdict(lambda: defaultdict(list))
    stack = [(root, 0, 0)]
    while stack:
        node, x, y = stack.pop()
        if node:
            d[x][y].append(node.val)
            stack.extend([(node.right, x+1, y+1), (node.left, x-1,y+1)])
    return [[val for y in sorted(d[x]) for val in d[x][y]] for x in sorted(d)]
```
32 ms




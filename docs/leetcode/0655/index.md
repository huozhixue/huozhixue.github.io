# 0655：输出二叉树（★）


> <u>**[力扣第 655 题](https://leetcode.cn/problems/print-binary-tree/)**</u>

## 题目

<p>给你一棵二叉树的根节点 <code>root</code> ，请你构造一个下标从 <strong>0</strong> 开始、大小为 <code>m x n</code> 的字符串矩阵 <code>res</code> ，用以表示树的 <strong>格式化布局</strong> 。构造此格式化布局矩阵需要遵循以下规则：</p>

<ul>
<li>树的 <strong>高度</strong> 为 <code>height</code> ，矩阵的行数 <code>m</code> 应该等于 <code>height + 1</code> 。</li>
<li>矩阵的列数 <code>n</code> 应该等于 <code>2<sup>height+1</sup> - 1</code> 。</li>
<li><strong>根节点</strong> 需要放置在 <strong>顶行</strong> 的 <strong>正中间</strong> ，对应位置为 <code>res[0][(n-1)/2]</code> 。</li>
<li>对于放置在矩阵中的每个节点，设对应位置为 <code>res[r][c]</code> ，将其左子节点放置在 <code>res[r+1][c-2<sup>height-r-1</sup>]</code> ，右子节点放置在 <code>res[r+1][c+2<sup>height-r-1</sup>]</code> 。</li>
<li>继续这一过程，直到树中的所有节点都妥善放置。</li>
<li>任意空单元格都应该包含空字符串 <code>""</code> 。</li>
</ul>

<p>返回构造得到的矩阵<em> </em><code>res</code> 。</p>





<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/03/print1-tree.jpg" style="width: 141px; height: 181px;" />
<pre>
<strong>输入：</strong>root = [1,2]
<strong>输出：</strong>
[["","1",""],
["2","",""]]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/03/print2-tree.jpg" style="width: 207px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,null,4]
<strong>输出：</strong>
[["","","","1","","",""],
["","2","","","","3",""],
["","","4","","","",""]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点数在范围 <code>[1, 2<sup>10</sup>]</code> 内</li>
<li><code>-99 &lt;= Node.val &lt;= 99</code></li>
<li>树的深度在范围 <code>[1, 10]</code> 内</li>
</ul>


## 分析

观察发现 n = (2<<m)-1。于是先递归求得二叉树高度 m，便可以初始化结果数组 res。

然后遍历二叉树，节点在 res 中的行号 x 可以由父节点推得，然而列号 y 不能直接推得。

观察发现节点的子树在 res 中的左右边界 y1、y2 可以由父节点的左右边界推得，而 y = (y1+y2) // 2。
因此遍历时传递 x、y1、y2 即可。

## 解答

```python
def printTree(self, root: TreeNode) -> List[List[str]]:
    def help(root):
        return 0 if not root else max(help(root.left), help(root.right)) + 1

    m = help(root)
    n = (1 << m) - 1
    res = [[''] * n for _ in range(m)]
    stack = [(root, 0, 0, n - 1)]
    while stack:
        node, x, y1, y2 = stack.pop()
        if node:
            y = (y1 + y2) // 2
            res[x][y] = str(node.val)
            stack.extend([(node.left, x + 1, y1, y - 1), (node.right, x + 1, y + 1, y2)])
    return res
```

44 ms
 


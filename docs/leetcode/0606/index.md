# 0606：根据二叉树创建字符串（★）


> <u>**[力扣第 606 题](https://leetcode.cn/problems/construct-string-from-binary-tree/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> ，请你采用前序遍历的方式，将二叉树转化为一个由括号和整数组成的字符串，返回构造出的字符串。</p>

<p>空节点使用一对空括号对 <code>"()"</code> 表示，转化后需要省略所有不影响字符串与原始二叉树之间的一对一映射关系的空括号对。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/03/cons1-tree.jpg" style="width: 292px; height: 301px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4]
<strong>输出：</strong>"1(2(4))(3)"
<strong>解释：</strong>初步转化后得到 "1(2(4)())(3()())" ，但省略所有不必要的空括号对后，字符串应该是"1(2(4))(3)" 。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/03/cons2-tree.jpg" style="width: 207px; height: 293px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,null,4]
<strong>输出：</strong>"1(2()(4))(3)"
<strong>解释：</strong>和第一个示例类似，但是无法省略第一个空括号对，否则会破坏输入与输出一一映射的关系。</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目范围是 <code>[1, 10<sup>4</sup>]</code></li>
<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>
</div>
</div>


## 分析

递归即可。根据左右子树是否为空判断是否省略括号。
	

## 解答

```python
def tree2str(self, root: TreeNode) -> str:
    if not root:
        return ''
    if not root.left and not root.right:
        return str(root.val)
    if not root.right:
        return '%d(%s)' % (root.val, self.tree2str(root.left))
    return '%d(%s)(%s)' % (root.val, self.tree2str(root.left), self.tree2str(root.right))
```

64 ms


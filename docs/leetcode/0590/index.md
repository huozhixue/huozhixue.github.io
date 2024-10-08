# 0590：N 叉树的后序遍历


> <u>**[力扣第 590 题](https://leetcode.cn/problems/n-ary-tree-postorder-traversal/)**</u>

## 题目

<p>给定一个 n 叉树的根节点<meta charset="UTF-8" /> <code>root</code> ，返回 <em>其节点值的<strong> 后序遍历</strong></em> 。</p>

<p>n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 <code>null</code> 分隔（请参见示例）。</p>



<p><strong class="example">示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png" style="height: 193px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,3,2,4,null,5,6]
<strong>输出：</strong>[5,6,3,2,4,1]
</pre>

<p><strong class="example">示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png" style="height: 269px; width: 296px;" /></p>

<pre>
<strong>输入：</strong>root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
<strong>输出：</strong>[2,6,14,11,7,3,12,8,4,13,9,10,5,1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>节点总数在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>
<li><code>0 &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
<li>n 叉树的高度小于或等于 <code>1000</code></li>
</ul>



<p><strong>进阶：</strong>递归法很简单，你可以使用迭代法完成此题吗?</p>


**相似问题：**
- [0145：二叉树的后序遍历](/leetcode/0145)
- [0429：N 叉树的层序遍历](/leetcode/0429)
- [0589：N 叉树的前序遍历](/leetcode/0589)


## 分析


和 {{< lc "0145" >}} 二叉树遍历类似，注意入栈顺序即可。

## 解答

```python
class Solution:
    def postorder(self, root: 'Node') -> List[int]:
        res,sk = [],[root] if root else []
        while sk:
            u = sk.pop()
            if isinstance(u,int):
                res.append(u)
            else:
                sk.extend([u.val]+u.children[::-1])
        return res
```

42 ms


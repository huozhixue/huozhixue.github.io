# 0116：填充每个节点的下一个右侧节点指针（★）


> <u>**[力扣第 116 题](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)**</u>

## 题目

<p>给定一个 <strong>完美二叉树 </strong>，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：</p>

<pre>
struct Node {
int val;
Node *left;
Node *right;
Node *next;
}</pre>

<p>填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 <code>NULL</code>。</p>

<p>初始状态下，所有 next 指针都被设置为 <code>NULL</code>。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/02/14/116_sample.png" style="height: 171px; width: 500px;" /></p>

<pre>
<b>输入：</b>root = [1,2,3,4,5,6,7]
<b>输出：</b>[1,#,2,3,#,4,5,6,7,#]
<b>解释：</b>给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
</pre>

<p><meta charset="UTF-8" /></p>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>root = []
<b>输出：</b>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数量在<meta charset="UTF-8" /> <code>[0, 2<sup>12</sup> - 1]</code> 范围内</li>
<li><code>-1000 &lt;= node.val &lt;= 1000</code></li>
</ul>



<p><strong>进阶：</strong></p>

<ul>
<li>你只能使用常量级额外空间。</li>
<li>使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。</li>
</ul>


## 分析

### #1

最简单的就是层序遍历，每一层填充即可。

```python
class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        Q = [root] if root else []
        while Q:
            for u,v in pairwise(Q):
                u.next = v
            Q = [c for u in Q for c in [u.left,u.right] if c]
        return root
```
54 ms

### #2

要求不用额外空间，有个巧妙的想法
- 每层提前填充下一层的 next 指针
- 每层根据 next 指针即可遍历
	
## 解答

```python
class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        u = root
        while u and u.left:
            p = u
            while p:
                p.left.next = p.right
                if p.next:
                    p.right.next = p.next.left
                p = p.next
            u = u.left
        return root
```
38 ms


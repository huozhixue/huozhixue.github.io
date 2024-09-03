# 0572：另一棵树的子树


> <u>**[力扣第 572 题](https://leetcode.cn/problems/subtree-of-another-tree/)**</u>

## 题目

<div class="original__bRMd">
<div>
<p>给你两棵二叉树 <code>root</code> 和 <code>subRoot</code> 。检验 <code>root</code> 中是否包含和 <code>subRoot</code> 具有相同结构和节点值的子树。如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>二叉树 <code>tree</code> 的一棵子树包括 <code>tree</code> 的某个节点和这个节点的所有后代节点。<code>tree</code> 也可以看做它自身的一棵子树。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg" style="width: 532px; height: 400px;" />
<pre>
<strong>输入：</strong>root = [3,4,5,1,2], subRoot = [4,1,2]
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg" style="width: 502px; height: 458px;" />
<pre>
<strong>输入：</strong>root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>root</code> 树上的节点数量范围是 <code>[1, 2000]</code></li>
<li><code>subRoot</code> 树上的节点数量范围是 <code>[1, 1000]</code></li>
<li><code>-10<sup>4</sup> <= root.val <= 10<sup>4</sup></code></li>
<li><code>-10<sup>4</sup> <= subRoot.val <= 10<sup>4</sup></code></li>
</ul>
</div>
</div>


**相似问题：**
- [0250：统计同值子树](/leetcode/0250)
- [0508：出现次数最多的子树元素和](/leetcode/0508)


## 分析

- 容易想到递归方法，先比较 root 和 subRoot，不相等就递归到 root 的子树
- 判断是否相同即是问题 {{< lc "0100" >}} ，可以通过遍历或递归解决
- 两重递归有些浪费时间了，有个巧妙的想法是将树序列化，就可以直接比较了
- 更进一步， t 是 s 的子树就等价于 t 的序列化是 s 的序列化的子串

## 解答

```python
class Solution:
    def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:
        def dfs(u):
            if not u:
                return 'None'
            return '(%d,%s,%s)' % (u.val, dfs(u.left), dfs(u.right))
        return dfs(subRoot) in dfs(root)
```
60 ms


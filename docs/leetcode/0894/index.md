# 0894：所有可能的真二叉树（1784 分）


> <u>**[力扣第 99 场周赛第 3 题](https://leetcode.cn/problems/all-possible-full-binary-trees/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你找出所有可能含 <code>n</code> 个节点的 <strong>真二叉树</strong> ，并以列表形式返回。答案中每棵树的每个节点都必须符合 <code>Node.val == 0</code> 。</p>

<p>答案的每个元素都是一棵真二叉树的根节点。你可以按 <strong>任意顺序</strong> 返回最终的真二叉树列表<strong>。</strong></p>

<p><strong>真二叉树</strong> 是一类二叉树，树中每个节点恰好有 <code>0</code> 或 <code>2</code> 个子节点。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/08/22/fivetrees.png" style="width: 700px; height: 400px;" />
<pre>
<strong>输入：</strong>n = 7
<strong>输出：</strong>[[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>[[0,0,0]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 20</code></li>
</ul>




## 分析

按左右子树分别有多少个节点，可以转为递归子问题。
最简单的子问题即是 n=1，只有根节点。

注意满二叉树的节点数必然是奇数，可以节省时间。

## 解答

```python
def allPossibleFBT(self, n: int) -> List[TreeNode]:
    if n % 2 == 0:
        return []
    if n == 1:
        return [TreeNode(0)]
    res = []
    for i in range(1, n-1, 2):
        for left in self.allPossibleFBT(i):
            for right in self.allPossibleFBT(n-1-i):
                res.append(TreeNode(0, left, right))
    return res
```

128 ms


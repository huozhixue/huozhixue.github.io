# 0652：寻找重复的子树（★）


> <u>**[力扣第 652 题](https://leetcode.cn/problems/find-duplicate-subtrees/)**</u>

## 题目

<p>给你一棵二叉树的根节点 <code>root</code> ，返回所有 <strong>重复的子树 </strong>。</p>

<p>对于同一类的重复子树，你只需要返回其中任意 <strong>一棵 </strong>的根结点即可。</p>

<p>如果两棵树具有<strong> 相同的结构</strong> 和 <strong>相同的结点值 </strong>，则认为二者是 <strong>重复 </strong>的。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/08/16/e1.jpg" style="height: 236px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>root = [1,2,3,4,null,2,4,null,null,4]
<strong>输出：</strong>[[2,4],[4]]</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2020/08/16/e2.jpg" style="height: 125px; width: 200px;" /></p>

<pre>
<strong>输入：</strong>root = [2,1,1]
<strong>输出：</strong>[[1]]</pre>

<p><strong>示例 3：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode.com/uploads/2020/08/16/e33.jpg" style="height: 202px; width: 300px;" /></strong></p>

<pre>
<strong>输入：</strong>root = [2,2,2,3,null,3,null]
<strong>输出：</strong>[[2,3],[3]]</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中的结点数在 <code>[1, 5000]</code> 范围内。</li>
<li><code>-200 &lt;= Node.val &lt;= 200</code></li>
</ul>


**相似问题：**
- [0297：二叉树的序列化与反序列化](/leetcode/0297)
- [0449：序列化和反序列化二叉搜索树](/leetcode/0449)
- [0606：根据二叉树创建字符串](/leetcode/0606)
- [1948：删除系统中的重复文件夹（2533 分）](/leetcode/1948)


## 分析

需要判断任意两个子树是否相同，可以将每个子树都序列化，方便比较。

更进一步，用哈希表保存序列化值出现的次数，一趟遍历即可。

## 解答

```python
def findDuplicateSubtrees(self, root: TreeNode) -> List[TreeNode]:
    def serial(root):
        key = '#' if not root else '%d,%s,%s' % (root.val, serial(root.left), serial(root.right))
        d[key] += 1
        if key != '#' and d[key] == 2:
            res.append(root)
        return key

    res, d = [], defaultdict(int)
    serial(root)
    return res
```

80 ms
 


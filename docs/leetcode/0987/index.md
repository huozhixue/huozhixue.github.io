# 0987：二叉树的垂序遍历（1675 分）


> <u>**[力扣第 122 场周赛第 4 题](https://leetcode.cn/problems/vertical-order-traversal-of-a-binary-tree/)**</u>

## 题目

<p>给你二叉树的根结点 <code>root</code> ，请你设计算法计算二叉树的<em> </em><strong>垂序遍历</strong> 序列。</p>

<p>对位于 <code>(row, col)</code> 的每个结点而言，其左右子结点分别位于 <code>(row + 1, col - 1)</code> 和 <code>(row + 1, col + 1)</code> 。树的根结点位于 <code>(0, 0)</code> 。</p>

<p>二叉树的 <strong>垂序遍历</strong> 从最左边的列开始直到最右边的列结束，按列索引每一列上的所有结点，形成一个按出现位置从上到下排序的有序列表。如果同行同列上有多个结点，则按结点的值从小到大进行排序。</p>

<p>返回二叉树的 <strong>垂序遍历</strong> 序列。</p>



<p><strong class="example">示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/29/vtree1.jpg" style="width: 431px; height: 304px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[9],[3,15],[20],[7]]
<strong>解释：</strong>
列 -1 ：只有结点 9 在此列中。
列  0 ：只有结点 3 和 15 在此列中，按从上到下顺序。
列  1 ：只有结点 20 在此列中。
列  2 ：只有结点 7 在此列中。</pre>

<p><strong class="example">示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/29/vtree2.jpg" style="width: 512px; height: 304px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4,5,6,7]
<strong>输出：</strong>[[4],[2],[1,5,6],[3],[7]]
<strong>解释：</strong>
列 -2 ：只有结点 4 在此列中。
列 -1 ：只有结点 2 在此列中。
列  0 ：结点 1 、5 和 6 都在此列中。
1 在上面，所以它出现在前面。
5 和 6 位置都是 (2, 0) ，所以按值从小到大排序，5 在 6 的前面。
列  1 ：只有结点 3 在此列中。
列  2 ：只有结点 7 在此列中。
</pre>

<p><strong class="example">示例 3：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/29/vtree3.jpg" style="width: 512px; height: 304px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4,6,5,7]
<strong>输出：</strong>[[4],[2],[1,5,6],[3],[7]]
<strong>解释：</strong>
这个示例实际上与示例 2 完全相同，只是结点 5 和 6 在树中的位置发生了交换。
因为 5 和 6 的位置仍然相同，所以答案保持不变，仍然按值从小到大排序。</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中结点数目总数在范围 <code>[1, 1000]</code> 内</li>
<li><code>0 &lt;= Node.val &lt;= 1000</code></li>
</ul>




## 分析

- 遍历树节点 u，假如其位于 (i,j)，将 (i,u.val) 添加到 j 列的列表中
- 按列号排序，每一列对应的列表也排序，返回即可

## 解答


```python
class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        d = defaultdict(list)
        sk = [(root,0,0)]
        while sk:
            u,i,j = sk.pop()
            if u:
                d[j].append((i,u.val))
                sk.extend([(u.right,i+1,j+1),(u.left,i+1,j-1)])
        return [[y for _,y in sorted(d[x])] for x in sorted(d)]
```
0 ms

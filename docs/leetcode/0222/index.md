# 0222：完全二叉树的节点个数


> <u>**[力扣第 222 题](https://leetcode.cn/problems/count-complete-tree-nodes/)**</u>

## 题目

<p>给你一棵<strong> 完全二叉树</strong> 的根节点 <code>root</code> ，求出该树的节点个数。</p>

<p><a href="https://baike.baidu.com/item/%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91/7773232?fr=aladdin">完全二叉树</a> 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 <code>h</code> 层，则该层包含 <code>1~ 2<sup>h</sup></code> 个节点。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/14/complete.jpg" style="width: 372px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [1,2,3,4,5,6]
<strong>输出：</strong>6
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点的数目范围是<code>[0, 5 * 10<sup>4</sup>]</code></li>
<li><code>0 <= Node.val <= 5 * 10<sup>4</sup></code></li>
<li>题目数据保证输入的树是 <strong>完全二叉树</strong></li>
</ul>



<p><strong>进阶：</strong>遍历树来统计节点是一种时间复杂度为 <code>O(n)</code> 的简单解决方案。你可以设计一个更快的算法吗？</p>


## 分析

递归很简单，要求比 O(N) 更快，考虑二分：
- 先遍历到最底层最左边的节点，得到高度 h
- 该完全二叉树的节点数 x 必然满足 x<=2^h-1
- 以节点数 x 为界，序号 [1, x] 的节点都存在，序号 [x+1, 2^h-1] 都不存在
- 因此可以二分查找 x 是否存在
- 判断序号 x 是否存在，可以按 x 的二进制遍历树

## 解答

```python
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        def check(x):
            p = root
            for bit in bin(x)[3:]:
                p=p.left if bit=='0' else p.right
                if not p:
                    return True
            return False
        h,p = 0,root
        while p:
            p=p.left
            h+=1
        return bisect_left(range(1<<h),True,(1<<h)//2,key=check)-1
```
52 ms

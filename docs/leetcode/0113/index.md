# 0113：路径总和 II（★）


> <u>**[力扣第 113 题](https://leetcode.cn/problems/path-sum-ii/)**</u>

## 题目

<p>给你二叉树的根节点 <code>root</code> 和一个整数目标和 <code>targetSum</code> ，找出所有 <strong>从根节点到叶子节点</strong> 路径总和等于给定目标和的路径。</p>

<p><strong>叶子节点</strong> 是指没有子节点的节点。</p>

<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg" style="width: 500px; height: 356px;" />
<pre>
<strong>输入：</strong>root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
<strong>输出：</strong>[[5,4,11,2],[5,8,4,5]]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg" style="width: 212px; height: 181px;" />
<pre>
<strong>输入：</strong>root = [1,2,3], targetSum = 5
<strong>输出：</strong>[]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = [1,2], targetSum = 0
<strong>输出：</strong>[]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li>树中节点总数在范围 <code>[0, 5000]</code> 内</li>
<li><code>-1000 <= Node.val <= 1000</code></li>
<li><code>-1000 <= targetSum <= 1000</code></li>
</ul>
</div>
</div>


## 分析


类似 {{< lc "0112" >}}，可以用递归或遍历，这里用递归。

## 解答

```python
def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
    def dfs(p, x):
        if not p:
            return []
        if not p.left and not p.right and p.val==x:
            return [[x]]
        return [[p.val]+sub for sub in dfs(p.left, x-p.val) + dfs(p.right, x-p.val)]
    return dfs(root, targetSum)
```
60 ms


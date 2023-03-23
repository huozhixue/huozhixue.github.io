# 0250：统计同值子树（★）


> <u>**[力扣第 250 题](https://leetcode.cn/problems/count-univalue-subtrees/)**</u>

## 题目

<p>给定一个二叉树，统计该二叉树数值相同的子树个数。</p>

<p>同值子树是指该子树的所有节点都拥有相同的数值。</p>

<p><strong>示例：</strong></p>

<pre><strong>输入: </strong>root = [5,1,5,5,5,null,5]

5
/ \
1   5
/ \   \
5   5   5

<strong>输出:</strong> 4
</pre>


## 分析

可以递归判断每个子树是否是同值子树，递归过程中统计即可。

## 解答

```python
def countUnivalSubtrees(self, root: Optional[TreeNode]) -> int:
    def dfs(node):
        if not node:
            return True
        flag = True
        if node.left:
            flag &= dfs(node.left) and node.left.val==node.val
        if node.right:
            flag &= dfs(node.right) and node.right.val==node.val
        self.res += flag
        return flag
    
    self.res = 0
    dfs(root)
    return self.res
```
36 ms

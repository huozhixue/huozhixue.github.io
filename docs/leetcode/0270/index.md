# 0270：最接近的二叉搜索树值


> <u>**[力扣第 270 题](https://leetcode.cn/problems/closest-binary-search-tree-value/)**</u>

## 题目

<p>给定一个不为空的二叉搜索树和一个目标值 target，请在该二叉搜索树中找到最接近目标值 target 的数值。</p>

<p><strong>注意：</strong></p>

<ul>
<li>给定的目标值 target 是一个浮点数</li>
<li>题目保证在该二叉搜索树中只会存在一个最接近目标值的数</li>
</ul>

<p><strong>示例：</strong></p>

<pre><strong>输入:</strong> root = [4,2,5,1,3]，目标值 target = 3.714286

4
/ \
2   5
/ \
1   3

<strong>输出:</strong> 4
</pre>


## 分析

遍历并比较即可：
- 先比较 root 和 target
- 如果 root 比 target 小，那么左子树的节点都离 target 更远，继续遍历 root 的右子树即可
- 同理，如果 root 比 target 大，继续遍历 root 的左子树即可


## 解答

```python
def closestValue(self, root: Optional[TreeNode], target: float) -> int:
    res, p = inf, root
    while p:
        res = min([res, p.val], key=lambda x: abs(x-target))
        p = p.left if p.val>target else p.right
    return res
```
36 ms


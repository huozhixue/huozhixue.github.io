# 0222：完全二叉树的节点个数（★★★）


## 题目

给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，
并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/14/complete.jpg)

    输入：root = [1,2,3,4,5,6]
    输出：6

示例 2：

    输入：root = []
    输出：0

示例 3：
    
    输入：root = [1]
    输出：1
 
 
提示：
- 树中节点的数目范围是[0, 5 * 10^4]
- 0 <= Node.val <= 5 * 10^4
- 题目数据保证输入的树是 完全二叉树

进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？

## 分析

递归很简单。

## 解答

```python
def countNodes(self, root: TreeNode) -> int:
    return 0 if not root else 1 + self.countNodes(root.left)+self.countNodes(root.right)
```
64 ms

## *附加

利用完全二叉树的特性，还有个巧妙的二分查找方法。
- 先遍历到最底层最左边的节点，得到高度 h
- 该完全二叉树的节点数 x 必然满足 x<=2^(h+1)-1
- 以节点数 x 为界，序号 [1, x] 的节点都存在，序号 [x+1, M] 都不存在
- 因此可以在 [0， 2^(h+1)-1] 范围内二分查找 x
- 判断序号 y 是否存在，可以按 y 的二进制遍历树


```python
def countNodes(self, root: TreeNode) -> int:
    def check(x):
        p = root
        for bit in bin(x)[3:]:
            p = p.left if bit == '0' else p.right
            if not p:
                return True
        return False

    h, p = 0, root
    while p:
        p = p.left
        h += 1
    self.__class__.__getitem__ = lambda self, x: check(x)
    return bisect_left(self, True, 1, 1<<h) - 1
```
时间复杂度 $O(log^2 N)$，84 ms

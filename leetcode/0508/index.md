# 0508：出现次数最多的子树元素和（★★）


## 题目

给你一个二叉树的根结点，请你找出出现次数最多的子树元素和。
一个结点的「子树元素和」定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。

你需要返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。

提示： 假设任意子树元素和均可以用 32 位有符号整数表示。

 <!--more--> 
 
示例 1：

    输入:
    
      5
     /  \
    2   -3
    返回 [2, -3, 4]，所有的值均只出现一次，以任意顺序返回所有值。

示例 2：

    输入：
    
      5
     /  \
    2   -5
    返回 [2]，只有 2 出现两次，-5 只出现 1 次。

## 分析

统计所有的子树元素和即可。计算根节点的递归过程中就可以完成统计了。

## 解答

```python
def findFrequentTreeSum(self, root: TreeNode) -> List[int]:
    def help(root):
        if not root:
            return 0
        key = root.val + help(root.left) + help(root.right)
        ct[key] += 1
        return key

    ct = Counter()
    help(root)
    M = max(ct.values())
    return [key for key in ct if ct[key] == M]
```

64 ms

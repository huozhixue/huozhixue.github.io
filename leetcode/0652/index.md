# 0652：寻找重复的子树（★）


## 题目

给定一棵二叉树，返回所有重复的子树。对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。

两棵树重复是指它们具有相同的结构以及相同的结点值。



 <!--more--> 

示例 1：

            1
           / \
          2   3
         /   / \
        4   2   4
           /
          4
    下面是两个重复的子树：
    
          2
         /
        4
    和
    
        4
    因此，你需要以列表的形式返回上述重复子树的根结点。


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
 


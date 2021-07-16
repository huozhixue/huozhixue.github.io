# 0572：另一个树的子树（★）


## 题目

给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。
s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。



 <!--more--> 
 
示例 1:

    给定的树 s:
    
         3
        / \
       4   5
      / \
     1   2
    给定的树 t：
    
       4 
      / \
     1   2
    返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。

示例 2:

    给定的树 s：
    
         3
        / \
       4   5
      / \
     1   2
        /
       0
    给定的树 t：
    
       4
      / \
     1   2
    返回 false。

	
## 分析

### #1

容易想到递归方法，先比较 root 和 subRoot，不相等就递归到 root 的子树。

判断是否相同即是问题 {{< lc "0100" >}}，可以通过遍历或递归解决。

两重递归有些浪费时间了，有个巧妙的想法是将树序列化，就可以直接比较了。

用 '#' 表示空节点，那么任意遍历得到的列表都一一对应二叉树。保存每棵子树对应的序列即可。

```python
def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:
    @lru_cache(None)
    def serial(root):
        return '#' if not root else '%d,%s,%s' % (root.val, serial(root.left), serial(root.right))

    def help(root):
        return bool(root) and (serial(root) == serial(subRoot) or help(root.left) or help(root.right))
    return help(root)
```

92 ms

### #2

还可以更进一步，按类似字典的形式将树序列化，那么 t 是 s 的子树就等价于 t 的序列化是 s 的序列化的子串。

## 解答

```python
def isSubtree(self, root: TreeNode, subRoot: TreeNode) -> bool:
    def serial(root):
        return 'None' if not root else '{val:%d,left:%s,right:%s}' % (root.val,serial(root.left),serial(root.right))
    return serial(subRoot) in serial(root)
```

80 ms


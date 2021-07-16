# 0894：所有可能的满二叉树（★★）



## 题目

满二叉树是一类二叉树，其中每个结点恰好有 0 或 2 个子结点。

返回包含 N 个结点的所有可能满二叉树的列表。 答案的每个元素都是一个可能树的根结点。

答案中每个树的每个结点都必须有 node.val=0。

你可以按任何顺序返回树的最终列表。

提示： 1 <= N <= 20

 <!--more--> 
 
示例：

    输入：7
    输出：[[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],
    [0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
    解释：
    
![img](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/08/24/fivetrees.png)

## 分析

按左右子树分别有多少个节点，可以转为递归子问题。
最简单的子问题即是 n=1，只有根节点。

注意满二叉树的节点数必然是奇数，可以节省时间。

## 解答

```python
def allPossibleFBT(self, n: int) -> List[TreeNode]:
    if n % 2 == 0:
        return []
    if n == 1:
        return [TreeNode(0)]
    res = []
    for i in range(1, n-1, 2):
        for left in self.allPossibleFBT(i):
            for right in self.allPossibleFBT(n-1-i):
                res.append(TreeNode(0, left, right))
    return res
```

128 ms


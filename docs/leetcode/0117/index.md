# 0117：填充每个节点的下一个右侧节点指针 II（★★）


## 题目

给定一个二叉树：

	struct Node {
	  int val;
	  Node *left;
	  Node *right;
	  Node *next;
	}

填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

进阶：
- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 

示例：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/15/117_sample.png)

	输入：	root = [1,2,3,4,5,null,7]
	输出：	[1,#,2,3,#,4,5,7,#]
	解释：	给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，
	如图 B 所示。序列化输出按层序遍历顺序（由 next 指针连接），'#' 表示每层的末尾。
	
提示：
- 树中的节点数小于 6000
- -100 <= node.val <= 100

## 分析

### #1

与 {{< lc "0116" >}} 的区别在于不是完美二叉树了。

层序遍历的代码相同。

```python
def connect(self, root: 'Node') -> 'Node':
    Q = [root] if root else []
    while Q:
        for p, q in pairwise(Q):
            p.next = q
        Q = [child for p in Q for child in [p.left, p.right] if child]
    return root
```
52 ms

### #2

依然可以每层提前填充下一层的 next 指针。额外添加哑结点，并记录前置节点即可。
	
## 解答

```python
def connect(self, root: 'Node') -> 'Node':
    p = root
    while p:
        dummy = prev = Node()
        while p:
            for child in [p.left, p.right]:
                if child:
                    prev.next = child
                    prev = child
            p = p.next
        p = dummy.next
    return root
```
52 ms


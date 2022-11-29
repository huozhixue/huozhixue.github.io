# 0297：二叉树的序列化与反序列化（★★★）


## 题目

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，
同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg)

	输入：root = [1,2,3,null,null,4,5]
	输出：[1,2,3,null,null,4,5]

示例 2：

	输入：root = []
	输出：[]

示例 3：

	输入：root = [1]
	输出：[1]

示例 4：

	输入：root = [1,2]
	输出：[1,2]
 

提示：
- 树中结点数在范围 [0, 10^4] 内
- -1000 <= Node.val <= 1000


## 分析

### #1

最简单粗暴的是 json 做法，

将树转为多重字典，用 json 序列化/反序列化。

```python
class Codec:

    def serialize(self, root):
        def dfs(node):
            if not node:
                return 'None'
            return {'val': node.val, 'left':dfs(node.left), 'right':dfs(node.right) }
        return json.dumps(dfs(root))

    def deserialize(self, data): 
        def dfs(data):
            if data=='None':
                return None
            return TreeNode(data['val'], dfs(data['left']), dfs(data['right']))
        return dfs(json.loads(data))
```
128 ms

### #2

也可以用树的遍历列表来对应，空节点用 '#' 表示即可。

这里采用前序遍历：
- 序列化时，递归地拼接遍历列表。
- 反序列化时，从遍历列表 Q 中弹出第一个元素作为 root，然后递归地构建左右子树。
遇到空节点时就返回上一层递归即可。

## 解答

```python
class Codec:

    def serialize(self, root):
        def dfs(node):
            if not node:
                return '#'
            return '%d,%s,%s' % (node.val, dfs(node.left), dfs(node.right))
        return dfs(root)

    def deserialize(self, data):
        def dfs():
            val = Q.popleft()
            return None if val=='#' else TreeNode(val, dfs(), dfs())

        Q = deque(data.split(','))
        return dfs()
```
100 ms


# 0297：二叉树的序列化与反序列化（★★★）


## 题目

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，
同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，
你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

<!--more--> 

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


## 分析

用 '#' 表示空节点，那么任意遍历列表都一一对应二叉树。

最简单的就是前序遍历。序列化时，递归即可，将遍历列表拼接为字符串。

反序列化可以用 dfs 模拟序列化的过程。从遍历列表 queue 中弹出第一个元素作为 root，
然后进入下一层的左右子树，元素为 '#' 时就返回上一层，即可重构出二叉树。

## 解答

```python
class Codec:

    def serialize(self, root):
        return '#' if not root else '%d,%s,%s' % (root.val, self.serialize(root.left), self.serialize(root.right))

    def deserialize(self, data):
        def dfs():
            val = queue.popleft()
            return None if val == '#' else TreeNode(val, dfs(), dfs())

        queue = deque(data.split(','))
        return dfs()
```

116 ms


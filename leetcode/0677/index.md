# 0677：键值映射（★★）


## 题目

实现一个 MapSum 类，支持两个方法，insert 和 sum：

- MapSum() 初始化 MapSum 对象
- void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
- int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。


 <!--more--> 
 
示例：

	输入：
	["MapSum", "insert", "sum", "insert", "sum"]
	[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
	输出：
	[null, null, 3, null, 5]

	解释：
	MapSum mapSum = new MapSum();
	mapSum.insert("apple", 3);  
	mapSum.sum("ap");           // return 3 (apple = 3)
	mapSum.insert("app", 2);    
	mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)


	 
## 分析

### #1

最简单的就是直接用哈希。计算 sum 时，遍历哈希中所有 key 判断是否以 prefix 开头即可。

```python
class MapSum:

    def __init__(self):
        self.d = {}

    def insert(self, key: str, val: int) -> None:
        self.d[key] = val

    def sum(self, prefix: str) -> int:
        return sum(self.d[key] for key in self.d if key.startswith(prefix))
```

36 ms

### #2

显然还可以用字典树优化时间。考虑每个节点都动态保存 p['val']=sum(prefix)，计算 sum 时只需要找到对应节点即可。

注意到插入 key-val 时，若 key 已经存在，val 会更新，则相应的前缀节点的 p['val'] 都要更新 p['val'] += new_val - old_val。
因此仍需要哈希保存 key-val 对。


## 解答

```python
class MapSum:

    def __init__(self):
        self.trie = {}
        self.d = {}

    def insert(self, key: str, val: int) -> None:
        v = self.d.get(key, 0)
        self.d[key] = val
        p = self.trie
        for char in key:
            if char not in p:
                p[char] = {'val': val}
            else:
                p[char]['val'] += val - v
            p = p[char]

    def sum(self, prefix: str) -> int:
        p = self.trie
        for char in prefix:
            if char not in p:
                return 0
            p = p[char]
        return p['val']
```

32 ms

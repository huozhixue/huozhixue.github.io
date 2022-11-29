# 0677：键值映射（★★）


## 题目

实现一个 MapSum 类，支持两个方法，insert 和 sum：

- MapSum() 初始化 MapSum 对象
- void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。
如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
- int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。
 
提示：

- 1 <= key.length, prefix.length <= 50
- key 和 prefix 仅由小写英文字母组成
- 1 <= val <= 1000
- 最多调用 50 次 insert 和 sum


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

还可以用字典树优化时间。在 insert 时可以动态维护前缀对应的键值和（每个节点都新加一个 'val' 属性来维护），计算 sum 时查询即可。

注意到 insert 时，若 key 已经存在，路径上所有的节点都需要更新 'val' 的值。


## 解答

```python
class MapSum:

    def __init__(self):
        T = lambda: defaultdict(T)
        self.trie = T()
        self.d = defaultdict(int)

    def insert(self, key: str, val: int) -> None:
        diff = val - self.d[key]
        self.d[key] = val
        p = self.trie
        for char in key:
            p = p[char]
            p['val'] = p.get('val', 0) + diff

    def sum(self, prefix: str) -> int:
        return reduce(dict.__getitem__, prefix, self.trie).get('val', 0)
```

28 ms

# 1993：树上的操作（★★）


> <u>**[力扣第 60 场双周赛第 3 题](https://leetcode.cn/problems/operations-on-tree/)**</u>

## 题目

<p>给你一棵 <code>n</code> 个节点的树，编号从 <code>0</code> 到 <code>n - 1</code> ，以父节点数组 <code>parent</code> 的形式给出，其中 <code>parent[i]</code> 是第 <code>i</code> 个节点的父节点。树的根节点为 <code>0</code> 号节点，所以 <code>parent[0] = -1</code> ，因为它没有父节点。你想要设计一个数据结构实现树里面对节点的加锁，解锁和升级操作。</p>

<p>数据结构需要支持如下函数：</p>

<ul>
<li><strong>Lock：</strong>指定用户给指定节点 <strong>上锁</strong> ，上锁后其他用户将无法给同一节点上锁。只有当节点处于未上锁的状态下，才能进行上锁操作。</li>
<li><strong>Unlock：</strong>指定用户给指定节点 <strong>解锁</strong> ，只有当指定节点当前正被指定用户锁住时，才能执行该解锁操作。</li>
<li><b>Upgrade：</b>指定用户给指定节点 <strong>上锁</strong> ，并且将该节点的所有子孙节点 <strong>解锁</strong> 。只有如下 3 个条件 <strong>全部</strong> 满足时才能执行升级操作：
<ul>
<li>指定节点当前状态为未上锁。</li>
<li>指定节点至少有一个上锁状态的子孙节点（可以是 <strong>任意</strong> 用户上锁的）。</li>
<li>指定节点没有任何上锁的祖先节点。</li>
</ul>
</li>
</ul>

<p>请你实现 <code>LockingTree</code> 类：</p>

<ul>
<li><code>LockingTree(int[] parent)</code> 用父节点数组初始化数据结构。</li>
<li><code>lock(int num, int user)</code> 如果 id 为 <code>user</code> 的用户可以给节点 <code>num</code> 上锁，那么返回 <code>true</code> ，否则返回 <code>false</code> 。如果可以执行此操作，节点 <code>num</code> 会被 id 为 <code>user</code> 的用户 <strong>上锁</strong> 。</li>
<li><code>unlock(int num, int user)</code> 如果 id 为 <code>user</code> 的用户可以给节点 <code>num</code> 解锁，那么返回 <code>true</code> ，否则返回 <code>false</code> 。如果可以执行此操作，节点 <code>num</code> 变为 <strong>未上锁</strong> 状态。</li>
<li><code>upgrade(int num, int user)</code> 如果 id 为 <code>user</code> 的用户可以给节点 <code>num</code> 升级，那么返回 <code>true</code> ，否则返回 <code>false</code> 。如果可以执行此操作，节点 <code>num</code> 会被 <strong>升级 </strong>。</li>
</ul>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/07/29/untitled.png" style="width: 375px; height: 246px;"></p>

<pre><strong>输入：</strong>
["LockingTree", "lock", "unlock", "unlock", "lock", "upgrade", "lock"]
[[[-1, 0, 0, 1, 1, 2, 2]], [2, 2], [2, 3], [2, 2], [4, 5], [0, 1], [0, 1]]
<strong>输出：</strong>
[null, true, false, true, true, true, false]

<strong>解释：</strong>
LockingTree lockingTree = new LockingTree([-1, 0, 0, 1, 1, 2, 2]);
lockingTree.lock(2, 2);    // 返回 true ，因为节点 2 未上锁。
// 节点 2 被用户 2 上锁。
lockingTree.unlock(2, 3);  // 返回 false ，因为用户 3 无法解锁被用户 2 上锁的节点。
lockingTree.unlock(2, 2);  // 返回 true ，因为节点 2 之前被用户 2 上锁。
// 节点 2 现在变为未上锁状态。
lockingTree.lock(4, 5);    // 返回 true ，因为节点 4 未上锁。
// 节点 4 被用户 5 上锁。
lockingTree.upgrade(0, 1); // 返回 true ，因为节点 0 未上锁且至少有一个被上锁的子孙节点（节点 4）。
// 节点 0 被用户 1 上锁，节点 4 变为未上锁。
lockingTree.lock(0, 1);    // 返回 false ，因为节点 0 已经被上锁了。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == parent.length</code></li>
<li><code>2 &lt;= n &lt;= 2000</code></li>
<li>对于 <code>i != 0</code> ，满足 <code>0 &lt;= parent[i] &lt;= n - 1</code></li>
<li><code>parent[0] == -1</code></li>
<li><code>0 &lt;= num &lt;= n - 1</code></li>
<li><code>1 &lt;= user &lt;= 10<sup>4</sup></code></li>
<li><code>parent</code> 表示一棵合法的树。</li>
<li><code>lock</code> ，<code>unlock</code> 和 <code>upgrade</code> 的调用 <strong>总共 </strong>不超过 <code>2000</code> 次。</li>
</ul>


## 分析

用 state 数组保存每个节点的 <是否上锁,上锁的用户 id>，然后模拟即可。

upgrade 时向上 dfs 确定没有上锁的祖先节点，然后向下 dfs 找所有上锁的子孙节点，
如果非空即代表符合条件，将它们解锁。

## 解答

```python
class LockingTree:

    def __init__(self, parent: List[int]):
        self.parent = parent
        self.nxt = defaultdict(list)
        for v, u in enumerate(parent):
            self.nxt[u].append(v)
        self.state = [(0, 0)] * len(parent)

    def lock(self, num: int, user: int) -> bool:
        if self.state[num][0]:
            return False
        self.state[num] = (1, user)
        return True

    def unlock(self, num: int, user: int) -> bool:
        if self.state[num] != (1, user):
            return False
        self.state[num] = (0, 0)
        return True

    def upgrade(self, num: int, user: int) -> bool:
        def dfs_up(u):
            return self.state[u][0] == 0 and (u == 0 or dfs_up(self.parent[u]))

        def dfs_down(u):
            res = []
            for v in self.nxt[u]:
                res.extend(dfs_down(v))
            if self.state[u][0] == 1:
                res.append(u)
            return res

        if self.state[num][0] == 1 or not dfs_up(num):
            return False
        locked_childs = dfs_down(num)
        if not locked_childs:
            return False
        self.state[num] = (1, user)
        for child in locked_childs:
            self.state[child] = (0, 0)
        return True
```
1676 ms


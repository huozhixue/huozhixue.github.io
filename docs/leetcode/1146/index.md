# 1146：快照数组（1770 分）


> <u>**[力扣第 148 场周赛第 3 题](https://leetcode.cn/problems/snapshot-array/)**</u>

## 题目

<p>实现支持下列接口的「快照数组」- SnapshotArray：</p>

<ul>
<li><code>SnapshotArray(int length)</code> - 初始化一个与指定长度相等的 类数组 的数据结构。<strong>初始时，每个元素都等于</strong><strong> 0</strong>。</li>
<li><code>void set(index, val)</code> - 会将指定索引 <code>index</code> 处的元素设置为 <code>val</code>。</li>
<li><code>int snap()</code> - 获取该数组的快照，并返回快照的编号 <code>snap_id</code>（快照号是调用 <code>snap()</code> 的总次数减去 <code>1</code>）。</li>
<li><code>int get(index, snap_id)</code> - 根据指定的 <code>snap_id</code> 选择快照，并返回该快照指定索引 <code>index</code> 的值。</li>
</ul>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong>[&quot;SnapshotArray&quot;,&quot;set&quot;,&quot;snap&quot;,&quot;set&quot;,&quot;get&quot;]
[[3],[0,5],[],[0,6],[0,0]]
<strong>输出：</strong>[null,null,0,null,5]
<strong>解释：
</strong>SnapshotArray snapshotArr = new SnapshotArray(3); // 初始化一个长度为 3 的快照数组
snapshotArr.set(0,5);  // 令 array[0] = 5
snapshotArr.snap();  // 获取快照，返回 snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // 获取 snap_id = 0 的快照中 array[0] 的值，返回 5</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= length &lt;= 50000</code></li>
<li>题目最多进行<code>50000</code> 次<code>set</code>，<code>snap</code>，和 <code>get</code>的调用 。</li>
<li><code>0 &lt;= index &lt; length</code></li>
<li><code>0 &lt;= snap_id &lt; </code>我们调用 <code>snap()</code> 的总次数</li>
<li><code>0 &lt;= val &lt;= 10^9</code></li>
</ul>




## 分析

set 时保存 <快照号,值> 到值对应的列表中，get 时二分查找到即可。

## 解答


```python
class SnapshotArray:

    def __init__(self, length: int):
        self.id = 0
        self.d = defaultdict(list)


    def set(self, index: int, val: int) -> None:
        self.d[index].append((self.id,val))

    def snap(self) -> int:
        self.id += 1
        return self.id-1

    def get(self, index: int, snap_id: int) -> int:
        A = self.d[index]
        i = bisect_left(A,(snap_id+1,))-1
        return A[i][1] if i>=0 else 0
```

436 ms

# 0138：复制带随机指针的链表（★）


> <u>**[力扣第 138 题](https://leetcode.cn/problems/copy-list-with-random-pointer/)**</u>

## 题目

<p>给你一个长度为 <code>n</code> 的链表，每个节点包含一个额外增加的随机指针 <code>random</code> ，该指针可以指向链表中的任何节点或空节点。</p>

<p>构造这个链表的 <strong><a href="https://baike.baidu.com/item/深拷贝/22785317?fr=aladdin" target="_blank">深拷贝</a></strong>。 深拷贝应该正好由 <code>n</code> 个 <strong>全新</strong> 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 <code>next</code> 指针和 <code>random</code> 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。<strong>复制链表中的指针都不应指向原链表中的节点 </strong>。</p>

<p>例如，如果原链表中有 <code>X</code> 和 <code>Y</code> 两个节点，其中 <code>X.random --&gt; Y</code> 。那么在复制链表中对应的两个节点 <code>x</code> 和 <code>y</code> ，同样有 <code>x.random --&gt; y</code> 。</p>

<p>返回复制链表的头节点。</p>

<p>用一个由 <code>n</code> 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 <code>[val, random_index]</code> 表示：</p>

<ul>
<li><code>val</code>：一个表示 <code>Node.val</code> 的整数。</li>
<li><code>random_index</code>：随机指针指向的节点索引（范围从 <code>0</code> 到 <code>n-1</code>）；如果不指向任何节点，则为  <code>null</code> 。</li>
</ul>

<p>你的代码 <strong>只</strong> 接受原链表的头节点 <code>head</code> 作为传入参数。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png" style="height: 142px; width: 700px;" /></p>

<pre>
<strong>输入：</strong>head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
<strong>输出：</strong>[[7,null],[13,0],[11,4],[10,2],[1,0]]
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png" style="height: 114px; width: 700px;" /></p>

<pre>
<strong>输入：</strong>head = [[1,1],[2,1]]
<strong>输出：</strong>[[1,1],[2,1]]
</pre>

<p><strong>示例 3：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png" style="height: 122px; width: 700px;" /></strong></p>

<pre>
<strong>输入：</strong>head = [[3,null],[3,0],[3,null]]
<strong>输出：</strong>[[3,null],[3,0],[3,null]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 1000</code><meta charset="UTF-8" /></li>
<li><code>-10<sup>4</sup> &lt;= Node.val &lt;= 10<sup>4</sup></code></li>
<li><code>Node.random</code> 为 <code>null</code> 或指向链表中的节点。</li>
</ul>


## 分析

### #1

最直接的就是维护原节点和新节点的映射 d：
- 遍历节点 p，若 p 在 d 中就跳过
- 若 p 不在 d 中，只拷贝值得到节点 p'，保存映射 <p,p'> 到 d 中
- p.next/random 遍历完后，将 p' 的 next/random 指向 p.next/random 的拷贝节点即可

```python
def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
    d, p = {head: Node(head.val) if head else None}, head
    while p:
        d[p].next =  d.setdefault(p.next, Node(p.next.val) if p.next else None)
        d[p].random = d.setdefault(p.random, Node(p.random.val) if p.random else None)
        p = p.next
    return d[head]
```
28 ms

### #2

本题还有个非常巧妙的方法，不用额外空间。
- 先将新节点 new 依次插入到原节点 old 的后面
- 那么 old.random.next 就应该是 new.random
- 最后再按顺序拆分出新节点，即满足了 next 的正确指向


## 解答

```python
def copyRandomList(self, head: 'Node') -> 'Node':
	p = head
	while p:
		p.next = Node(p.val, p.next)
		p = p.next.next
	p = head
	while p:
		p.next.random = p.random.next if p.random else None
		p = p.next.next
	p = head
	dummy = q = Node(0)
	while p:
		q.next = p.next
		p.next = p.next.next
		p = p.next
		q = q.next
	return dummy.next
```
40 ms


# 0138：复制带随机指针的链表（★★★）


## 题目

给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，
该指针可以指向链表中的任何节点或空节点。

构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，
其中每个新节点的值都设为其对应的原节点的值。
新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，
并使原链表和复制链表中的这些指针能够表示相同的链表状态。
复制链表中的指针都不应指向原链表中的节点 。

例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中对应的两个节点 x 和 y ，
同样有 x.random --> y 。

返回复制链表的头节点。

用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
- val：一个表示 Node.val 的整数。
- random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。

你的代码 只 接受原链表的头节点 head 作为传入参数。

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png)

	输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
	输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
	
示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png)

	输入：head = [[1,1],[2,1]]
	输出：[[1,1],[2,1]]
	
示例 3：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png)

	输入：head = [[3,null],[3,0],[3,null]]
	输出：[[3,null],[3,0],[3,null]]
	
提示：
- 0 <= n <= 1000
- -10^4 <= Node.val <= 10^4
- Node.random 为 null 或指向链表中的节点。

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


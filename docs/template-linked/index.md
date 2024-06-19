# 链表模版



##  反转链表

```python
def reverse(head):
	tail = head
	while tail and tail.next:
		tmp = tail.next
		tail.next = tmp.next
		tmp.next = head
		head = tmp
	return head
```

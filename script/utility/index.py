'''
import sqlite3 as sq

# create or connect to an existing db
connection = sq.connect('./project1.db')

# use a db cursor
cursor = connection.cursor()

# with cursor we can now do all sql operation on anything

cursor.execute("""CREATE TABLE IF NOT EXISTS products(ID INTEGER NOT NULL PRIMARY KEY,name Text Not Null, quantity INTEGER NOT NULL)
""")

print(dir(connection))
'''

from threading import Thread,Event 
from time import sleep


def greet():
	for i in range(3):
		print('welcome')
		sleep(2)
	event.set()


def task( loop_count : int) -> None:
	i = 0
	while True:
		print('Running Loop @ index : '+str(i))
		sleep(1)
		i += 1
		if i >= 10:
			#event.set()
			print('event set called upon')
			
		if event.is_set():
			print('Thread stopped prematurely')
			break
			
	print('Thread stopped in the right manner')

event = Event()
thread = Thread(target=task, args=(10, ))
thread.start()

#greet()

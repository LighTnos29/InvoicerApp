import mysql.connector as z
import random
import string

def signup(phone,passw):
    m=z.connect(host="localhost",user="root",passwd="12345",database="app")
    ex=m.cursor()
    s=('SELECT * FROM signin_data WHERE Mobile=%s ')
    v=[phone]
    ex.execute(s,v)
    d=ex.fetchall()
    if len(d)<=0:
        a=id()
        s=("insert into signin_data(Mobile,Password,Unique_ID) values(%s,%s,%s)")
        v=[int(phone),passw,a]
        ex.execute(s,v)
        m.commit()
        return True
    else:
        return 'Error'
def id():
    a=unique()
    m=z.connect(host="localhost",user="root",passwd="12345",database="app")
    ex=m.cursor()
    s=('SELECT * FROM signin_data WHERE Unique_ID=%s ')
    v=[a]
    ex.execute(s,v)
    d=ex.fetchall()
    if len(d)<=0:
        return a
    else:
        id()
def unique():
    characters = string.ascii_letters + string.digits  # A-Z, a-z, 0-9
    random_string = ''.join(random.choice(characters) for _ in range(10))
    return random_string


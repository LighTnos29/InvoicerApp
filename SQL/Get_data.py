import mysql.connector as z
def get_Mobile(Unique):
    m=z.connect(host="localhost",user="root",passwd="12345",database="app")
    ex=m.cursor()
    s=('SELECT Mobile FROM signin_data WHERE Unique_ID=%s ')
    v=[Unique]
    ex.execute(s,v)
    d=ex.fetchall()
    return(d[0][0])


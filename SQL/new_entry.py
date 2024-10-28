import mysql.connector as z
import random
import string

def new_entry(email, passw):
    m = z.connect(host="localhost", user="root", passwd="12345", database="app")
    ex = m.cursor()
    s = 'SELECT * FROM signin_data WHERE Emaid_ID=%s'
    v = [email]
    ex.execute(s, v)
    d = ex.fetchall()

    if len(d) <= 0:
        Unique = id()
        s = "INSERT INTO signin_data(Emaid_id, Password, Unique_ID) VALUES (%s, %s, %s)"
        v = [email, passw, Unique]
        ex.execute(s, v)
        m.commit()
        return [True, Unique]  # Return values correctly here
    else:
        return ['Error', None]
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



def new_tables(unique_id,gst,t_name,address,pan,entity,service):
    # Connect to the database
    m = z.connect(host="localhost", user="root", passwd="12345", database="app")
    ex = m.cursor()

    # Use a properly formatted SQL statement with the table name
    s = f'''
    CREATE TABLE `{t_name}` (
        Unique_ID VARCHAR(10) PRIMARY KEY,
        GST VARCHAR(20),
        T_Name VARCHAR(100) NOT NULL,
        Address VARCHAR(500) NOT NULL,
        PAN VARCHAR(20) NOT NULL,
        Entity VARCHAR(10) NOT NULL,
        Service VARCHAR(10) NOT NULL
    )
    '''
        # Execute the SQL statement
    ex.execute(s)
    m.commit()
    ex.close()
    m.close()
    insert=insert_data(unique_id, gst, t_name, address, pan, entity, service)
    if insert==True:
        return True
    else:
        return False

def insert_data(unique,gst, t_name, address, pan, entity):
    m = z.connect(host="localhost", user="root", passwd="12345", database="app")
    ex = m.cursor()

    s = "INSERT INTO signin_data (GST, T_Name, Address, PAN, Entity) VALUES (%s, %s, %s, %s, %s, %s) where Unique_ID=%s"

    ex.execute(s, (gst, t_name, address, pan, entity, unique))
    m.commit()
    ex.close()
    return True

def fetch_unique(email):
    m = z.connect(host="localhost", user="root", passwd="12345", database="app")
    ex = m.cursor()
    s = 'select * from signin_data where Emaid_ID=%s;'
    ex.execute(s, (email,))  
    result = ex.fetchall()    
    m.close()    
    res=result[0][0]            
    return res



from flask import Flask, jsonify, request
from flask_cors import CORS
from SQL import new_entry, Get_data

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8081"}})


'''@app.route("/api/signup", methods=['POST'])
def signup():
    print("Signup endpoint reached")  # Debug log
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email,password)
    a, Unique = new_entry.new_entry(int(email), password) 
    print(a, Unique)  # Debug log for the result of new_entry
    if a == 'Error':
        return jsonify({'message': 'Error creating user!'}), 500  # Internal Server Error

    return jsonify({'message': 'Signup successful!', 'user_id': Unique}), 201  # Created

'''

@app.route("/api/signup", methods=['POST'])
def ent_det():
    print("Signup endpoint reached")  # Debug log
    data = request.get_json()
    password=data.get('password')
    email = data.get('email')
    gst = data.get('gstNO')
    t_name=data.get('traderName')
    address=data.get('address')
    pan=data.get('pan')
    entity=data.get('entityType')
    a,Unique=new_entry.new_entry(email,password)
    #b= new_entry.insert_data(Unique, gst, t_name, address, pan, entity) 
    print(a)  # Debug log for the result of new_entry
    if a == 'Error':
        return jsonify({'message': 'Email Id Already Exists'}), 500  # Internal Server Error

    return jsonify({'message': 'Signup successful!', 'user_id': Unique}), 201  # Created
if __name__ == "__main__":
    app.run(debug=True)

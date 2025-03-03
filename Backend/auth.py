# auth.py
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
from flask_pymongo import PyMongo

# Initialize Blueprint
auth_bp = Blueprint('auth', __name__)

# MongoDB instance will be initialized later
mongo = None

def init_mongo(app):
    global mongo
    mongo = PyMongo(app)

# Email configuration
EMAIL_ADDRESS = "your-email@gmail.com"
EMAIL_PASSWORD = "your-app-password"

def send_reset_email(email, reset_token):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    msg['Subject'] = "Password Reset Request"
    
    body = f"""
    You requested to reset your password.
    Please click on the following link to reset your password:
    http://localhost:3000/reset-password?token={reset_token}
    
    This link will expire in 1 hour.
    """
    
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token.split()[1], current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({'email': data['email']})
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if mongo.db.users.find_one({'email': data['email']}):
        return jsonify({'message': 'Email already registered'}), 400
    
    hashed_password = generate_password_hash(data['password'])
    
    new_user = {
        'fullName': data['fullName'],
        'email': data['email'],
        'password': hashed_password,
        'created_at': datetime.utcnow()
    }
    
    mongo.db.users.insert_one(new_user)
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data['email']})
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    token = jwt.encode({
        'email': user['email'],
        'exp': datetime.utcnow() + timedelta(hours=24)
    }, current_app.config['SECRET_KEY'])
    
    return jsonify({
        'token': token,
        'user': {
            'email': user['email'],
            'fullName': user['fullName']
        }
    })

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data['email']})
    
    if not user:
        return jsonify({'message': 'Email not found'}), 404
    
    reset_token = jwt.encode({
        'email': user['email'],
        'exp': datetime.utcnow() + timedelta(hours=1)
    }, current_app.config['SECRET_KEY'])
    
    mongo.db.users.update_one(
        {'email': user['email']},
        {'$set': {'reset_token': reset_token}}
    )
    
    if send_reset_email(user['email'], reset_token):
        return jsonify({'message': 'Password reset link sent to email'}), 200
    else:
        return jsonify({'message': 'Error sending reset email'}), 500

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data['token']
    new_password = data['password']
    
    try:
        token_data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        user = mongo.db.users.find_one({
            'email': token_data['email'],
            'reset_token': token
        })
        
        if not user:
            return jsonify({'message': 'Invalid or expired reset token'}), 400
        
        hashed_password = generate_password_hash(new_password)
        mongo.db.users.update_one(
            {'email': user['email']},
            {
                '$set': {'password': hashed_password},
                '$unset': {'reset_token': ''}
            }
        )
        
        return jsonify({'message': 'Password reset successful'}), 200
    
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Reset token has expired'}), 400
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid reset token'}), 400
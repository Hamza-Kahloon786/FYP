# # auth.py
# from flask import Blueprint, request, jsonify, current_app
# from werkzeug.security import generate_password_hash, check_password_hash
# import jwt
# from datetime import datetime, timedelta
# from functools import wraps
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import smtplib
# from flask_pymongo import PyMongo

# # Initialize Blueprint
# auth_bp = Blueprint('auth', __name__)

# # MongoDB instance will be initialized later
# mongo = None

# def init_mongo(app):
#     global mongo
#     mongo = PyMongo(app)

# # Email configuration
# EMAIL_ADDRESS = "your-email@gmail.com"
# EMAIL_PASSWORD = "your-app-password"

# def send_reset_email(email, reset_token):
#     msg = MIMEMultipart()
#     msg['From'] = EMAIL_ADDRESS
#     msg['To'] = email
#     msg['Subject'] = "Password Reset Request"
    
#     body = f"""
#     You requested to reset your password.
#     Please click on the following link to reset your password:
#     http://localhost:3000/reset-password?token={reset_token}
    
#     This link will expire in 1 hour.
#     """
    
#     msg.attach(MIMEText(body, 'plain'))
    
#     try:
#         server = smtplib.SMTP('smtp.gmail.com', 587)
#         server.starttls()
#         server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#         server.send_message(msg)
#         server.quit()
#         return True
#     except Exception as e:
#         print(f"Error sending email: {e}")
#         return False

# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = request.headers.get('Authorization')
#         if not token:
#             return jsonify({'message': 'Token is missing'}), 401
        
#         try:
#             data = jwt.decode(token.split()[1], current_app.config['SECRET_KEY'], algorithms=["HS256"])
#             current_user = mongo.db.users.find_one({'email': data['email']})
#             if not current_user:
#                 return jsonify({'message': 'Invalid token'}), 401
#         except:
#             return jsonify({'message': 'Invalid token'}), 401
        
#         return f(current_user, *args, **kwargs)
#     return decorated

# @auth_bp.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     if mongo.db.users.find_one({'email': data['email']}):
#         return jsonify({'message': 'Email already registered'}), 400
    
#     hashed_password = generate_password_hash(data['password'])
    
#     new_user = {
#         'fullName': data['fullName'],
#         'email': data['email'],
#         'password': hashed_password,
#         'created_at': datetime.utcnow()
#     }
    
#     mongo.db.users.insert_one(new_user)
#     return jsonify({'message': 'User registered successfully'}), 201

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     user = mongo.db.users.find_one({'email': data['email']})
    
#     if not user or not check_password_hash(user['password'], data['password']):
#         return jsonify({'message': 'Invalid email or password'}), 401
    
#     token = jwt.encode({
#         'email': user['email'],
#         'exp': datetime.utcnow() + timedelta(hours=24)
#     }, current_app.config['SECRET_KEY'])
    
#     return jsonify({
#         'token': token,
#         'user': {
#             'email': user['email'],
#             'fullName': user['fullName']
#         }
#     })

# @auth_bp.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     data = request.get_json()
#     user = mongo.db.users.find_one({'email': data['email']})
    
#     if not user:
#         return jsonify({'message': 'Email not found'}), 404
    
#     reset_token = jwt.encode({
#         'email': user['email'],
#         'exp': datetime.utcnow() + timedelta(hours=1)
#     }, current_app.config['SECRET_KEY'])
    
#     mongo.db.users.update_one(
#         {'email': user['email']},
#         {'$set': {'reset_token': reset_token}}
#     )
    
#     if send_reset_email(user['email'], reset_token):
#         return jsonify({'message': 'Password reset link sent to email'}), 200
#     else:
#         return jsonify({'message': 'Error sending reset email'}), 500

# @auth_bp.route('/reset-password', methods=['POST'])
# def reset_password():
#     data = request.get_json()
#     token = data['token']
#     new_password = data['password']
    
#     try:
#         token_data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
#         user = mongo.db.users.find_one({
#             'email': token_data['email'],
#             'reset_token': token
#         })
        
#         if not user:
#             return jsonify({'message': 'Invalid or expired reset token'}), 400
        
#         hashed_password = generate_password_hash(new_password)
#         mongo.db.users.update_one(
#             {'email': user['email']},
#             {
#                 '$set': {'password': hashed_password},
#                 '$unset': {'reset_token': ''}
#             }
#         )
        
#         return jsonify({'message': 'Password reset successful'}), 200
    
#     except jwt.ExpiredSignatureError:
#         return jsonify({'message': 'Reset token has expired'}), 400
#     except jwt.InvalidTokenError:
#         return jsonify({'message': 'Invalid reset token'}), 400
















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
import os

# Initialize Blueprint
auth_bp = Blueprint('auth', __name__)

# MongoDB instance will be initialized later
mongo = None

def init_mongo(app):
    global mongo
    mongo = PyMongo(app)

# Email configuration
EMAIL_ADDRESS = os.environ.get('EMAIL_ADDRESS', "your-email@gmail.com")
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', "your-app-password")
FRONTEND_URL = os.environ.get('FRONTEND_URL', "http://localhost:3000")

def send_reset_email(email, reset_token):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = email
    msg['Subject'] = "Password Reset Request"
    
    # HTML Body with better formatting
    html_body = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #CF992D; color: white; padding: 10px 20px; text-align: center; }}
            .content {{ padding: 20px; border: 1px solid #ddd; }}
            .button {{ display: inline-block; background-color: #CF992D; color: white; text-decoration: none; padding: 10px 20px; margin: 20px 0; border-radius: 5px; }}
            .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #777; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Password Reset Request</h2>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>You have requested to reset your password. Please click on the button below to reset your password:</p>
                <p style="text-align: center;">
                    <a href="{FRONTEND_URL}/reset-password/{reset_token}" class="button">Reset Your Password</a>
                </p>
                <p>If the button doesn't work, you can copy and paste the following link in your browser:</p>
                <p>{FRONTEND_URL}/reset-password/{reset_token}</p>
                <p>This link will expire in 1 hour.</p>
                <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
                <p>Thank you,</p>
                <p>The PangeaPay Team</p>
            </div>
            <div class="footer">
                <p>This is an automated email. Please do not reply to this message.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Plain text alternative
    text_body = f"""
    Password Reset Request
    
    Hello,
    
    You requested to reset your password.
    Please click on the following link to reset your password:
    {FRONTEND_URL}/reset-password/{reset_token}
    
    This link will expire in 1 hour.
    
    If you did not request a password reset, please ignore this email.
    
    Thank you,
    The PangeaPay Team
    """
    
    # Attach both versions
    msg.attach(MIMEText(text_body, 'plain'))
    msg.attach(MIMEText(html_body, 'html'))
    
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
            # Make sure to handle different token formats (with or without "Bearer" prefix)
            if token.startswith('Bearer '):
                token = token.split()[1]
                
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = mongo.db.users.find_one({'email': data['email']})
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except (jwt.InvalidTokenError, Exception) as e:
            return jsonify({'message': f'Invalid token: {str(e)}'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['fullName', 'email', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'message': f'{field} is required'}), 400
    
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
    
    # Validate required fields
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required'}), 400
        
    user = mongo.db.users.find_one({'email': data['email']})
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Use PyJWT explicitly to avoid any potential module conflicts
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

@auth_bp.route('/verify', methods=['GET'])
@token_required
def verify_token(current_user):
    # Return user info if token is valid
    return jsonify({
        'email': current_user['email'],
        'fullName': current_user['fullName']
    })

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    if not data or 'email' not in data:
        return jsonify({'message': 'Email is required'}), 400
        
    user = mongo.db.users.find_one({'email': data['email']})
    
    # For security reasons, don't reveal if email exists or not
    if not user:
        # Return success message even if user doesn't exist to prevent email enumeration
        return jsonify({'message': 'If your email is registered, you will receive a password reset link shortly'}), 200
    
    # Generate reset token
    reset_token = jwt.encode({
        'email': user['email'],
        'exp': datetime.utcnow() + timedelta(hours=1)
    }, current_app.config['SECRET_KEY'])
    
    # Store the token in the database
    mongo.db.users.update_one(
        {'email': user['email']},
        {'$set': {'reset_token': reset_token}}
    )
    
    # Send email with reset link
    if send_reset_email(user['email'], reset_token):
        return jsonify({'message': 'If your email is registered, you will receive a password reset link shortly'}), 200
    else:
        # Don't reveal the email sending error to the client
        return jsonify({'message': 'There was an error processing your request. Please try again later.'}), 500

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if not data or 'token' not in data or 'password' not in data:
        return jsonify({'message': 'Token and new password are required'}), 400
        
    token = data['token']
    new_password = data['password']
    
    # Validate password length
    if len(new_password) < 6:
        return jsonify({'message': 'Password must be at least 6 characters long'}), 400
    
    try:
        # Decode the token to get the user email
        token_data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        user = mongo.db.users.find_one({
            'email': token_data['email'],
            'reset_token': token
        })
        
        if not user:
            return jsonify({'message': 'Invalid or expired reset token'}), 400
        
        # Update password and remove the reset token
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
    except Exception as e:
        print(f"Error resetting password: {e}")
        return jsonify({'message': 'An error occurred. Please try again.'}), 500

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from config import MONGO_URI
from flask_pymongo import PyMongo

# Mine
from auth import auth_bp, init_mongo
app = Flask(__name__)
CORS(app)


# Configuration
app.config["MONGO_URI"] = MONGO_URI
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 128 * 1024 * 1024

mongo = PyMongo(app)

@app.route('/api/kyc', methods=['POST'])
def kyc_submit():
    data = request.form
    files = request.files

    # Build the submission dictionary from form data
    submission = {
        'firstName': data.get('firstName'),
        'lastName': data.get('lastName'),
        'email': data.get('email'),
        'phone': data.get('phone'),
        'dateOfBirth': data.get('dateOfBirth'),
        'telegram': data.get('telegram'),
        'addressLine1': data.get('addressLine1'),
        'addressLine2': data.get('addressLine2'),
        'city': data.get('city'),
        'state': data.get('state'),
        'nationality': data.get('nationality'),
        'zipCode': data.get('zipCode'),
        'walletAddress': data.get('walletAddress'),
        'walletType': data.get('walletType'),
        'selectedDocType': data.get('selectedDocType')
    }

    # List of fields that may have file uploads
    upload_fields = ['idCardFront', 'idCardBack', 'creditCardFront', 'creditCardBack', 'videoFile', 'liveVideoFile']
    for field in upload_fields:
        if field in files:
            file = files[field]
            if file:
                filename = secure_filename(file.filename)
                os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(file_path)
                submission[field] = file_path
        # In case the file data is sent as a string (e.g. base64), store it as-is
        elif data.get(field):
            submission[field] = data.get(field)

    try:
        result = mongo.db.kyc_submissions.insert_one(submission)
        return jsonify({'message': 'Successfully sent info', 'id': str(result.inserted_id)}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to download files stored in the uploads folder
@app.route('/uploads/<path:filename>', methods=['GET'])
def download_file(filename):
    # as_attachment=True forces the browser to download the file
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

# Optional: Endpoint to list all submissions with download URLs for each file
@app.route('/api/kyc/submissions', methods=['GET'])
def list_submissions():
    submissions = list(mongo.db.kyc_submissions.find())
    for submission in submissions:
        submission['_id'] = str(submission['_id'])
        # For each file field, if present, build a full URL for download
        for key in ['idCardFront', 'idCardBack', 'creditCardFront', 'creditCardBack', 'videoFile', 'liveVideoFile']:
            if key in submission and submission[key]:
                submission[key] = request.host_url + 'uploads/' + os.path.basename(submission[key])
    return jsonify(submissions), 200


####### mine

# Configuration
app.config['MONGO_URI'] = MONGO_URI
app.config['SECRET_KEY'] = '1234ewqa'  # Change this
mongo = PyMongo(app)
init_mongo(app)  # Initialize MongoDB
# Register the auth blueprint with a URL prefix
app.register_blueprint(auth_bp, url_prefix='/api/auth')



if __name__ == '__main__':
    app.run(debug=True)


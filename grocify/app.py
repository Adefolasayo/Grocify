import os
from flask import Flask
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user
from flask import render_template, request, redirect, flash, url_for,session
from werkzeug.security import generate_password_hash
# from flask_mail import Mail, Message
import random


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grocify.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'bhgycee2hh2uuu3jjj3h'  # Change this to a secure key

# Mail server configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'example@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'your_password'         # Replace with your email password
mail = Mail(app)

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.Integer, unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@login_required
def home():
    return "Hello, Flask!"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('home'))
        else:
            return "Login Failed", 401
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    try:
        if request.method == 'POST':
            username = request.form.get('username')
            email = request.form.get('email')
            phone = request.form.get('phone')
            password = request.form.get('password')
            
            # check if user already exists
            if User.query.filter_by(username=username).first():
                    return 'Username already exists.', 400
            if User.query.filter_by(email=email).first():
                    return 'Email already exists.', 400
            
                
            # Create a new user instance with the provided data
            new_user = User(username=username, email=email, phone=phone)
            new_user.set_password(password)  # Assuming you have a set_password method that hashes the password
            
            # Add the new user to the database
            db.session.add(new_user)
            db.session.commit()

            return redirect(url_for('login'))
    except Exception as e:
        print(f"Error: {e}")
    return render_template('signup.html')

@app.route('/password-recovery', methods=['GET', 'POST'])
def password_recovery():
    if request.method == 'POST':
        email = request.form['email']
        user = User.query.filter_by(email=email).first()

        if user:
            verification_code = random.randint(10000, 99999)
            user.verification_code = verification_code
            db.session.commit()
            
            # Send verification email
            msg = Message('Password Recovery Verification Code',
                          sender='your_email@gmail.com',
                          recipients=[email])
            msg.body = f'Your verification code is: {verification_code}'
            mail.send(msg)
            
            session['verification_sent'] = True
            flash('A verification code has been sent to your email.', 'info')
            return redirect(url_for('password_recovery'))
        else:
            flash('Email not found.', 'danger')
    
    return render_template('passwordrecovery.html', verification_sent=session.get('verification_sent', False))

@app.route('/verify-code', methods=['POST'])
def verify_code():
    # Concatenate verification code from multiple input fields
    code = ''.join([request.form[f'code{i}'] for i in range(1, 6)])  # Assuming 5 inputs
    user = User.query.filter_by(verification_code=code).first()

    if user:
        session.pop('verification_sent', None)
        flash('Verification successful! You can now reset your password.', 'success')
        return redirect(url_for('reset_password', user_id=user.id))  # Pass securely
    else:
        flash('Invalid verification code.', 'danger')
        return redirect(url_for('password_recovery'))

@app.route('/passwordreset/<int:user_id>', methods=['GET', 'POST'])
def reset_password(user_id):
    if request.method == 'POST':
        new_password = request.form['password']
        confirm_password = request.form['confirm_password']

        if new_password == confirm_password:
            user = User.query.get(user_id)
            user.password = generate_password_hash(new_password)
            user.verification_code = None
            db.session.commit()
            
            flash('Password changed successfully! Please login.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Passwords do not match.', 'danger')
    
    return render_template('passwordreset.html', user_id=user_id)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
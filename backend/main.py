from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/')
def hello():
    return 'Hello, World!'


@app.route('/crash')
def crash():
    raise Exception('Server crashed!')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

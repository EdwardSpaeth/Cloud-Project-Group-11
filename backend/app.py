from flask import Flask

app = Flask(__name__)

@app.get('/index')
def hello_world():
    return "<h1>Hello World!</h1>"

if __name__ == '__main__':
    app.run()
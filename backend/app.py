from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from urllib.parse import urlparse


COMMUNITY = {
    "ranking": [
        {"position": 1, "name": "Rento Neves", "points": 2840, "streak": 26},
        {"position": 2, "name": "Ana Martins", "points": 2610, "streak": 24},
        {"position": 3, "name": "Caio Lima", "points": 2380, "streak": 21},
        {"position": 4, "name": "Julia Santos", "points": 2145, "streak": 18},
        {"position": 5, "name": "Pedro Alves", "points": 1980, "streak": 16},
        {"position": 6, "name": "Marina Costa", "points": 1760, "streak": 14},
    ],
}


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/community":
            self.send_json(COMMUNITY)
            return

        self.send_json({"error": "API route not found"}, status=404)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_cors_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")


def run():
    server = ThreadingHTTPServer(("127.0.0.1", 8000), Handler)
    print("Direitriz API running at http://127.0.0.1:8000")
    server.serve_forever()


if __name__ == "__main__":
    run()

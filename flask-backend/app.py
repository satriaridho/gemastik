from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO
import base64
import io
import json
from PIL import Image
import os

app = Flask(__name__)
CORS(app)

# Load YOLO model
MODEL_PATH = "../lib/computer_vision/my_model/my_model.pt"
model = None

def load_model():
    global model
    try:
        model_full_path = os.path.join(os.path.dirname(__file__), MODEL_PATH)
        model = YOLO(model_full_path, task='detect')
        print(f"Model loaded successfully from {model_full_path}")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        return False

# Initialize model on startup
load_model()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/detect', methods=['POST'])
def detect_objects():
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500

        # Get image data from request
        data = request.get_json()

        if 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400

        # Decode base64 image
        image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64, prefix
        image_bytes = base64.b64decode(image_data)

        # Convert to PIL Image and then to numpy array
        image = Image.open(io.BytesIO(image_bytes))
        image_np = np.array(image)

        # Convert RGB to BGR for OpenCV
        if len(image_np.shape) == 3 and image_np.shape[2] == 3:
            image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        # Run YOLO detection
        results = model(image_np, verbose=False)
        detections = results[0].boxes

        # Process detections
        detection_results = []
        total_objects = 0

        if detections is not None:
            for i in range(len(detections)):
                # Get bounding box coordinates
                xyxy_tensor = detections[i].xyxy.cpu()
                xyxy = xyxy_tensor.numpy().squeeze()

                if len(xyxy.shape) == 0:  # Single detection
                    xyxy = xyxy.reshape(1, -1)

                if len(xyxy.shape) == 1:
                    xyxy = xyxy.reshape(1, -1)

                for detection in xyxy:
                    xmin, ymin, xmax, ymax = detection.astype(int)

                    # Get class and confidence
                    classidx = int(detections[i].cls.item())
                    classname = model.names[classidx] if classidx in model.names else f"class_{classidx}"
                    confidence = float(detections[i].conf.item())

                    # Only include detections above threshold
                    if confidence > 0.76:  # Configurable threshold
                        detection_results.append({
                            'bbox': [int(xmin), int(ymin), int(xmax), int(ymax)],
                            'class': classname,
                            'confidence': round(confidence, 3),
                            'class_id': classidx
                        })
                        total_objects += 1

        return jsonify({
            'detections': detection_results,
            'total_objects': total_objects,
            'image_shape': image_np.shape[:2],  # height, width
            'status': 'success'
        })

    except Exception as e:
        print(f"Detection error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/detect-video-frame', methods=['POST'])
def detect_video_frame():
    """
    Endpoint for real-time video frame detection
    """
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500

        data = request.get_json()

        if 'frame' not in data:
            return jsonify({'error': 'No frame data provided'}), 400

        # Decode base64 frame
        frame_data = data['frame'].split(',')[1]
        frame_bytes = base64.b64decode(frame_data)

        # Convert to numpy array
        nparr = np.frombuffer(frame_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            return jsonify({'error': 'Invalid frame data'}), 400

        # Run detection with lower confidence for real-time
        results = model(frame, verbose=False, conf=0.4)  # Lower confidence for real-time
        detections = results[0].boxes

        detection_results = []

        if detections is not None and len(detections) > 0:
            for i in range(len(detections)):
                xyxy_tensor = detections[i].xyxy.cpu()
                xyxy = xyxy_tensor.numpy().squeeze()

                if len(xyxy.shape) == 0:
                    continue

                xmin, ymin, xmax, ymax = xyxy.astype(int)

                classidx = int(detections[i].cls.item())
                classname = model.names[classidx] if classidx in model.names else "sampah"
                confidence = float(detections[i].conf.item())

                detection_results.append({
                    'bbox': [int(xmin), int(ymin), int(xmax), int(ymax)],
                    'class': classname,
                    'confidence': round(confidence, 3),
                    'class_id': classidx
                })

        return jsonify({
            'detections': detection_results,
            'total_objects': len(detection_results),
            'timestamp': data.get('timestamp', 0)
        })

    except Exception as e:
        print(f"Video frame detection error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if model is None:
        print("Warning: Model failed to load. Please check the model path.")
    else:
        print("YOLO detection server starting...")

    app.run(debug=True, host='0.0.0.0', port=5001)

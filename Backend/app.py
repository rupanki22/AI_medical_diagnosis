from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
from tensorflow import keras

# -----------------------------
# Flask setup
# -----------------------------
app = Flask(__name__)
CORS(app)

IMG_SIZE = 224

# -----------------------------
# Load Models
# -----------------------------
print("Loading AI models...")

bone_model = keras.models.load_model(
    "models/bone_fracture_model.keras",
    compile=False
)

brain_model = keras.models.load_model(
    "models/brain_tumor.keras",
    compile=False
)

chest_model = keras.models.load_model(
    "models/chest_pneumonia.keras",
    compile=False
)

print("All models loaded successfully")


# -----------------------------
# Image preprocessing
# -----------------------------
def preprocess(img):
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img


# -----------------------------
# Prediction API
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    scan = request.form.get("scan")

    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = preprocess(img)

    result = "Invalid scan type"
    confidence = 0

    # -------------------
    # Brain Prediction
    # -------------------
    if scan == "brain":

        classes = ["Glioma", "Meningioma", "Pituitary", "No Tumor"]

        pred = brain_model.predict(img)[0]
        index = np.argmax(pred)

        result = classes[index]
        confidence = float(pred[index]) * 100

    # -------------------
    # Bone Prediction
    # -------------------
    elif scan == "bone":

        pred = bone_model.predict(img)[0][0]

        if pred > 0.5:
            result = "Fracture"
            confidence = float(pred) * 100
        else:
            result = "No Fracture"
            confidence = float(1 - pred) * 100

    # -------------------
    # Chest Prediction
    # -------------------
    elif scan == "chest":

        pred = chest_model.predict(img)[0][0]

        if pred > 0.5:
            result = "Pneumonia"
            confidence = float(pred) * 100
        else:
            result = "Normal"
            confidence = float(1 - pred) * 100

    # -------------------
    # Response
    # -------------------
    return jsonify({
        "result": result,
        "confidence": round(confidence, 2)
    })


# -----------------------------
# Start server
# -----------------------------
if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(host="0.0.0.0", port=5000, debug=True)
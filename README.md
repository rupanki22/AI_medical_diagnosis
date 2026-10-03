# AI Medical Diagnosis System 

## Overview

This project is an **AI-powered medical diagnosis tool** capable of analyzing medical images and predicting conditions using deep learning models.

Supported scans:

* Brain MRI — Brain Tumor Detection
* Bone X-ray — Bone Fracture Detection
* Chest X-ray — Pneumonia Detection

The system uses:

* Python + Flask backend
* TensorFlow deep learning models
* HTML / CSS / JavaScript frontend

---

# 1. System Requirements

Install the following software before running the project.

Python Version:

```text
Python 3.10.11
```

Recommended OS:

* Windows 10 / 11
* Linux
* macOS

---

# 2. Extract the Project

Unzip the project folder.

Example structure after extraction:

```text
AI_medical_diagnosis
│
├── Backend
│   ├── app.py
│   └── models
│       ├── bone_fracture_model.keras
│       ├── brain_tumor.keras
│       └── chest_pneumonia.keras
│
├── Frontend
│   ├── index.html
│   ├── tool.html
│   ├── settings.html
│   ├── css
│   └── js
│
└── requirements.txt
```

---

# 3. Install Required Python Libraries

Open terminal inside the project folder and run:

```bash
pip install -r requirements.txt
```

Or install manually:

```bash
pip install tensorflow==2.16.1
pip install numpy==1.26.4
pip install opencv-python
pip install flask
pip install flask-cors
pip install matplotlib
pip install scikit-learn
```

---

# 4. Verify Installation

Run:

```bash
python -c "import tensorflow as tf; print(tf.__version__)"
```

Expected output:

```text
2.16.1
```

Check Python version:

```bash
python --version
```

Expected:

```text
Python 3.10.11
```

---

# 5. Start the Backend Server

Go to the Backend folder:

```bash
cd Backend
```

Run the Flask server:

```bash
python app.py
```

If successful, terminal will show:

```text
Loading AI models...
All models loaded successfully
Starting Flask server...
Running on http://127.0.0.1:5000
```

---

# 6. Open the Frontend

Open the file:

```text
Frontend/tool.html
```

in your browser.

Upload a medical image and select the scan type.

---

# 7. Project Features

* Deep Learning CNN models
* Real-time medical scan analysis
* Confidence score prediction
* AI health assistant guidance
* Simple web interface

---

# 8. Important Precautions (Do NOT do these)

To prevent breaking the project:

1. Do NOT upgrade TensorFlow.

   ```text
   tensorflow==2.16.1
   ```

2. Do NOT install standalone Keras.

   ```bash
   pip install keras   ❌
   ```

3. Do NOT change Python version.

   ```text
   Python 3.10.11 required
   ```

4. Do NOT rename model files.

Correct model names:

```text
bone_fracture_model.keras
brain_tumor.keras
chest_pneumonia.keras
```

5. Do NOT modify the folder structure.

---

# 9. Troubleshooting

If an error occurs, reinstall dependencies:

```bash
pip uninstall tensorflow keras numpy opencv-python -y
pip install -r requirements.txt
```

Then restart the server.

---

# 10. Disclaimer

This system is intended for **educational and research purposes only**.

It does **not replace professional medical diagnosis**. Always consult a certified healthcare professional.

---

# Author

Rupanki
Aspiring Data Analyst

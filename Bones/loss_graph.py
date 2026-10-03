import matplotlib.pyplot as plt

epochs = [1,2,3,4,5,6,7,8,9,10]

# Brain Tumor model loss
brain_train_loss = [0.92,0.80,0.70,0.60,0.50,0.42,0.35,0.30,0.25,0.22]
brain_val_loss   = [0.95,0.85,0.75,0.65,0.55,0.47,0.40,0.35,0.30,0.27]

plt.plot(epochs, brain_train_loss, label="Training Loss")
plt.plot(epochs, brain_val_loss, label="Validation Loss")
plt.title("Brain Tumor Model Training Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.show()

# Pneumonia model loss
chest_train_loss = [1.00,0.88,0.78,0.67,0.58,0.49,0.43,0.38,0.33,0.30]
chest_val_loss   = [1.05,0.93,0.82,0.72,0.63,0.55,0.48,0.43,0.39,0.35]

plt.plot(epochs, chest_train_loss, label="Training Loss")
plt.plot(epochs, chest_val_loss, label="Validation Loss")
plt.title("Pneumonia Detection Model Training Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.show()

# Bone fracture model loss
bone_train_loss = [0.95,0.84,0.73,0.63,0.54,0.46,0.40,0.35,0.30,0.26]
bone_val_loss   = [1.00,0.90,0.80,0.70,0.61,0.53,0.47,0.41,0.36,0.32]

plt.plot(epochs, bone_train_loss, label="Training Loss")
plt.plot(epochs, bone_val_loss, label="Validation Loss")
plt.title("Bone Fracture Model Training Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.show()
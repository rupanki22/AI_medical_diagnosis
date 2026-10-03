import matplotlib.pyplot as plt

epochs = [1,2,3,4,5,6,7,8,9,10]

# Brain Tumor model
brain_train_acc = [0.61,0.69,0.74,0.80,0.85,0.89,0.91,0.93,0.95,0.96]
brain_val_acc   = [0.59,0.66,0.72,0.78,0.83,0.87,0.89,0.91,0.93,0.94]

plt.plot(epochs, brain_train_acc, label="Training Accuracy")
plt.plot(epochs, brain_val_acc, label="Validation Accuracy")
plt.title("Brain Tumor Model Training Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.show()

# Chest Pneumonia model
chest_train_acc = [0.58,0.64,0.70,0.76,0.81,0.85,0.88,0.90,0.92,0.93]
chest_val_acc   = [0.55,0.61,0.67,0.73,0.78,0.82,0.85,0.87,0.89,0.90]

plt.plot(epochs, chest_train_acc, label="Training Accuracy")
plt.plot(epochs, chest_val_acc, label="Validation Accuracy")
plt.title("Pneumonia Detection Model Training Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.show()

# Bone fracture model
bone_train_acc = [0.60,0.67,0.73,0.79,0.84,0.88,0.91,0.93,0.94,0.95]
bone_val_acc   = [0.57,0.64,0.70,0.76,0.81,0.85,0.88,0.90,0.91,0.92]

plt.plot(epochs, bone_train_acc, label="Training Accuracy")
plt.plot(epochs, bone_val_acc, label="Validation Accuracy")
plt.title("Bone Fracture Model Training Accuracy")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.show()
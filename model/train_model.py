import pandas as pd
import pickle

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("../dataset/medical_devices.csv")

questions = df["Question"]
answers = df["Answer"]

vectorizer = TfidfVectorizer(
    lowercase=True,
    ngram_range=(1,2),
    stop_words="english"
)

X = vectorizer.fit_transform(questions)

# Logistic Regression Model
model = LogisticRegression(
    max_iter=2000
)

model.fit(X, answers)

# Save files
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("================================")
print("AI Medical Device Model Created")
print("model.pkl saved")
print("vectorizer.pkl saved")
print("================================")
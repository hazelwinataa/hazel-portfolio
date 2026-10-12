// PROJECT CARD CONTENT
// Concise summaries are based on the documented project archive.
// These summaries describe demonstrated work, not unverified business outcomes.

export type CardEvidence = {
  value: string;
  label: string;
  note?: string;
};

type CardContent = {
  summary: string;
  evidence?: CardEvidence;
};

export const projectCardContent: Record<string, CardContent> = {
  "credit-score-prediction": {
    summary:
      "Compared four classifiers and two feature sets for three credit-score classes using customer-disjoint evaluation.",
    evidence: {
      value: "0.6898",
      label: "Recorded macro F1",
      note: "Final selection used the test set; see limitations.",
    },
  },
  "bank-marketing-campaign": {
    summary:
      "Compared six algorithms and imbalance-handling strategies on 41,188 bank campaign records to study subscription targeting.",
    evidence: { value: "41,188", label: "Campaign records analyzed" },
  },
  "savings-goal-classification": {
    summary:
      "Evaluated savings-goal classifiers on 3,000 personal-finance records after removing direct target leakage.",
    evidence: {
      value: "0.8704",
      label: "Archived positive-class F1",
      note: "Derived from the saved test confusion matrix.",
    },
  },
  "bangladesh-crime-clustering": {
    summary:
      "Explored 6,574 crime-related observations with mixed-type preprocessing, K-Means, PCA, and cluster interpretation.",
    evidence: { value: "6,574", label: "Source observations" },
  },
  "music-recommendation-system": {
    summary:
      "Studied content-based music recommendations using TF-IDF, cosine similarity, and Top-N retrieval over track metadata.",
    evidence: {
      value: "4,999",
      label: "Tracks studied",
      note: "Historical coursework; original code unavailable.",
    },
  },
  "spaceship-titanic-kaggle": {
    summary:
      "Compared classification models for Spaceship Titanic with Optuna optimization, cross-validation, and Kaggle submission.",
    evidence: { value: "0.79401", label: "Recorded Kaggle public score" },
  },
  "customer-repeat-order": {
    summary:
      "Reviewed vehicle-sales transactions for repeat-order indicators, duplicates, demographic anomalies, and financing-data quality.",
    evidence: {
      value: "319,978",
      label: "Source transactions",
      note: "EDA and preprocessing; no validated prediction score.",
    },
  },
  inklumap: {
    summary:
      "Developed an inclusive-school analytics prototype linking student grouping, support recommendations, APIs, and a dashboard.",
    evidence: {
      value: "120",
      label: "Synthetic student records",
      note: "Prototype data, not actual student records.",
    },
  },
  "patient-risk-journey": {
    summary:
      "Integrated healthcare encounters into patient profiles and explored clinical-journey and social-risk patterns with clustering.",
    evidence: {
      value: "57,386",
      label: "Patient-level profiles",
      note: "Exploratory clustering; not a clinical risk model.",
    },
  },
  "bank-marketing-ann": {
    summary:
      "Compared Keras Sequential and Functional neural networks for term-deposit subscription classification.",
    evidence: {
      value: "0.9189",
      label: "Reported test ROC-AUC",
      note: "Call duration was included as a predictor.",
    },
  },
  "cherry-leaf-cnn": {
    summary:
      "Compared AlexNet-based architectures and EfficientNetB0 transfer learning across five cherry-leaf classes.",
    evidence: {
      value: "3,642",
      label: "Cherry-leaf images",
      note: "Reported accuracy uses a shared validation/test subset.",
    },
  },
  "used-car-regression-ann": {
    summary:
      "Compared baseline and modified Keras regression networks for used-car pricing with a log-transformed target.",
    evidence: {
      value: "0.8777",
      label: "Reported test R²",
      note: "On the documented model split.",
    },
  },
  "amd-lstm": {
    summary:
      "Forecasted AMD closing prices with LSTM variants and compared them against a last-value naive benchmark.",
    evidence: {
      value: "254",
      label: "Trading sessions in test",
      note: "Modified LSTM did not beat the naive RMSE.",
    },
  },
  "aapl-lstm": {
    summary:
      "Tested LSTM forecasting of AAPL closing prices under chronological splits and strong distribution shift.",
    evidence: {
      value: "254",
      label: "Trading sessions in test",
      note: "The best modified model narrowly beat naive RMSE.",
    },
  },
  "overhead-mnist-autoencoder": {
    summary:
      "Reduced 28×28 overhead imagery to 128-dimensional representations and compared reconstruction architectures using SSIM.",
    evidence: {
      value: "0.7573",
      label: "Modified test SSIM",
      note: "Baseline 0.4864; reconstruction, not classification.",
    },
  },
  "overhead-mnist-cgan": {
    summary:
      "Compared label-conditioned MLP GAN and Conditional DCGAN variants for two classes of overhead imagery.",
    evidence: {
      value: "1111.72",
      label: "Best observed FID (lower is better)",
      note: "Test-referenced selection; visual quality remains limited.",
    },
  },
  "credit-score-deployment": {
    summary:
      "Built an OOP credit-scoring pipeline with MLflow tracking, Streamlit inference, and AWS SageMaker/EC2 deployment.",
    evidence: {
      value: "0.6878",
      label: "Recorded local macro F1",
      note: "Separate run from Credit Score Prediction.",
    },
  },
  "spaceship-titanic-mlops": {
    summary:
      "Implemented an educational MLOps workflow using Optuna, MLflow registry, SageMaker endpoint, and Streamlit on EC2.",
    evidence: { value: "6", label: "Main MLflow runs documented" },
  },
  "student-placement-classification": {
    summary:
      "Compared classifiers for student placement and investigated a rule-structured target in a 5,000-row dataset.",
    evidence: {
      value: "5,000",
      label: "Student records",
      note: "Perfect accuracy reflects a deterministic dataset rule.",
    },
  },
  "salary-regression": {
    summary:
      "Benchmarked regression algorithms and feature representations for salary-package prediction among placed students.",
    evidence: { value: "866", label: "Placed-student salary records" },
  },
  "placement-salary-streamlit": {
    summary:
      "Deployed student placement and salary models through MLflow-managed pipelines, Streamlit, and a decoupled API design.",
    evidence: {
      value: "26",
      label: "MLflow runs recorded",
      note: "Includes two summary runs.",
    },
  },
  "fastapi-streamlit-architecture": {
    summary:
      "Separated a Streamlit user interface from FastAPI prediction endpoints for student placement and salary tasks.",
  },
  "bnpl-database-normalization": {
    summary:
      "Normalized a synthetic BNPL transaction design from UNF to 3NF, with a relational schema and MariaDB implementation.",
    evidence: {
      value: "6",
      label: "Relational tables",
      note: "Two conceptual relationships lack SQL FK constraints.",
    },
  },
  "database-triggers": {
    summary:
      "Studied SQL triggers, row references, procedures, and transaction integrity through historical coursework scenarios.",
    evidence: {
      value: "10",
      label: "Coursework scenarios",
      note: "Executed tests are not available for verification.",
    },
  },
  "database-indexing": {
    summary:
      "Analyzed physical database design, indexing options, selectivity, and ISUD workload trade-offs.",
  },
  "weather-traffic-streaming": {
    summary:
      "Combined OpenWeather and TomTom samples from fixed locations in ten Indonesian cities using Spark streaming workflows.",
    evidence: {
      value: "2",
      label: "External API sources",
      note: "The 740-row join may contain repeated matches.",
    },
  },
  "uml-system-modeling": {
    summary:
      "Modeled use cases, sequences, business processes, and ERDs across academic system-design scenarios.",
  },
  "beemazon-avl": {
    summary:
      "Built a C-based e-commerce data-structure prototype with AVL insertion, deletion, nearest-price lookup, and sorted browsing.",
  },
  "parking-management-c": {
    summary:
      "Designed a menu-driven parking system in C using a binary search tree for vehicle-code operations and fee calculation.",
  },
  "waste-material-classification": {
    summary:
      "Compared CNNs and fine-tuned MobileNetV2 variants on six waste-image classes, with Grad-CAM interpretation.",
    evidence: {
      value: "81.32%",
      label: "Best recorded test accuracy",
      note: "Model selection also used test performance.",
    },
  },
};

export function getProjectCardContent(slug: string) {
  return projectCardContent[slug];
}

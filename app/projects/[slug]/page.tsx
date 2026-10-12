import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return {
    title: project?.title ?? "Project not found",
    description: project?.description,
  };
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <ul className="detail-list">
        {items.map((item, index) => (
          <li key={`${index}-${item}`}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function TextSection({ title, value }: { title: string; value: string }) {
  if (!value.trim()) return null;

  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <p>{value}</p>
    </section>
  );
}


function AccuracyExplanation() {
  const conditions = [
    { label: "CGPA", rule: "≥ 7.0" },
    { label: "Technical Skill Score", rule: "≥ 60" },
    { label: "Soft Skill Score", rule: "≥ 55" },
    { label: "Backlogs", rule: "≤ 2" },
  ];

  return (
    <section
      id="classification-accuracy-explanation"
      aria-labelledby="accuracy-explanation-title"
      style={{
        background: "#f3f7fa",
        border: "1px solid #d5e2eb",
        padding: "clamp(20px, 3vw, 34px)",
        borderRadius: "18px",
        margin: "0 0 42px",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "12px" }}>
        MODEL INTERPRETATION / DATASET VALIDATION
      </p>
      <h2 id="accuracy-explanation-title" style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", marginBottom: "14px" }}>
        Why Did Placement Classification Reach 100% Accuracy?
      </h2>
      <p style={{ color: "#50657a", marginBottom: "18px", maxWidth: "850px" }}>
        The placement target in the submitted academic dataset follows an exact,
        deterministic threshold rule. A student is labeled <strong>Placed (1)</strong> only
        when <strong>all four conditions</strong> below are satisfied:
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
        gap: "12px",
        margin: "20px 0",
      }}>
        {conditions.map((condition) => (
          <div key={condition.label} style={{ background: "#fff", border: "1px solid #d8e3eb", borderRadius: "12px", padding: "18px" }}>
            <span style={{ display: "block", fontSize: "0.84rem", color: "#576d81", marginBottom: "6px" }}>
              {condition.label}
            </span>
            <strong style={{ display: "block", color: "#192e49", fontSize: "1.45rem" }}>
              {condition.rule}
            </strong>
          </div>
        ))}
      </div>
      <p style={{ color: "#50657a", marginBottom: "16px" }}>
        <strong>Placement = 1</strong> if (CGPA ≥ 7.0) AND (Technical Skill ≥ 60) AND
        (Soft Skill ≥ 55) AND (Backlogs ≤ 2); otherwise, <strong>Placement = 0</strong>.
      </p>
      <p style={{ color: "#50657a", marginBottom: "16px" }}>
        Rechecking this rule against the full source dataset produces a match for
        <strong> 5,000 out of 5,000 records</strong>: 866 Placed and 4,134 Not Placed.
        Tree-based algorithms, including Random Forest and LightGBM, are particularly
        effective at learning these threshold-based splits, explaining their strong
        results on this dataset.
      </p>
      <p style={{ borderLeft: "3px solid #347e79", paddingLeft: "14px", color: "#4b6477", margin: 0 }}>
        <strong>Interpretation:</strong> 100% held-out test accuracy is a documented
        result for this rule-structured dataset. It does not imply perfect accuracy
        for unseen, real-world placement outcomes. Salary was not used as a
        classification input in the analyzed modeling notebook.
      </p>
    </section>
  );
}

type GalleryDescription = {
  title: string;
  caption: string;
  details: string[];
  originalScreenshot: boolean;
  sourceLabel?: string;
};

const visualDescriptions: Record<string, GalleryDescription> = {
  "amd-lstm-historical-close.webp": {
    title: "AMD historical Close, 1980\u20132020",
    caption: "Original notebook history shows pronounced multi-year AMD cycles and abrupt regime changes.",
    details: ["Model input is closing price, not the extra OHLCV columns reviewed during EDA.", "Historical observations are trading days only."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "amd-lstm-rolling-statistics.webp": {
    title: "AMD rolling mean and dispersion",
    caption: "Original EDA illustrates non-stationarity and changing price-scale variation.",
    details: ["Rolling statistics describe historical regimes; they were not direct LSTM inputs."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "amd-lstm-chronological-split.webp": {
    title: "AMD \u2014 chronological train / validation / test",
    caption: "Original plot shows the training, validation and final-year test partitions in time order.",
    details: ["No random shuffling or fitting of the scaler on validation/test observations."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "amd-lstm-validation-prediction.webp": {
    title: "AMD \u2014 validation prediction before final testing",
    caption: "Original validation plot supports choosing the modified model before looking at the held-out test year.",
    details: ["Final 2019\u20132020 test is evaluated separately."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "amd-lstm-test-rmse-comparison.svg": {
    title: "AMD \u2014 baseline, modified and naive on final-year test",
    caption: "Comparison replotted from the original notebook final test RMSE: naive 1.3745; baseline LSTM 3.2348; modified LSTM 1.8757.",
    details: ["Lower RMSE is better; the modified model still trails the naive benchmark."],
    originalScreenshot: false,
    sourceLabel: "Chart recreated from documented metrics",
  },
  "amd-lstm-final-test-comparison.webp": {
    title: "AMD \u2014 actual versus model forecasts in the final test",
    caption: "Original notebook plot compares actual prices, baseline, tuned LSTM and naive last-value prediction.",
    details: ["Test period includes early 2020 COVID shock."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "aapl-lstm-historical-close.webp": {
    title: "AAPL historical Close, 1980\u20132020",
    caption: "Original EDA shows strong right-skewed price growth and substantial time-dependent distribution shift.",
    details: ["AAPL history is processed separately from AMD."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "aapl-lstm-rolling-statistics.webp": {
    title: "AAPL changing rolling statistics",
    caption: "Original notebook chart of rolling mean and dispersion reflects changing price regimes.",
    details: ["High trend persistence in closing-price levels is not equivalent to predictable daily returns."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "aapl-lstm-chronological-split.webp": {
    title: "AAPL \u2014 train, validation and held-out test",
    caption: "The original split view highlights why later prices lie well beyond the early training regime.",
    details: ["Train-only normalization was used; out-of-range scaled values are valid."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "aapl-lstm-validation-prediction.webp": {
    title: "AAPL \u2014 validation forecast",
    caption: "Original notebook validation graph documents forecasts before the final 2019\u20132020 holdout.",
    details: ["Model choice was based on validation RMSE."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "aapl-lstm-test-rmse-comparison.svg": {
    title: "AAPL \u2014 three final-test RMSE benchmarks",
    caption: "Replotted from the original notebook: naive 6.2818; baseline LSTM 8.6425; modified relative-log LSTM 6.1952.",
    details: ["The modified model only narrowly improves over naive (about 1.38% RMSE); do not overstate this margin."],
    originalScreenshot: false,
    sourceLabel: "Chart recreated from documented metrics",
  },
  "aapl-lstm-final-test-comparison.webp": {
    title: "AAPL \u2014 original final-test forecast plot",
    caption: "Original notebook graph comparing tuned and baseline models to actual Close across the volatile final year.",
    details: ["Prices were inverse-transformed into original USD values before evaluation."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "average-image-by-class.webp": {
    title: "Class-wise mean imagery",
    caption: "Original mean-image EDA shows more regular bright structure in Storage Tanks than in parking scenes.",
    details: ["Mean pixel intensity is around 155.38 for tanks versus 130.97 for parking lots."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "baseline-reconstructions.webp": {
    title: "Baseline image reconstructions",
    caption: "Original notebook grid pairs input images with simple baseline reconstructions.",
    details: ["Blurred edges illustrate detail loss from basic image reconstruction."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "modified-ssim-training.webp": {
    title: "Modified autoencoder training versus validation SSIM",
    caption: "Original notebook training curve for the validation-selected modified autoencoder.",
    details: ["Validation SSIM guided model selection; test SSIM was computed only after selection."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "test-ssim-comparison.svg": {
    title: "Autoencoder test SSIM improvement",
    caption: "Original reported results replotted as a bar comparison: baseline 0.4864 versus modified 0.7573.",
    details: ["Both models retain a 128-dimensional latent code; higher SSIM means more faithful spatial reconstruction."],
    originalScreenshot: false,
    sourceLabel: "Chart recreated from documented metrics",
  },
  "baseline-vs-modified-reconstructions.webp": {
    title: "Original / baseline / modified reconstruction examples",
    caption: "The original notebook visual compares images and shows noticeably more coherent detail in the modified outputs.",
    details: ["The improvement is especially marked for irregular Parking Lot imagery."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "overhead-autoencoder-original-class-samples.webp": {
    title: "Original two-class satellite-image samples",
    caption: "Notebook examples of Parking Lots and Storage Tanks, each at 28\u00d728 grayscale resolution.",
    details: ["Classes are the only two selected for the assessment; output is image reconstruction, not classification."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "baseline-cgan-samples.webp": {
    title: "Original baseline CGAN samples after training",
    caption: "Actual generated images from the source notebook, not photographs or handcrafted simulation.",
    details: ["Dense-only baseline shows weak class-specific structure and noisy patterns."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "baseline-adversarial-loss.webp": {
    title: "Original generator / discriminator training losses",
    caption: "GAN losses from the initial adversarial training loop.",
    details: ["These losses do not directly measure realism; FID and images are evaluated separately."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "modified-cdgan-samples.webp": {
    title: "Best observed Conditional DCGAN output samples",
    caption: "Original notebook comparison displays real sample images and outputs from the chosen modified experiment.",
    details: ["While patterns are more structured, image quality remains limited and should not be described as photorealistic."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "baseline-vs-modified-fid-original.webp": {
    title: "Original notebook — baseline versus modified FID",
    caption: "Original Matplotlib FID comparison retained as first-party experiment evidence; the modified Conditional DCGAN scored 1111.7247 versus baseline CGAN 1159.4017.",
    details: ["This is a test-reference FID comparison, not a blind final holdout after validation-only hyperparameter selection.", "Very large absolute FID indicates that visual realism remains limited."],
    originalScreenshot: true,
    sourceLabel: "Original GAN experiment figure from notebook export",
  },
  "fid-comparison.svg": {
    title: "Baseline vs test-selected modified FID",
    caption: "Replotted from the report: FID 1159.4017 versus 1111.7247; lower is better.",
    details: ["Three modified candidates were evaluated on the same test reference, so this is not a completely independent final test performance estimate."],
    originalScreenshot: false,
    sourceLabel: "Chart recreated from documented metrics",
  },
  "overhead-cgan-original-class-samples.webp": {
    title: "Real two-class images used for Conditional GAN",
    caption: "Original notebook examples of Parking Lots and Storage Tanks.",
    details: ["Class embeddings condition the generator and discriminator."],
    originalScreenshot: true,
    sourceLabel: "Original source notebook figure",
  },
  "collection-to-eda-pipeline.svg": {
    title: "Weather–Traffic streaming workflow",
    caption: "Notebook-backed diagram of the two scheduled REST API collectors, JSON histories, PySpark Structured Streaming, minute-level integration, and data preprocessing.",
    details: ["This is an explanatory diagram, not a product screenshot.", "A coarse minute-level join may match multiple rows within the same city and minute and inflate sample count."],
    originalScreenshot: false,
    sourceLabel: "Workflow recreated from notebook source",
  },
  "congestion-label-distribution.webp": {
    title: "Original EDA — rule-based congestion labels",
    caption: "Original Matplotlib chart from the uploaded notebook showing Smooth (501) and Medium (239) in 740 joined rows.",
    details: ["Heavy is absent because no recorded speed_ratio was less than 0.4.", "Labels were engineered from the TomTom speed ratio rather than independent traffic incident ground truth."],
    originalScreenshot: true,
    sourceLabel: "Original notebook Matplotlib visualization",
  },
  "mean-speed-ratio-by-city.webp": {
    title: "Original EDA — speed ratio by sampled city coordinate",
    caption: "Original notebook plot: Yogyakarta (~0.694) and Jakarta (~0.754) have the lowest average current-speed/free-flow-speed ratio at the sampled road segments.",
    details: ["This is a single sampled road segment per city, not an urban congestion index.", "Several segments average 1.0, meaning measured current speed matched free-flow conditions during the observed collection window."],
    originalScreenshot: true,
    sourceLabel: "Original notebook Matplotlib visualization",
  },
  "jakarta-temperature-snapshots.webp": {
    title: "Original EDA — Jakarta weather snapshots",
    caption: "Original notebook line chart of Jakarta temperature against ingestion time for the sampled collection window.",
    details: ["Repeated minute-level matches can make one source weather snapshot appear multiple times in the joined dataset.", "This short capture window cannot demonstrate seasonal climate or long-term daily temperature trends."],
    originalScreenshot: true,
    sourceLabel: "Original notebook Matplotlib visualization",
  },
  "temperature-vs-speed-ratio.webp": {
    title: "Original EDA — temperature versus road speed ratio",
    caption: "Original scatter plot of temperature against TomTom speed ratio from the joined dataset.",
    details: ["The plot shows observations but does not isolate a causal weather impact on congestion.", "Potential many-to-many duplication and unmeasured time-of-day or road attributes limit generalization."],
    originalScreenshot: true,
    sourceLabel: "Original notebook Matplotlib visualization",
  },
  "speed-ratio-by-label.webp": {
    title: "Original EDA — speed ratio grouped by engineered label",
    caption: "Original boxplot grouping speed_ratio by Medium and Smooth.",
    details: ["The separation is mathematically expected because the labels were created using thresholds of this same speed_ratio.", "It is a descriptive consistency check, not evidence that a classifier learned independent traffic behavior."],
    originalScreenshot: true,
    sourceLabel: "Original notebook Matplotlib visualization",
  },
  "pipeline-overview.svg": {
    title: "Project architecture — from assessments to human-reviewed support",
    caption: "A source-backed diagram of the dataset, two clustering representations, five selected groups, priority rules, FastAPI/PostgreSQL, and the Next.js frontend.",
    details: [
      "The selected model generates group assignments; accommodations and budget-priority ranking use a downstream, human-reviewed decision-support layer.",
      "Architecture diagram produced from the published code; not a screenshot of a cloud deployment.",
    ],
    originalScreenshot: false,
    sourceLabel: "Source-backed architecture diagram",
  },
  "model-experiment-comparison.svg": {
    title: "Clustering experiments — silhouette comparison",
    caption: "Replotted from analytics/results/clustering_experiment_summary.json: K-Means 0.6129, selected Hierarchical + Gower 0.6757, and DBSCAN + Gower 0.6869.",
    details: [
      "DBSCAN identified four noise cases (4.17%); it was used as a supporting unique-case indicator rather than the main complete segmentation.",
      "Silhouette scores across feature/distance representations should not be interpreted as a controlled head-to-head benchmark.",
    ],
    originalScreenshot: false,
    sourceLabel: "Charts reconstructed from published experiment results",
  },
  "cluster-size-distribution.svg": {
    title: "Five student accommodation-needs groups",
    caption: "Replotted from the saved cluster_catalog.csv and recommendation_summary.json, with 96 complete synthetic assessments divided into clusters of 20, 22, 18, 10 and 26.",
    details: [
      "Needs include structured instruction, visual support, hearing and written communication, mobility, and adaptive assessment.",
      "Cluster categories describe accommodation needs, not diagnoses or a student’s capability.",
    ],
    originalScreenshot: false,
    sourceLabel: "Chart reconstructed from published clustering catalog",
  },
  "student-functional-assessment.webp": {
    title: "Original dashboard — student functional assessment",
    caption: "Screenshot of the local InkluMap application showing functional scores, assessment status, and non-identifying student-code presentation.",
    details: [
      "Eight domains are scored on a 0–3 scale; this illustrative student case shows hearing and communication needs.",
      "All student data shown in this project are synthetic demonstration data.",
    ],
    originalScreenshot: true,
    sourceLabel: "Original InkluMap screenshot — assessment detail",
  },
  "student-accommodation-recommendations.webp": {
    title: "Original dashboard — support recommendations and human-review flag",
    caption: "A local dashboard screenshot displaying the student’s needs group, group-level accommodations, tailored support suggestions, and a teacher validation notice.",
    details: [
      "The group recommends captions, transcripts and written communication; individual decisions remain subject to teacher review.",
      "Shows an actual application interface, not a mock-up or claim of live hosting.",
    ],
    originalScreenshot: true,
    sourceLabel: "Original InkluMap screenshot — recommendations",
  },
  "students-filtered-status.webp": {
    title: "Original dashboard — managing assessment status",
    caption: "Screenshot of the student management view with completion summary cards, filtering, and data-table navigation.",
    details: [
      "The dashboard separates 96 complete, 18 incomplete, and six not-started records, while model clustering uses only the complete subset.",
    ],
    originalScreenshot: true,
    sourceLabel: "Original InkluMap screenshot — records and filters",
  },
  "student-incomplete-assessment.webp": {
    title: "Original dashboard — incomplete assessment safeguard",
    caption: "Screenshot of a student detail page with incomplete assessment status and a message that clustering results are not available.",
    details: [
      "Illustrates why partial records should not be silently assigned to a learned needs group.",
      "The design directs staff to complete the assessment before data-driven grouping.",
    ],
    originalScreenshot: true,
    sourceLabel: "Original InkluMap screenshot — data quality safeguard",
  },
  "asa-clustering-slide.webp": {
    title: "ASA DataFest 2026 — Patient Clustering Analysis",
    caption: "Original final-team presentation, page 4. The slide compares the five interpreted patient segments through disease groups and a social-risk-versus-encounter-complexity map.",
    details: [
      "The five named segments are the final team presentation's interpretation, not independently validated clinical risk strata.",
      "Team Bismillah advanced to the finalist stage, as reported by the participant."
    ],
    originalScreenshot: true,
    sourceLabel: "Original finalist team slide — clustering only"
  },
  "asa-journey-map.webp": {
    title: "Patient Risk Journey Map — social risk and encounter visibility",
    caption: "Detail cropped from the original team slide. The x-axis shows average encounters per patient; the y-axis represents the team's derived average social-risk score, allowing low-utilization and complex-journey groups to be compared.",
    details: [
      "The Hidden High Risk interpretation highlights high social-risk signals with relatively low observed encounter volume.",
      "The descriptive chart suggests screening hypotheses; it is not a validated clinical prediction or an individual patient's risk assessment."
    ],
    originalScreenshot: true,
    sourceLabel: "Original team slide — journey-map crop"
  },
  "asa-disease-cluster-bars.webp": {
    title: "Top five disease groups within each presented cluster",
    caption: "Detail cropped from the original finalist slide. The grouped bars summarize disease-group frequencies associated with each patient segment.",
    details: [
      "General check-up encounters are prominent in some groups, demonstrating why utilization frequency alone is not a clinical-risk label.",
      "Percentages reflect the chart's within-cluster disease-record breakdown and should not be mistaken for proportions of distinct patients."
    ],
    originalScreenshot: true,
    sourceLabel: "Original team slide — diagnosis-group crop"
  },
  "eda-target-distribution.webp": {
    title: "Kaggle notebook — transported target distribution",
    caption: "Original Jupyter output, cell 8. The 8,693 training labels are nearly balanced: 4,378 True and 4,315 False.",
    details: ["A count chart and percentage chart describe the binary target before feature engineering."],
    originalScreenshot: true,
    sourceLabel: "Original EDA output"
  },
  "eda-categorical-patterns.webp": {
    title: "Kaggle notebook — categorical response patterns",
    caption: "Original notebook output, cell 9. Transported proportions across HomePlanet, CryoSleep, Destination and VIP.",
    details: ["Charts are descriptive associations from competition data, not causal business findings."],
    originalScreenshot: true,
    sourceLabel: "Original EDA output"
  },
  "eda-numerical-patterns.webp": {
    title: "Kaggle notebook — numeric attribute distributions",
    caption: "Original notebook output, cell 10. Age and five expense columns grouped by Transported label.",
    details: ["Spending differences motivate engineered total and ratio features."],
    originalScreenshot: true,
    sourceLabel: "Original EDA output"
  },
  "cv-model-comparison.svg": {
    title: "Baseline versus optimized cross-validation",
    caption: "Replotted strictly from recorded MLflow output in the uploaded notebook: 5-fold mean accuracy for three baseline and three tuned models.",
    details: ["XGBoost optimized CV = 0.81261; LightGBM = 0.81146; Logistic Regression = 0.79305.", "CV results are not the Kaggle public leaderboard score."],
    originalScreenshot: false,
    sourceLabel: "Notebook-derived comparison chart"
  },
  "kaggle-public-submission.webp": {
    title: "Kaggle public leaderboard — submission",
    caption: "Original Kaggle submissions screenshot showing a successful submission and public score 0.79401.",
    details: ["The screenshot does not independently identify which model artifact or notebook revision generated the submission."],
    originalScreenshot: true,
    sourceLabel: "Original Kaggle screenshot"
  },
  "optuna-parameter-results.webp": {
    title: "Optuna tuning parameters and retraining",
    caption: "Original screenshot of notebook logs showing an optimized XGBoost CV score and LightGBM CV score alongside retraining confirmations.",
    details: ["Scores belong to the notebook tuning run, not to AWS endpoint inference."],
    originalScreenshot: true,
    sourceLabel: "Original notebook output screenshot"
  },
  "mlflow-experiment-runs.webp": {
    title: "MLflow experiment dashboard",
    caption: "Original MLflow screenshot with baseline and optimized run groups for the spaceship-titanic-demo experiment.",
    details: ["Six main model runs are documented; child trials appear separately when expanding optimization runs."],
    originalScreenshot: true,
    sourceLabel: "Original MLflow screenshot"
  },
  "streamlit-local-prediction.webp": {
    title: "Local Streamlit inference interface",
    caption: "Original localhost Streamlit screenshot with a displayed Transported = True prediction.",
    details: ["Demonstrates a local interactive predictor; it is separate from the EC2-hosted cloud demonstration."],
    originalScreenshot: true,
    sourceLabel: "Original local Streamlit screenshot"
  },
  "sagemaker-training-optuna.webp": {
    title: "AWS SageMaker Notebook — tuning execution",
    caption: "Original AWS SageMaker notebook terminal screenshot showing completed Logistic Regression optimization and model files being saved.",
    details: ["Final recorded CV accuracy is approximately 0.7927 from this distinct AWS run."],
    originalScreenshot: true,
    sourceLabel: "Original cloud execution screenshot (cropped)"
  },
  "sagemaker-endpoint-inservice.webp": {
    title: "AWS SageMaker Endpoint — InService",
    caption: "Original AWS console screenshot from May 19, 2026, showing an inference endpoint in InService status.",
    details: ["The original AWS account ID and ARN were hidden in the public portfolio copy.", "This is historical evidence, not a current availability claim."],
    originalScreenshot: true,
    sourceLabel: "Original AWS screenshot (redacted)"
  },
  "aws-ec2-instance.webp": {
    title: "Amazon EC2 instance — running during test",
    caption: "Original EC2 console screenshot showing the application server instance running and passing status checks.",
    details: ["The identity, instance identifiers and public network details were redacted."],
    originalScreenshot: true,
    sourceLabel: "Original AWS screenshot (redacted)"
  },
  "cloud-streamlit-form.webp": {
    title: "EC2-hosted Streamlit passenger input",
    caption: "Original screenshot of the cloud-hosted Streamlit application sending passenger features to SageMaker.",
    details: ["Shows the frontend portion of a cloud inference workflow."],
    originalScreenshot: true,
    sourceLabel: "Original cloud Streamlit screenshot"
  },
  "cloud-sagemaker-prediction.webp": {
    title: "SageMaker inference response in Streamlit",
    caption: "Original EC2 Streamlit output after model invocation; Transported = True, with class-1 probability around 0.7407.",
    details: ["This single demonstrated output is not a claim of production accuracy or uptime."],
    originalScreenshot: true,
    sourceLabel: "Original cloud inference screenshot"
  },
  "sparc-categorical-eda.webp": {
    title: "SPARC 2026 — Customer, geography and category exploration",
    caption: "Original team presentation, page 8. The EDA reviews customer IDs, district distributions, incomplete financing categories, product preferences and transaction dates.",
    details: [
      "A reported 266,927 distinct customer IDs were found in transaction-level data; repeated IDs can reflect genuine customer histories.",
      "Several categorical fields have sparse values, while some demographic attributes have imbalanced or unknown categories."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — EDA"
  },
  "sparc-deduplication.webp": {
    title: "SPARC 2026 — Exact duplicates and customer-ID checks",
    caption: "Original team presentation, page 9. Documents record-level deduplication and rules for nontransactional identifiers.",
    details: [
      "2,341 exact duplicate rows were removed (319,978 to 317,637).",
      "Blank customer IDs and aggregate TOTAL records were flagged as nontransactional; genuine multiple purchases by a customer are a distinct issue."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Preprocessing"
  },
  "sparc-age-validation.webp": {
    title: "SPARC 2026 — Demographic and age validation",
    caption: "Original team presentation, page 10. Documents anomalous ages, unknown gender entries and recalculation of age from birth-date records.",
    details: [
      "The presentation describes a plausible age range of 17–90 years after birth-date checking.",
      "Unexpected ages and unknown demographic categories were treated as data-quality flags, not automatically accepted as valid measurements."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Data quality"
  },
  "sparc-geographic-audit.webp": {
    title: "SPARC 2026 — Geographic cardinality and inconsistent formats",
    caption: "Original team presentation, page 11. The audit covers high-cardinality areas, mixed data types and inconsistent spellings.",
    details: [
      "Over 1,700 Kelurahan categories and 621 Kecamatan categories were reported.",
      "Rare values and inconsistent district names can create sparse or fragmented analytical groups."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Geographic EDA"
  },
  "sparc-geographic-cleaning.webp": {
    title: "SPARC 2026 — Cleaning geographic categories",
    caption: "Original team presentation, page 12. Describes the team’s district-normalization and low-frequency-grouping decisions.",
    details: [
      "Standardized Kecamatan with uppercase text, punctuation cleanup and normalized whitespace.",
      "Grouped districts represented by five or fewer transactions into OTHER; removed Kelurahan, postal code and broader Wilayah from the selected features."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Preprocessing"
  },
  "sparc-financing-cleaning.webp": {
    title: "SPARC 2026 — Monetary formatting and price distribution",
    caption: "Original team presentation, page 15. Reviews skewed OTR prices and conversion of mixed down-payment formats into numerical values.",
    details: [
      "Monetary text containing Rp, spaces and thousand separators was standardized before numerical analysis.",
      "OTR prices showed right skew; zeros and exceptional values required investigation rather than indiscriminate deletion."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Financial EDA"
  },
  "sparc-dp-otr-validation.webp": {
    title: "SPARC 2026 — Down-payment versus OTR consistency check",
    caption: "Original team presentation, page 16. Demonstrates a ratio-based business rule for checking inconsistent financing records.",
    details: [
      "The team reported 65,103 credit records with DP exceeding OTR and no equivalent cases among cash transactions in the tabulated audit.",
      "The slides document excluding those records. The underlying financing-field meanings would need formal verification before adopting this rule elsewhere."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Validation rule"
  },
  "sparc-missing-value-audit.webp": {
    title: "SPARC 2026 — Residual missing-value assessment",
    caption: "Original team presentation, page 19. Summarizes remaining missingness after several cleaning steps.",
    details: [
      "The presentation shows approximately 96% missingness for Tgl Cetak and DLR Group at the audited stage.",
      "The audit helps distinguish fields suitable for meaningful descriptive analysis from fields requiring additional data recovery."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Missingness"
  },
  "sparc-outlier-review.webp": {
    title: "SPARC 2026 — Business-informed outlier treatment",
    caption: "Original team presentation, page 20. Explains why financial-value outliers are investigated using business logic rather than dropped by statistical threshold alone.",
    details: [
      "Potentially valid high-value vehicles and financing arrangements can appear as statistical outliers.",
      "The described approach combines plausibility checks, ratio comparisons and log transformation for skewed prices."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Outlier EDA"
  },
  "sparc-customer-repeat-definition.webp": {
    title: "SPARC 2026 — Customer-level repeat activity definition",
    caption: "Original team presentation, page 21. Groups chronologically ordered customer transactions and describes a retrospective repeat-customer flag.",
    details: [
      "A customer with more than one recorded transaction is identified as a historical repeat customer.",
      "For a future-oriented prediction task, outcomes must instead be defined after a fixed observation cutoff to prevent temporal leakage."
    ],
    originalScreenshot: true,
    sourceLabel: "Original SPARC 2026 team slide — Customer analytics"
  },
  "model-cv-precision.svg": {
    title: "Bank Marketing — six-model precision comparison",
    caption: "Results chart recreated from the baseline five-fold cross-validation table in the original group notebook (cell 137).",
    details: [
      "Mean positive-class precision is the optimized benchmark metric, not overall classification accuracy.",
      "Logistic Regression records the highest baseline mean CV precision at 0.6826, followed by SVM at 0.6391.",
      "These are no-resampling baseline results, prior to Logistic Regression hyperparameter tuning.",
    ],
    originalScreenshot: false,
    sourceLabel: "Notebook-derived evaluation visualization",
  },
  "tuning-precision.svg": {
    title: "Bank Marketing — baseline versus tuned Logistic Regression",
    caption: "Comparison derived from the notebook's saved RandomizedSearchCV output (cells 150–151).",
    details: [
      "The mean CV positive-class precision improved from 0.6826 to 0.6979 (+1.53 percentage points).",
      "On the 8,037-row test set, the tuned model reported approximately 0.67 yes-class precision but only 0.18 recall; those are distinct evaluation quantities.",
    ],
    originalScreenshot: false,
    sourceLabel: "Notebook-derived tuning metrics chart",
  },
  "original-contact-distribution.webp": {
    title: "Bank Marketing — contact method distribution",
    caption: "Original pie chart preserved from the group's Jupyter notebook output (cell 114).",
    details: [
      "Exploratory chart of cellular versus telephone contacts in the cleaned bank marketing dataset.",
      "Observed channel associations do not establish a causal improvement in conversion outcomes.",
    ],
    originalScreenshot: true,
    sourceLabel: "Original group notebook chart",
  },
  "original-job-distribution.webp": {
    title: "Bank Marketing — customer occupation distribution",
    caption: "Original plot preserved from the group's Jupyter notebook output (cell 83).",
    details: [
      "Shows the observed customer occupation composition that the group considered during exploratory analysis.",
      "These descriptive counts are not a substitute for model evaluation or business impact measurement.",
    ],
    originalScreenshot: true,
    sourceLabel: "Original group notebook chart",
  },
  "credit-mlflow-runs.webp": {
    title: "MLflow — recorded credit-score training runs",
    caption: "Original academic evidence, PDF page 1. MLflow run listing for Credit Score Local Training Pipeline.",
    details: ["The UI records runs by model and feature-set configuration, supporting experiment traceability.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },
  "credit-mlflow-best.webp": {
    title: "MLflow — FINAL BEST MODEL",
    caption: "Original academic evidence, PDF page 2. Final model tracking screen with XGBoost and Original + Loan Flags.",
    details: ["Shows recorded metrics and parameters; the 0.6878 macro F1 figure on this page comes from the local evaluation artifacts.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },
  "credit-sagemaker-training.webp": {
    title: "AWS SageMaker — notebook training",
    caption: "Original academic evidence, PDF page 14. Training and tuning run within an AWS SageMaker Notebook environment.",
    details: ["Shows Logistic Regression, Random Forest, XGBoost and LightGBM training. This is not evidence of a live SageMaker inference endpoint.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },
  "credit-ec2-standard.webp": {
    title: "AWS EC2 Streamlit — Standard prediction",
    caption: "Original academic evidence, PDF page 25. Streamlit running on AWS EC2 returned the Standard credit-score label.",
    details: ["One of three demonstrated prediction cases; saved screenshot is historical, not a claim of current EC2 availability.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },
  "credit-ec2-good.webp": {
    title: "AWS EC2 Streamlit — Good prediction",
    caption: "Original academic evidence, PDF page 27. Streamlit running on AWS EC2 returned the Good credit-score label.",
    details: ["The case tests the Good branch of the deployed three-class model.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },
  "credit-ec2-poor.webp": {
    title: "AWS EC2 Streamlit — Poor prediction",
    caption: "Original academic evidence, PDF page 29. Streamlit running on AWS EC2 returned the Poor credit-score label.",
    details: ["Completes the Good / Standard / Poor output-case evidence for the EC2 deployment.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },
  "credit-ec2-healthcheck.webp": {
    title: "AWS EC2 — Streamlit process and health check",
    caption: "Original academic evidence, PDF page 30. Console demonstrates Streamlit service on port 8501 and a successful health check.",
    details: ["Supports that Streamlit ran on EC2 during the documented test; it does not prove ongoing 24/7 availability.", "Original screenshot cropped to avoid exposing browser or server address information; application output is unaltered."],
    originalScreenshot: true,
    sourceLabel: "Original academic report screenshot",
  },

  "local-model-comparison.svg": {
    title: "Credit Score Deployment — Local eight-model comparison",
    caption:
      "Evaluation chart reconstructed directly from the local pipeline's supplied all_model_comparison.csv; it is not an original MLflow or Streamlit screenshot.",
    details: [
      "The source files record 8 comparisons: Logistic Regression, Random Forest, XGBoost and LightGBM using two feature sets.",
      "XGBoost with Original + Loan Flags has the highest local pipeline macro F1 of 0.6878 and 70.81% accuracy.",
      "This experiment differs from the earlier credit-score modeling notebook (macro F1 0.6898); do not conflate the results.",
    ],
    originalScreenshot: false,
    sourceLabel: "Pipeline CSV-derived results chart",
  },
  "model-f1-comparison.svg": {
    title: "Credit score — Verified eight-model macro F1 comparison",
    caption:
      "Chart recreated directly from the numerical evaluation table recorded in the original credit-score notebook. It compares four algorithms under two feature-set strategies, reporting the saved experiment's macro F1 values.",
    details: [
      "The XGBoost Original + Loan Flags configuration recorded the highest macro F1 (0.6898).",
      "Original + Feature Engineering uses ratio-based predictors; Original + Loan Flags retains a broader set of raw numerical/categorical fields alongside binary loan-type flags.",
      "Because final configuration selection used reported test scores, further independent evaluation is recommended before treating this as a generalization estimate.",
    ],
    originalScreenshot: false,
    sourceLabel: "Notebook-derived results chart",
  },
  "xgboost-confusion-matrix.svg": {
    title: "Best recorded XGBoost — Credit-score confusion matrix",
    caption:
      "Visualization recreated from the Original + Loan Flags XGBoost confusion matrix displayed in the supplied notebook (4,577 test rows).",
    details: [
      "Rows are actual classes and columns are model predictions (Good, Poor, Standard).",
      "Correct predictions on the diagonal are 566 Good, 896 Poor and 1,778 Standard cases.",
      "The class-level errors reinforce why macro F1 and balanced accuracy are more useful here than reporting accuracy alone.",
    ],
    originalScreenshot: false,
    sourceLabel: "Notebook-derived evaluation chart",
  },
  "mlflow-experiments.webp": {
    title: "MLflow — Original experiment tracking screenshot",
    caption:
      "Original screenshot from the submitted Mid Exam report. This shows the MLflow Experiments interface used to organize the student placement and salary modeling experiments.",
    details: [
      "Tracks classification and regression experiments, helping compare model configurations, metrics, and outputs within a consistent workflow.",
      "The project records 26 MLflow runs in total, including 24 experiment runs and 2 summary runs.",
      "The screenshot is retained as original project evidence; its small interface text is not essential to understanding the documented workflow.",
    ],
    originalScreenshot: true,
  },
  "streamlit-dashboard.webp": {
    title: "Streamlit — Original prediction application screenshot",
    caption:
      "Original screenshot of the user-facing Streamlit application built for the Model Deployment Mid Exam.",
    details: [
      "Provides a student-attribute input interface and integrates two machine learning tasks in one web application.",
      "Placement classification displays Placed / Not Placed outcomes, while salary regression provides a separate continuous prediction output.",
      "The application also presents dataset summaries and supporting visualizations so users can explore the student-outcome workflow.",
    ],
    originalScreenshot: true,
  },
  "fastapi-swagger.webp": {
    title: "FastAPI — Original Swagger/OpenAPI screenshot",
    caption:
      "Original screenshot of the FastAPI /docs interface created for the decoupled version of the machine learning application.",
    details: [
      "Documents REST endpoints for model inference and exposes interactive request/response schemas.",
      "Demonstrates an architecture where a Streamlit frontend communicates with a separate FastAPI backend rather than running all inference logic in one interface.",
      "Shows the API documentation and testing surface from the submitted project, not an illustrated replacement.",
    ],
    originalScreenshot: true,
  },
  "classification-rule.svg": {
    title: "Placement classification threshold explanation",
    caption:
      "Explanatory diagram: all four thresholds must be satisfied for the dataset's Placed label. This is not an application screenshot.",
    details: [],
    originalScreenshot: false,
  },
  "architecture.svg": {
    title: "End-to-end architecture diagram",
    caption:
      "Explanatory architecture diagram summarizing data preprocessing, model experimentation, MLflow tracking, and deployment designs.",
    details: [],
    originalScreenshot: false,
  },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const hasLinks = Boolean(
    project.githubUrl || project.demoUrl || project.reportUrl,
  );

  return (
    <div className="container detail-layout">
      <Link href="/projects" className="text-link back-link">
        ← Back to all projects
      </Link>

      <header className="detail-header">
        <p className="eyebrow">
          PROJECT {project.id.padStart(2, "0")} / CASE STUDY
        </p>
        <h1>{project.title}</h1>
        <p className="detail-subtitle">{project.description}</p>

        <div className="tags">
          {project.courseTags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
          {project.roleTags.map((tag) => (
            <span className="tag tag-role" key={tag}>{tag}</span>
          ))}
        </div>
      </header>

      {project.highlights && project.highlights.length > 0 && (
        <section
          aria-label="Project highlights"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "16px",
            margin: "0 0 36px",
          }}
        >
          {project.highlights.map((highlight) => (
            <div
              key={highlight.label}
              style={{
                background: "#f3f6f9",
                border: "1px solid #dce5ed",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#172b45",
                  fontSize: "clamp(1.55rem, 3vw, 2rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.2,
                  marginBottom: "8px",
                }}
              >
                {highlight.value}
              </strong>
              <span style={{ display: "block", color: "#344963", fontWeight: 650 }}>
                {highlight.label}
              </span>
              {highlight.note && (
                <small style={{ display: "block", color: "#66788c", marginTop: "5px" }}>
                  {highlight.note}
                </small>
              )}
            </div>
          ))}
        </section>
      )}

      {(project.slug === "student-placement-classification" || project.slug === "placement-salary-streamlit") && (
        <AccuracyExplanation />
      )}

      <div className="detail-grid">
        <div className="detail-main">
          {project.image && (
            <div className="detail-picture">
              <Image
                src={project.image}
                width={1200}
                height={700}
                alt={`Project overview: ${project.title}`}
                unoptimized={project.image.endsWith(".svg")}
              />
            </div>
          )}

          <TextSection title="Problem statement" value={project.problemStatement} />
          <TextSection title="Business context" value={project.businessContext} />
          <TextSection title="Dataset" value={project.dataset} />
          <ListSection title="Data preprocessing" items={project.preprocessing} />
          <ListSection title="Feature engineering" items={project.featureEngineering} />
          <ListSection title={project.slug === "customer-repeat-order" ? "EDA & preprocessing methodology" : "Methodology & experiments"} items={project.methodology} />
          <ListSection title="Models" items={project.models} />
          <ListSection title="Evaluation metrics" items={project.evaluationMetrics} />
          <ListSection title="Documented results" items={project.results} />
          <ListSection title="Insights" items={project.insights} />
          <TextSection title="Business impact / potential use" value={project.businessImpact} />
          <ListSection title="Challenges" items={project.challenges} />
          <ListSection title="Limitations" items={project.limitations} />
          <ListSection title="Future improvements" items={project.futureImprovements} />

          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <section className="detail-section">
              <h2>Explore related project components</h2>
              <p style={{ marginBottom: "12px" }}>
                Explore other parts of the same academic end-to-end project.
              </p>
              <ul className="detail-list">
                {project.relatedProjects.map((relatedSlug) => {
                  const related = getProjectBySlug(relatedSlug);
                  if (!related) return null;
                  return (
                    <li key={relatedSlug}>
                      <Link href={`/projects/${related.slug}`} className="text-link">
                        {related.title} →
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {project.gallery.length > 0 && (
            <section className="detail-section">
              <h2>Project gallery</h2>
              {project.slug === "placement-salary-streamlit" && (
                <p style={{ marginBottom: "18px", color: "#526577" }}>
                  These are original screenshots taken from the submitted academic
                  project documentation, not recreated interfaces. Since the
                  original report screenshots contain small text, each image is
                  followed by a readable explanation of what it demonstrates.
                </p>
              )}
              <div className="detail-gallery">
                {project.gallery.map((src) => {
                  const filename = src.split("/").pop() ?? "";
                  const visual = visualDescriptions[filename];
                  const isScreenshot = visual?.originalScreenshot ?? false;

                  return (
                    <figure
                      key={src}
                      style={{
                        margin: 0,
                        padding: "16px",
                        border: "1px solid #dce5ed",
                        borderRadius: "16px",
                        background: "#fff",
                      }}
                    >
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={isScreenshot ? "Open original screenshot in a new tab" : "Open diagram in a new tab"}
                        style={{
                          display: "block",
                          margin: "0 auto",
                          maxWidth: isScreenshot ? "954px" : "100%",
                        }}
                      >
                        <Image
                          src={src}
                          width={isScreenshot ? 954 : 1200}
                          height={isScreenshot ? 574 : 690}
                          alt={visual?.title ?? `Supporting evidence for ${project.title}`}
                          unoptimized
                          style={{ width: "100%", height: "auto", objectFit: "contain" }}
                        />
                      </a>
                      {visual && (
                        <figcaption style={{ padding: "16px 6px 5px", color: "#526577" }}>
                          <p
                            style={{
                              fontSize: "0.73rem",
                              fontWeight: 700,
                              letterSpacing: "0.07em",
                              textTransform: "uppercase",
                              color: "#3f7484",
                              marginBottom: "6px",
                            }}
                          >
                            {visual?.sourceLabel ?? (isScreenshot ? "Original project screenshot" : "Explanatory diagram")}
                          </p>
                          <strong
                            style={{
                              display: "block",
                              color: "#192e49",
                              fontSize: "1.1rem",
                              marginBottom: "8px",
                            }}
                          >
                            {visual.title}
                          </strong>
                          <p style={{ fontSize: "0.94rem", lineHeight: 1.7, marginBottom: "10px" }}>
                            {visual.caption}
                          </p>
                          {visual.details.length > 0 && (
                            <ul
                              style={{
                                paddingLeft: "20px",
                                margin: "8px 0 12px",
                                lineHeight: 1.65,
                                fontSize: "0.91rem",
                              }}
                            >
                              {visual.details.map((item) => (
                                <li key={item} style={{ marginBottom: "8px" }}>{item}</li>
                              ))}
                            </ul>
                          )}
                          {isScreenshot && (
                            <a
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-link"
                              style={{ fontSize: "0.88rem" }}
                            >
                              View original screenshot ↗
                            </a>
                          )}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <aside className="detail-sidebar">
          <div className="sidebar-card">
            <h2>Project details</h2>
            <dl>
              {project.year !== null && (
                <>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </>
              )}
              {project.projectType && (
                <>
                  <dt>Type</dt>
                  <dd>{project.projectType}</dd>
                </>
              )}
              {project.courseTags.length > 0 && (
                <>
                  <dt>Course</dt>
                  <dd>{project.courseTags.join(", ")}</dd>
                </>
              )}
              {project.domainTags.length > 0 && (
                <>
                  <dt>Domain</dt>
                  <dd>{project.domainTags.join(", ")}</dd>
                </>
              )}
              {project.datasetSize && (
                <>
                  <dt>Dataset size</dt>
                  <dd>{project.datasetSize}</dd>
                </>
              )}
              {project.grade && (
                <>
                  <dt>Course grade</dt>
                  <dd>{project.grade}</dd>
                </>
              )}
              {project.status && (
                <>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </>
              )}
            </dl>

            {project.technologies.length > 0 && (
              <>
                <h3>Technologies</h3>
                <div className="tags">
                  {project.technologies.map((tech) => (
                    <span className="tag" key={tech}>{tech}</span>
                  ))}
                </div>
              </>
            )}

            {hasLinks && (
              <div className="sidebar-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub repository ↗
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Live demo ↗
                  </a>
                )}
                {project.reportUrl && (
                  <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">
                    Project report ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

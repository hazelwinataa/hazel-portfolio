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
          <ListSection title="Methodology & experiments" items={project.methodology} />
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

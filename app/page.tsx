
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import {
  featuredProjects,
  projects,
  roles,
} from "@/lib/projects";
import { site } from "@/lib/site";

// SKILLS DATA
const skillGroups = [
  {
    title: "Programming & Data Analysis",
    description:
      "Cleaning, transforming, exploring, and analyzing datasets using Python and SQL. Focus areas include missing-value handling, data integration, exploratory data analysis, statistical analysis, pattern identification, and data visualization to communicate meaningful insights.",
    items: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Data Cleaning",
      "Data Preprocessing",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Data Visualization",
    ],
  },
  {
    title: "Machine Learning & Modeling",
    description:
      "Developing and evaluating supervised and unsupervised machine learning models for classification, regression, and clustering. Work includes feature engineering, class imbalance handling, cross-validation, hyperparameter optimization, model comparison, performance evaluation, and model interpretation.",
    items: [
      "Scikit-learn",
      "Logistic Regression",
      "Random Forest",
      "XGBoost",
      "LightGBM",
      "Classification & Regression",
      "K-Means Clustering",
      "Feature Engineering",
      "Cross-Validation",
      "Optuna",
      "Model Evaluation",
    ],
  },
  {
    title: "Deep Learning",
    description:
      "Designing and training neural network architectures for structured-data prediction, computer vision, time-series forecasting, dimensionality reduction, and conditional image generation. Experience includes architecture modification, hyperparameter experiments, reconstruction analysis, and task-specific model evaluation.",
    items: [
      "TensorFlow / Keras",
      "Artificial Neural Networks",
      "Convolutional Neural Networks",
      "LSTM",
      "Time-Series Forecasting",
      "Autoencoders",
      "Dimensionality Reduction",
      "Conditional GANs",
      "Image Generation",
      "Deep Learning Evaluation",
    ],
  },
  {
    title: "Data Engineering & Databases",
    description:
      "Designing relational database structures and building data processing workflows that connect multiple data sources. Focus areas include database normalization, entity relationships, SQL operations, REST API ingestion, data transformation, batch processing, Spark Structured Streaming, and structured data storage.",
    items: [
      "SQL",
      "PostgreSQL",
      "Relational Database Design",
      "Database Normalization",
      "Entity Relationship Diagrams",
      "Data Pipelines",
      "REST API Integration",
      "Apache Spark",
      "Spark Structured Streaming",
      "Data Ingestion",
      "Data Transformation",
    ],
  },
  {
    title: "Business & Customer Analytics",
    description:
      "Applying statistical analysis and predictive modeling to business and customer-related problems. Projects cover customer segmentation, repeat-order prediction, retention-oriented analytics, marketing campaign response prediction, financial risk assessment, customer prioritization, and translating analytical findings into business decision support.",
    items: [
      "Customer Segmentation",
      "Customer Retention Analytics",
      "Repeat-Order Prediction",
      "Marketing Campaign Analytics",
      "Predictive Analytics",
      "Credit Risk Analytics",
      "Financial Behavior Analysis",
      "Customer Prioritization",
      "Business Insights",
      "Decision Support",
    ],
  },
  {
    title: "MLOps & Deployment",
    description:
      "Building reproducible machine learning workflows from preprocessing and experimentation to inference and deployment. Focus areas include pipeline development, experiment tracking, model comparison, hyperparameter tuning, model serialization, model registry management, REST API inference, Streamlit applications, and local-to-cloud deployment using AWS.",
    items: [
      "MLflow",
      "Experiment Tracking",
      "ML Pipelines",
      "Model Registry",
      "Model Serialization",
      "Hyperparameter Tuning",
      "Streamlit",
      "FastAPI",
      "REST API Inference",
      "AWS / EC2",
      "Model Deployment",
    ],
  },
];

// HOMEPAGE
export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {" "}PORTFOLIO · {site.location.toUpperCase()}
          </p>

          <h1>
            Turning complex data into{" "}
            <span>actionable insights.</span>
          </h1>

          <p className="hero-description">
            {site.introduction}
          </p>

          <div className="hero-buttons">
            <Link
              className="button button-primary"
              href="/projects"
            >
              Explore all projects{" "}
              <span aria-hidden="true">↗</span>
            </Link>

            <Link
              className="button button-outline"
              href="/#contact"
            >
              Get in touch
            </Link>
          </div>

          <p className="hero-caption">
            {site.name} · {site.university}
          </p>
        </div>

        {/* PORTFOLIO OVERVIEW */}
        <div
          className="hero-dashboard"
          aria-label="Portfolio overview"
        >
          <div className="dashboard-top">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>

            <span>PROJECT OVERVIEW</span>
            <span>● LIVE ARCHIVE</span>
          </div>

          <p className="dashboard-label">
            ACADEMIC & TECHNICAL WORK
          </p>

          <div className="dashboard-number">
            {projects.length}
            <span>projects in archive</span>
          </div>

          <div className="dashboard-stats">
            <div>
              <strong>{featuredProjects.length}</strong>
              <span>Featured projects</span>
            </div>

            <div>
              <strong>{roles.length}</strong>
              <span>Role perspectives</span>
            </div>
          </div>

          <div
            className="dashboard-bars"
            aria-hidden="true"
          >
            <i style={{ height: "45%" }} />
            <i style={{ height: "67%" }} />
            <i style={{ height: "54%" }} />
            <i style={{ height: "90%" }} />
            <i style={{ height: "73%" }} />
            <i style={{ height: "100%" }} />
            <i style={{ height: "84%" }} />
            <i style={{ height: "93%" }} />
          </div>

          <p className="dashboard-foot">
            ML · Deep Learning · Data Engineering · MLOps
          </p>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section
        className="section section-muted"
        id="about"
      >
        <div className="container about-grid">
          <div>
            <p className="eyebrow">
              01 / ABOUT ME
            </p>

            <h2>
              Building data solutions that connect
              technology and business.
            </h2>
          </div>

          <div>
            <p>
              I am a student at {site.university}{" "}
              with hands-on experience in Data Science,
              Data Analytics, Data Engineering, and
              Business Analytics through academic
              projects and data science competitions.
            </p>

            <p>
              My work spans data preprocessing,
              predictive modeling, data pipelines,
              database systems, and machine learning
              deployment, with a focus on transforming
              complex information into practical,
              data-driven solutions.
            </p>

            <p>
              Selected projects include analyzing over
              1.2 million healthcare records for patient
              segmentation, developing customer
              repeat-order prediction using more than
              318,000 financing transactions, and
              implementing weather and traffic streaming
              analytics with Apache Spark and APIs.
            </p>

            <Link
              href="/projects"
              className="text-link"
            >
              Explore my projects →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section
        className="section container"
        id="featured"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              02 / SELECTED WORK
            </p>

            <h2>Featured projects</h2>

            <p>
              A selection of projects demonstrating
              applied data science, predictive analytics,
              data engineering, and machine learning
              deployment.
            </p>
          </div>

          <Link
            href="/projects"
            className="button button-outline"
          >
            View all {projects.length} projects ↗
          </Link>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        className="section section-muted"
        id="skills"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                03 / TECHNICAL TOOLKIT
              </p>

              <h2>Skills & technologies</h2>

              <p>
                Technical skills and analytical
                methods applied across academic
                projects, data science competitions,
                and end-to-end data solutions.
              </p>
            </div>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div
                className="skill-card"
                key={group.title}
              >
                <h3>{group.title}</h3>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.95rem",
                    fontWeight: 400,
                    lineHeight: 1.75,
                    margin: "14px 0 22px",
                  }}
                >
                  {group.description}
                </p>

                <div className="tags">
                  {group.items.map((item) => (
                    <span
                      className="tag"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        className="section container"
        id="contact"
      >
        <div className="contact-panel">
          <div>
            <p className="eyebrow">
              04 / CONTACT
            </p>

            <h2>Let's connect.</h2>

            <p>
              Open to internship opportunities in
              Data Science, Data Analytics,
              Data Engineering, and Business Analytics,
              as well as data-driven project
              collaborations.
            </p>
          </div>

          <div className="contact-links">
            {site.email && (
              <a
                className="button button-primary"
                href={`mailto:${site.email}`}
              >
                Email me ↗
              </a>
            )}

            {site.linkedinUrl && (
              <a
                className="button button-outline"
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            )}

            {site.githubUrl && (
              <a
                className="button button-outline"
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            )}

            {site.resumeUrl && (
              <a
                className="button button-outline"
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View CV ↗
              </a>
            )}

            {!site.email &&
              !site.linkedinUrl &&
              !site.githubUrl && (
                <p className="contact-notice">
                  Add your verified links in{" "}
                  <code>lib/site.ts</code>{" "}
                  to activate contact buttons.
                </p>
              )}
          </div>
        </div>
      </section>
    </>
  );
}

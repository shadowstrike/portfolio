# Portfolio Website - Folder Structure

## Directory Organization

```
portfolio-website/
├── index.html              # Main homepage
├── css/
│   └── styles.css          # All styling
├── js/
│   └── script.js           # Carousel functionality
├── projects/               # Project detail pages
│   ├── project-savepoint.html
│   ├── project-flinksql.html
│   ├── project-multik8s.html
│   ├── project-session.html
│   ├── project-artifacts.html
│   └── project-cmf.html
├── demos/                  # Interactive demo pages
│   ├── carousel-demo.html
│   └── pattern-demo.html
├── docs/                   # Documentation
│   ├── README.md
│   ├── CAROUSEL-GUIDE.md
│   ├── DARK-MODE-GUIDE.md
│   ├── DARK-MODE-COLORS.md
│   ├── PORTFOLIO-WRITING-GUIDE.md
│   ├── WRITING-IMPROVEMENTS-LOG.md
│   ├── FOLDER-STRUCTURE.md (this file)
│   └── CV.pdf
└── images/                 # Image assets organized by company
    ├── profile.png         # Profile photo
    ├── confluent/          # Confluent project images (June 2025 - Present)
    │   ├── artifacts/      # Artifact Management (12 images)
    │   ├── savepoint/      # Savepoint Management UI
    │   ├── flinksql/       # FlinkSQL Studio
    │   ├── multik8s/       # Multi-Kubernetes Support
    │   ├── session/        # Session Cluster Management
    │   └── cmf/            # CMF Integration
    ├── atlassian/          # Atlassian project images (2022-2023)
    ├── citrix/             # Citrix project images (2016-2022)
    └── jumpcloud/          # JumpCloud project images (2024-Present)
```

## Path References

All paths have been updated:

- **index.html** → uses `css/styles.css` and `projects/project-*.html`
- **Project pages** → use `../css/styles.css`, `../js/script.js`, `../index.html`
- **Demo pages** → use `../css/styles.css`, `../js/script.js`, `../index.html`

## Adding New Files

- **New project page**: Add to `/projects` directory
- **New demo**: Add to `/demos` directory
- **New documentation**: Add to `/docs` directory
- **Project images**: Organized by company, then project
  - Pattern: `/images/company-name/project-name/`
  - Example: `/images/confluent/artifacts/artifact-list.png`
  - Use lowercase, hyphenated filenames
  - Reference as `../images/confluent/artifacts/filename.png` from project pages

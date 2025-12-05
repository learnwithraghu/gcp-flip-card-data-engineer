# Google Cloud Professional Data Engineer – Exam Cheat Sheet (Dec 2025)
Only high-yield, must-remember points

## 1. Core GCP Data Services – When to Use What
| Service                  | Use Case                                                                 | Key Notes / Limits                                      |
|--------------------------|--------------------------------------------------------------------------|---------------------------------------------------------|
| BigQuery                 | Analytics warehouse, SQL on petabytes                                    | Serverless, columnar, BI Engine, materialized views    |
| Cloud Storage            | Object storage (raw files, backups, Data Lake)                           | Multi-regional, Nearline/Coldline/Archive, lifecycle  |
| Cloud SQL                | Managed MySQL/PostgreSQL/SQL Server                                      | Read replicas, HA, Point-in-time recovery               |
| Spanner                  | Global strong consistency + horizontal scale + relational               | True global transactions, 99.999% SLA                   |
| Bigtable                 | Low-latency NoSQL for >1 TB, time-series, IoT                          | Single-row transactions, HBase API                      |
| Datastore / Firestore    | Document DB, mobile/web apps                                             | Firestore = serverless + realtime                       |
| Cloud Pub/Sub            | Event ingestion & messaging                                              | At-least-once, ordering keys, 7-day replay              |
| Dataflow                 | Stream & batch processing (Apache Beam)                                  | Autoscaling, exactly-once (with sinks)                  |
| Dataproc                 | Managed Spark/Hadoop                                                     | Ephemeral clusters, auto-termination                    |
| Composer                 | Managed Airflow                                                          | Environment = DAGs + Cloud Storage bucket               |
| Dataplex                 | Data fabric, governance across lakes                                     | Lakes → Zones (raw/curated) → Assets                    |
| Looker Studio            | Dashboards (formerly Data Studio)                                        | Free, connects directly to BigQuery                     |
| Looker                   | Enterprise BI + semantic modeling                                        | LookML, explores                                        |

## 2. BigQuery – Must Know
- Storage & compute separated (slots)
- Slot = virtual CPU used for query execution
- BI Engine = in-memory acceleration (sub-second BI)
- Partitioning types: Ingestion-time, Date/Timestamp, Integer range
- Clustering: up to 4 columns, sorts data physically
- DML limits: 96 concurrent DML statements per table
- Streaming: 1 MB/sec per table, 500K rows/sec, deduplication via insertId
- Authorized Views = share data without copying (IAM on view, not table)
- Materialized Views: smart (auto-refresh incremental), standard (manual refresh)

## 3. Dataflow / Apache Beam – Key Concepts
- PCollections: bounded vs unbounded
- Transforms: ParDo, GroupByKey, CoGroupByKey, Windowing
- Windowing: Fixed, Sliding, Session, Global
- Triggers: AfterWatermark, Repeatedly, Early/On-time/Late firings
- Exactly-once: requires sink support + idempotent writes + GroupByKey
- Runner: Dataflow Runner (GCP), Direct Runner (local)

## 4. Security & IAM – Critical for Exam
| Role                                      | Scope                                 |
|-------------------------------------------|---------------------------------------|
| roles/bigquery.dataViewer                 | Read metadata + query                 |
| roles/bigquery.dataEditor                 | + load, export, DML                   |
| roles/bigquery.dataOwner                  | Full control                          |
| roles/bigquery.user                       | Run jobs (needs dataset access too)   |
| roles/bigquery.jobUser                    | Run jobs in project                   |
| roles/storage.objectViewer                | Cloud Storage read                    |
| Customer-Managed Encryption Keys (CMEK)  | Required for certain compliance       |
| VPC Service Controls                      | Prevent data exfiltration             |

## 5. Data Ingestion Patterns
| Tool                | Best For                                      |
|---------------------|-----------------------------------------------|
| Transfer Appliance  | >100 TB offline transfer                      |
| Storage Transfer Service | S3 → GCS, URLs → GCS                     |
| Cloud Pub/Sub + Dataflow | Real-time streaming                       |
| gsutil -m cp/rsync  | Large parallel uploads                        |
| BigQuery Load Jobs  | Batch CSV/JSON/Avro/Parquet from GCS          |

## 6. Data Governance & Quality
- Dataplex: Lake → Zone (raw, curated) → Asset
- Data Catalog: metadata + search + policy tags
- Policy Tags: column-level access control in BigQuery
- DLP API: inspect, mask, tokenize PII

## 7. Monitoring & Cost Optimization
| Tool / Method                         | Purpose                                     |
|---------------------------------------|---------------------------------------------|
| Cloud Monitoring + dashboards         | Slot usage, streaming buffer age            |
| BigQuery Reservation + Flex Slots     | Committed use, 1-minute flex                |
| BigQuery Edition pricing (Standard vs Enterprise) | Enterprise = column encryption, CMAK |
| Information Schema + ADMIN tables     | Query job history & costs                 |

## 8. Reliability & Disaster Recovery
- BigQuery: multi-region datasets auto-replicated
- Cloud SQL: regional, cross-region read replicas
- Spanner: multi-region instances (99.999%)
- Cloud Storage: dual-region buckets for higher availability

## 9. Exam Hot Topics (appear almost every time)
- Choosing between Bigtable vs BigQuery vs Spanner
- Streaming pipeline design (Pub/Sub → Dataflow → BigQuery)
- Cost optimization (partitions, clustering, slots, reservations)
- Secure data sharing (Authorized Views, BigQuery Omni)
- Migration from on-prem Hadoop → Dataproc vs Dataflow vs BigQuery
- Exactly-once vs At-least-once processing
- CMEK vs Google-managed keys

Copy this entire text → paste into https://md-to-pdf.fly.dev or use VS Code + Markdown PDF extension → export as PDF.

Good luck — you’ve got this! 
(Updated December 2025 – all services & limits current)
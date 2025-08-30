# Master DSA with Java - Microservice Platform

Modern microservice architecture-based learning platform for Java and DSA (Data Structures & Algorithms).

## About the Project

**Master DSA with Java** is a comprehensive educational platform designed for learning Java programming language and data structures/algorithms. The project is being transformed from a monolithic structure to a modern microservice architecture.

### Features

- **Java Core Concepts**: Basic Java programming concepts
- **Advanced Java**: Advanced Java topics
- **DSA Solutions**: Data structures and algorithm solutions
- **Algorithm Problems**: Platform-based problem solutions
- **Progress Tracking**: User progress tracking
- **Multi-language Support**: Turkish, English, and German language support

## Architecture Transformation Roadmap

### **Phase 1: Architecture Design and Planning (2-3 weeks)**

#### 1.1 Domain-Driven Design (DDD) Analysis

```
Existing Domains:
├── User Management
├── Content Management
├── Learning Progress
├── Problem Management
├── Payment & Billing
├── Authentication & Authorization
└── Analytics & Reporting
```

#### 1.2 Microservice Breakdown

```
Recommended Microservices:
├── user-service (Java - Spring Boot)
├── content-service (Java - Spring Boot)
├── progress-service (Java - Spring Boot)
├── problem-service (Go - Gin)
├── auth-service (Go - Gin)
├── notification-service (Go - Gin)
├── analytics-service (Java - Spring Boot)
├── payment-service (Java - Spring Boot)
└── gateway-service (Go - Gin)
```

#### 1.3 Technology Stack Selection

```
Backend Stack:
├── Java Services: Spring Boot 3.x + Spring Cloud
├── Go Services: Gin + Gorilla Mux
├── Database: PostgreSQL
├── Message Queue: Apache Kafka
├── Cache: Redis
├── Search: Elasticsearch
├── Container: Docker
└── Orchestration: Kubernetes
```

### **Phase 2: Infrastructure Setup (3-4 weeks)**

#### 2.1 Development Environment

```bash
# Local development with Docker Compose
docker-compose up -d postgres redis kafka elasticsearch

# Kubernetes cluster (minikube/kind)
minikube start --cpus=4 --memory=8192
```

#### 2.2 CI/CD Pipeline

```yaml
# GitHub Actions workflow
name: Microservice CI/CD
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Java Services
      - name: Build Go Services
      - name: Run Tests
      - name: Build Docker Images
      - name: Deploy to Kubernetes
```

### **Phase 3: Core Services Development (6-8 weeks)**

#### 3.1 User Service (Java)

```java
// Spring Boot + Spring Data JPA
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserRegistrationRequest request) {
        // Saga Pattern: User Registration Saga
        return userService.registerUser(request);
    }

    @GetMapping("/{userId}/progress")
    public ResponseEntity<UserProgressDTO> getUserProgress(@PathVariable Long userId) {
        return userService.getUserProgress(userId);
    }
}
```

#### 3.2 Content Service (Java)

```java
// Content Management + Elasticsearch
@Service
public class ContentService {

    public ContentDTO createContent(ContentCreateRequest request) {
        Content content = contentRepository.save(request.toEntity());

        // Kafka event: ContentCreatedEvent
        kafkaTemplate.send("content-events", new ContentCreatedEvent(content));

        // Elasticsearch indexing
        elasticsearchService.indexContent(content);

        return content.toDTO();
    }
}
```

#### 3.3 Problem Service (Go)

```go
// Go + Gin + GORM
type ProblemService struct {
    db          *gorm.DB
    redisClient *redis.Client
    kafkaProducer *kafka.Producer
}

func (s *ProblemService) CreateProblem(ctx context.Context, req *CreateProblemRequest) (*Problem, error) {
    // Saga Pattern: Problem Creation Saga
    problem := &Problem{
        Title:       req.Title,
        Difficulty:  req.Difficulty,
        Category:    req.Category,
        Content:     req.Content,
    }

    if err := s.db.Create(problem).Error; err != nil {
        return nil, err
    }

    // Kafka event
    s.kafkaProducer.Produce("problem-events", problem.ID, problem)

    return problem, nil
}
```

#### 3.4 Payment Service (Java)

```java
// Spring Boot + JPA + Kafka + Redis (idempotency)
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    @PostMapping(value = "/intents", headers = "Idempotency-Key")
    public ResponseEntity<PaymentIntentDTO> createIntent(
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @RequestBody CreatePaymentIntentRequest request) {
        // Ensures idempotency across retries and parallel requests
        return ResponseEntity.ok(paymentService.createIntent(idempotencyKey, request));
    }

    @PostMapping("/{intentId}/confirm")
    public ResponseEntity<PaymentDTO> confirm(@PathVariable UUID intentId) {
        return ResponseEntity.ok(paymentService.confirm(intentId));
    }
}

@Service
public class PaymentService {

    @Transactional
    public PaymentIntentDTO createIntent(String idempotencyKey, CreatePaymentIntentRequest request) {
        // 1) Fast-path idempotency with Redis (SETNX + TTL) to block duplicate work
        // 2) Database uniqueness constraint on idempotency_key for ultimate consistency
        // 3) Outbox write for PAYMENT_INTENT_CREATED event in same tx
        PaymentIntent intent = repository.findByIdempotencyKey(idempotencyKey)
            .orElseGet(() -> repository.save(PaymentIntent.newPending(idempotencyKey, request)));
        outboxRepository.save(OutboxEvent.paymentIntentCreated(intent));
        return intent.toDTO();
    }

    @Transactional
    public PaymentDTO confirm(UUID intentId) {
        // Pessimistic lock to prevent double-confirm
        PaymentIntent intent = repository.findByIdWithPessimisticWriteLock(intentId)
            .orElseThrow(() -> new NotFoundException("intent"));

        if (intent.isTerminal()) {
            return intent.getPayment().toDTO();
        }

        // Charge provider (mock/stripe-like) and record ledger atomically
        Payment payment = paymentProvider.charge(intent);
        ledgerRepository.appendEntry(LedgerEntry.from(payment));
        intent.markSucceeded(payment);
        outboxRepository.save(OutboxEvent.paymentSucceeded(intent, payment));
        return payment.toDTO();
    }
}

@Entity
@Table(name = "payment_intents", uniqueConstraints = @UniqueConstraint(name = "uk_idem_key", columnNames = "idempotency_key"))
public class PaymentIntent {
    @Id UUID id;
    @Column(name = "idempotency_key", nullable = false) String idempotencyKey;
    @Version long version; // Optimistic locking for race experiments
    @Enumerated(EnumType.STRING) PaymentIntentStatus status;
    BigDecimal amount; String currency; UUID userId;
    @OneToOne(mappedBy = "intent") Payment payment;
}
```

- Idempotency strategy:
  - Redis SETNX with TTL to short-circuit duplicates.
  - Database unique constraint on `idempotency_key` as the source of truth.
  - Outbox Pattern to publish events exactly-once.
- Race-condition labs to try:
  - Fire N parallel `confirm` calls; observe locks/versions and terminal state.
  - Remove lock and switch to optimistic-only to study retries and conflicts.
  - Toggle isolation level to SERIALIZABLE to observe write skew avoidance.

### **Phase 4: Event-Driven Architecture (3-4 weeks)**

#### 4.1 Kafka Event Schema

```json
// User Events
{
  "eventType": "USER_REGISTERED",
  "eventId": "uuid",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "userId": 123,
    "email": "user@example.com",
    "username": "java_master"
  }
}

// Content Events
{
  "eventType": "CONTENT_CREATED",
  "eventId": "uuid",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "contentId": 456,
    "title": "Java Collections Framework",
    "category": "java-core"
  }
}

// Payment Events
{
  "eventType": "PAYMENT_INTENT_CREATED",
  "eventId": "uuid",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "intentId": "uuid",
    "userId": "uuid",
    "amount": 1999,
    "currency": "USD"
  }
}
{
  "eventType": "PAYMENT_SUCCEEDED",
  "eventId": "uuid",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "intentId": "uuid",
    "paymentId": "uuid",
    "userId": "uuid",
    "amount": 1999,
    "currency": "USD"
  }
}
```

#### 4.2 Saga Pattern Implementation

```java
// User Registration Saga
@Component
public class UserRegistrationSaga {

    @Transactional
    public void execute(UserRegistrationRequest request) {
        try {
            // Step 1: Create User
            User user = userService.createUser(request);

            // Step 2: Initialize Progress
            progressService.initializeProgress(user.getId());

            // Step 3: Send Welcome Email
            notificationService.sendWelcomeEmail(user.getEmail());

            // Saga completed successfully
            sagaService.markCompleted(user.getId());

        } catch (Exception e) {
            // Compensating actions
            sagaService.executeCompensation(user.getId());
            throw e;
        }
    }
}
```

### **Phase 5: API Gateway & Service Discovery (2-3 weeks)**

#### 5.1 API Gateway (Go)

```go
// Gin + JWT + Rate Limiting
func main() {
    r := gin.Default()

    // Middleware
    r.Use(cors.Default())
    r.Use(rateLimit())
    r.Use(authMiddleware())

    // Service routes
    api := r.Group("/api/v1")
    {
        api.POST("/auth/login", authHandler.Login)
        api.POST("/auth/register", authHandler.Register)

        // User routes
        api.GET("/users/:id", userHandler.GetUser)
        api.PUT("/users/:id", userHandler.UpdateUser)

        // Content routes
        api.GET("/content", contentHandler.GetContent)
        api.POST("/content", contentHandler.CreateContent)

        // Payment routes
        api.POST("/payments/intents", paymentHandler.CreateIntent)      // expects Idempotency-Key
        api.POST("/payments/:intentId/confirm", paymentHandler.Confirm)
        api.GET("/payments/:intentId", paymentHandler.GetIntent)
    }

    r.Run(":8080")
}
```

#### 5.2 Service Discovery

```yaml
# Kubernetes Service Discovery
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
  type: ClusterIP
```

### **Phase 6: Database & Caching Strategy (2-3 weeks)**

#### 6.1 PostgreSQL Schema Design

```sql
-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content table
CREATE TABLE content (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50),
    author_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Progress table
CREATE TABLE user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    content_id BIGINT REFERENCES content(id),
    completed BOOLEAN DEFAULT FALSE,
    progress_percentage INTEGER DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment tables
CREATE TYPE payment_intent_status AS ENUM ('PENDING','REQUIRES_CONFIRMATION','SUCCEEDED','FAILED','CANCELED');

CREATE TABLE payment_intents (
    id UUID PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    amount NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    idempotency_key VARCHAR(64) NOT NULL,
    status payment_intent_status NOT NULL DEFAULT 'PENDING',
    version BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (idempotency_key)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY,
    intent_id UUID UNIQUE REFERENCES payment_intents(id),
    provider_charge_id VARCHAR(128),
    amount NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ledger_entries (
    id BIGSERIAL PRIMARY KEY,
    payment_id UUID REFERENCES payments(id),
    user_id BIGINT REFERENCES users(id),
    delta NUMERIC(18,2) NOT NULL,
    balance_after NUMERIC(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6.2 Redis Caching Strategy

```java
@Service
public class ContentCacheService {

    @Cacheable(value = "content", key = "#contentId")
    public ContentDTO getContent(Long contentId) {
        return contentRepository.findById(contentId)
            .map(Content::toDTO)
            .orElseThrow(() -> new ContentNotFoundException(contentId));
    }

    @CacheEvict(value = "content", key = "#contentId")
    public void evictContent(Long contentId) {
        // Cache will be automatically evicted
    }
}
```

- For payments, use Redis keys `idem:{key}` with short TTL (e.g., 24h) to deduplicate client retries.

### **Phase 7: Kubernetes Deployment (2-3 weeks)**

#### 7.1 Dockerfile Examples

```dockerfile
# Java Service Dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]

# Go Service Dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

#### 7.2 Kubernetes Manifests

```yaml
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### **Phase 8: Monitoring & Observability (2-3 weeks)**

#### 8.1 Prometheus + Grafana

```yaml
# Prometheus Config
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "user-service"
    static_configs:
      - targets: ["user-service:8080"]
    metrics_path: "/actuator/prometheus"
```

#### 8.2 Distributed Tracing (Jaeger)

```java
// Spring Boot + Sleuth + Zipkin
@SpringBootApplication
@EnableSleuth
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

### **Phase 9: Non-Functional Requirements (2-3 weeks)**

#### 9.1 Performance & Scalability

```java
// Circuit Breaker Pattern
@Service
public class ContentServiceClient {

    @CircuitBreaker(name = "contentService", fallbackMethod = "getContentFallback")
    public ContentDTO getContent(Long contentId) {
        return contentService.getContent(contentId);
    }

    public ContentDTO getContentFallback(Long contentId, Exception e) {
        // Return cached content or default content
        return contentCacheService.getContent(contentId);
    }
}
```

#### 9.2 Security & Compliance

```java
// JWT + RBAC
@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
```

#### 9.3 Consistency, Idempotency, and Exactly-Once

- Use idempotency keys for all payment-creating endpoints.
- Pessimistic locking on confirmation to avoid double-spend.
- Outbox + Kafka with key `paymentIntentId` for ordered, at-least-once publishing; consumers implement dedup by `eventId`.
- Enable retries with exponential backoff; treat provider callbacks as upserts.

### **Phase 10: Testing & Quality Assurance (2-3 weeks)**

#### 10.1 Test Strategy

```java
// Integration Tests
@SpringBootTest
@AutoConfigureTestDatabase
class UserServiceIntegrationTest {

    @Test
    void shouldCreateUserSuccessfully() {
        // Given
        UserRegistrationRequest request = new UserRegistrationRequest("test@example.com", "password");

        // When
        UserDTO user = userService.registerUser(request);

        // Then
        assertThat(user.getEmail()).isEqualTo("test@example.com");
        assertThat(user.getId()).isNotNull();
    }
}
```

#### 10.2 Concurrency & Race-Condition Tests (Payment)

```java
// Parallel confirms should yield a single SUCCEEDED payment
@SpringBootTest
class PaymentConcurrencyTest {

    @Test
    void parallelConfirmations_resultInSinglePayment() throws Exception {
        UUID intentId = paymentService.createIntent("idem-123", new CreatePaymentIntentRequest(...)).id();

        int threads = 10;
        ExecutorService pool = Executors.newFixedThreadPool(threads);
        List<Future<PaymentDTO>> results = new ArrayList<>();
        for (int i = 0; i < threads; i++) {
            results.add(pool.submit(() -> paymentService.confirm(intentId)));
        }
        pool.shutdown();
        pool.awaitTermination(10, TimeUnit.SECONDS);

        long successCount = results.stream().map(f -> {
            try { return f.get(); } catch (Exception e) { return null; }
        }).filter(Objects::nonNull).distinct().count();

        assertThat(successCount).isEqualTo(1);
    }
}
```

- Load testing idea: run `wrk`/`k6`/JMeter with concurrent `confirm` calls to observe lock waits and throughput.

## Total Duration: 24-32 Weeks (6-8 Months)

## Migration Strategy

### **Incremental Migration Approach:**

1. **Week 1-4**: Modularize the monolith
2. **Week 5-8**: Extract first microservice (User Service)
3. **Week 9-12**: Separate Content Service
4. **Week 13-16**: Rewrite Problem Service with Go
5. **Week 17-20**: Implement event-driven architecture
6. **Week 21-24**: Kubernetes deployment
7. **Week 25-28**: Monitoring and observability
8. **Week 29-32**: Testing and optimization

## Quick Start Commands

```bash
# 1. Repository clone
git clone <your-repo>
cd masterdsawithjava

# 2. Install dependencies
npm install

# 3. Set up PostgreSQL with Docker
docker-compose up -d postgres

# 4. Create database tables
PGPASSWORD=postgres psql -h localhost -p 5433 -U postgres -d masterdsa -f supabase-schema.sql

# 5. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your PostgreSQL credentials

# 6. Start the development server
npm run dev
```

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Go Documentation](https://golang.org/doc/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)

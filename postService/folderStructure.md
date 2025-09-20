myapp/
├── cmd/
│ └── myapp/ # main.go
├── internal/ # reusable pkg
│ ├── config/ # Config
│ ├── server/ # HTTP or gRPC server setup
│ ├── handlers/ # HTTP handler (controller) logic
│ ├── service/ # Business logic
│ └── repository/ # DB interaction, CRUD
├── pkg/ # External pkg
├── api/ # OpenAPI/Protobuf spec, DTOs
├── migrations/ # DB migration
├── scripts/ # Helper
├── go.mod
├── go.sum
└── README.md

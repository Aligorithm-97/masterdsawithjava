#!/bin/bash

# gRPC-Web proxy başlatma scripti
# Bu script gRPC-Web proxy'yi başlatır ve browser'dan gRPC çağrıları yapmanızı sağlar

echo "gRPC-Web proxy başlatılıyor..."

# Envoy proxy konfigürasyonu oluştur
cat > envoy.yaml << EOF
static_resources:
  listeners:
  - name: listener1
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 8080
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          codec_type: AUTO
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: grpc_service
                  timeout: 60s
              cors:
                allow_origin_string_match:
                - prefix: "*"
                allow_methods: "GET, PUT, DELETE, POST, OPTIONS"
                allow_headers: "keep-alive,user-agent,cache-control,content-type,content-transfer-encoding,custom-header-1,x-accept-content-transfer-encoding,x-accept-response-streaming,x-user-agent,x-grpc-web,grpc-timeout"
                max_age: "1728000"
                expose_headers: "custom-header-1,grpc-status,grpc-message"
          http_filters:
          - name: envoy.filters.http.grpc_web
          - name: envoy.filters.http.cors
          - name: envoy.filters.http.router
  clusters:
  - name: grpc_service
    connect_timeout: 0.25s
    type: LOGICAL_DNS
    http2_protocol_options: {}
    lb_policy: ROUND_ROBIN
    load_assignment:
      cluster_name: grpc_service
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: host.docker.internal
                port_value: 8081
EOF

echo "Envoy proxy konfigürasyonu oluşturuldu (envoy.yaml)"
echo "Envoy'u başlatmak için: docker run --rm -v \$(pwd)/envoy.yaml:/etc/envoy/envoy.yaml -p 8080:8080 envoyproxy/envoy:v1.25-latest"
echo "Veya Envoy'u local olarak yükleyip: envoy -c envoy.yaml"

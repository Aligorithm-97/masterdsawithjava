package com.spring.temp.domain.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime validatedAt;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    public Token(Long id, String token, LocalDateTime createdAt, LocalDateTime expiresAt, LocalDateTime validatedAt, User user) {
        this.id = id;
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.validatedAt = validatedAt;
        this.user = user;
    }

    public Token() {
    }

    public static TokenBuilder builder() {
        return new TokenBuilder();
    }

    public Long getId() {
        return this.id;
    }

    public String getToken() {
        return this.token;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return this.expiresAt;
    }

    public LocalDateTime getValidatedAt() {
        return this.validatedAt;
    }

    public User getUser() {
        return this.user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public void setValidatedAt(LocalDateTime validatedAt) {
        this.validatedAt = validatedAt;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public static class TokenBuilder {
        private Long id;
        private String token;
        private LocalDateTime createdAt;
        private LocalDateTime expiresAt;
        private LocalDateTime validatedAt;
        private User user;

        TokenBuilder() {
        }

        public TokenBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public TokenBuilder token(String token) {
            this.token = token;
            return this;
        }

        public TokenBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public TokenBuilder expiresAt(LocalDateTime expiresAt) {
            this.expiresAt = expiresAt;
            return this;
        }

        public TokenBuilder validatedAt(LocalDateTime validatedAt) {
            this.validatedAt = validatedAt;
            return this;
        }

        public TokenBuilder user(User user) {
            this.user = user;
            return this;
        }

        public Token build() {
            return new Token(this.id, this.token, this.createdAt, this.expiresAt, this.validatedAt, this.user);
        }

        public String toString() {
            return "Token.TokenBuilder(id=" + this.id + ", token=" + this.token + ", createdAt=" + this.createdAt + ", expiresAt=" + this.expiresAt + ", validatedAt=" + this.validatedAt + ", user=" + this.user + ")";
        }
    }
}

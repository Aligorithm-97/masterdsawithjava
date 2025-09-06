package com.spring.temp.domain.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class UserActions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String ip;
    private String methodName;
    private String arguments;
    private String result;
    private LocalDateTime timestamp;

    public UserActions(Long id, String username, String ip, String methodName, String arguments, String result, LocalDateTime timestamp) {
        this.id = id;
        this.username = username;
        this.ip = ip;
        this.methodName = methodName;
        this.arguments = arguments;
        this.result = result;
        this.timestamp = timestamp;
    }

    public UserActions() {
    }

    public static UserActionsBuilder builder() {
        return new UserActionsBuilder();
    }

    public Long getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getIp() {
        return this.ip;
    }

    public String getMethodName() {
        return this.methodName;
    }

    public String getArguments() {
        return this.arguments;
    }

    public String getResult() {
        return this.result;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public void setArguments(String arguments) {
        this.arguments = arguments;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public static class UserActionsBuilder {
        private Long id;
        private String username;
        private String ip;
        private String methodName;
        private String arguments;
        private String result;
        private LocalDateTime timestamp;

        UserActionsBuilder() {
        }

        public UserActionsBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserActionsBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserActionsBuilder ip(String ip) {
            this.ip = ip;
            return this;
        }

        public UserActionsBuilder methodName(String methodName) {
            this.methodName = methodName;
            return this;
        }

        public UserActionsBuilder arguments(String arguments) {
            this.arguments = arguments;
            return this;
        }

        public UserActionsBuilder result(String result) {
            this.result = result;
            return this;
        }

        public UserActionsBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public UserActions build() {
            return new UserActions(this.id, this.username, this.ip, this.methodName, this.arguments, this.result, this.timestamp);
        }

        public String toString() {
            return "UserActions.UserActionsBuilder(id=" + this.id + ", username=" + this.username + ", ip=" + this.ip + ", methodName=" + this.methodName + ", arguments=" + this.arguments + ", result=" + this.result + ", timestamp=" + this.timestamp + ")";
        }
    }
}

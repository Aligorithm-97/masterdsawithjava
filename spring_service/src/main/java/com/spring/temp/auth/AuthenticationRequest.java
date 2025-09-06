package com.spring.temp.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class AuthenticationRequest {

    @Email(message = "Email format required !")
    @NotEmpty(message = "Email required !")
    @NotBlank(message = "Email required !")
    private String email;
    @NotEmpty(message = "Password required !")
    @NotBlank(message = "Password required !")
    @Size(min = 8, message = "Min 8 Characters !")
    private String password;

    public AuthenticationRequest(@Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String email, @NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String password) {
        this.email = email;
        this.password = password;
    }

    public AuthenticationRequest() {
    }

    public static AuthenticationRequestBuilder builder() {
        return new AuthenticationRequestBuilder();
    }

    public @Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String getEmail() {
        return this.email;
    }

    public @NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String getPassword() {
        return this.password;
    }

    public void setEmail(@Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String email) {
        this.email = email;
    }

    public void setPassword(@NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String password) {
        this.password = password;
    }

    public static class AuthenticationRequestBuilder {
        private @Email(message = "Email format required !")
        @NotEmpty(message = "Email required !")
        @NotBlank(message = "Email required !") String email;
        private @NotEmpty(message = "Password required !")
        @NotBlank(message = "Password required !")
        @Size(min = 8, message = "Min 8 Characters !") String password;

        AuthenticationRequestBuilder() {
        }

        public AuthenticationRequestBuilder email(@Email(message = "Email format required !") @NotEmpty(message = "Email required !") @NotBlank(message = "Email required !") String email) {
            this.email = email;
            return this;
        }

        public AuthenticationRequestBuilder password(@NotEmpty(message = "Password required !") @NotBlank(message = "Password required !") @Size(min = 8, message = "Min 8 Characters !") String password) {
            this.password = password;
            return this;
        }

        public AuthenticationRequest build() {
            return new AuthenticationRequest(this.email, this.password);
        }

        public String toString() {
            return "AuthenticationRequest.AuthenticationRequestBuilder(email=" + this.email + ", password=" + this.password + ")";
        }
    }
}
